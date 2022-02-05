<template>
    <div id="game-locations-list">
        <div class="locations">
            <div
                class="item"
                :class="{'active': active_route === location.id}"
                v-for="location in locationsList"
                :key="location.id"
                @click="changeLocation(location.id)"
            >
                <div class="line" :style="{transitionDuration: `${waitTime}s`}" />
                <div class="item__left">
                    <div class="item__name">{{location.name}}</div>
                </div>
                <div class="item__right">
                    <div class="item__time">{{location.time}} sec</div>
                    <div class="item__cross" v-if="active_route === location.id" @click.stop="cancelChangeLocation" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            active_route: 0,
            timeoutFunc: 0,
            waitTime: 0,
        }
    },
    computed: {
        locationsList() {return this.$store.getters.getLocationNeighbours}
    },
    methods: {
        async changeLocation(to: number) {
            const res = await this.$store.dispatch('useRoute', to)
            this.waitTime = res.time
            this.active_route = to
            this.timeoutFunc = setTimeout(() => {
                this.$store.dispatch('getLocationData')
                this.active_route = 0
            }, this.waitTime * 1000)
        },
        async cancelChangeLocation() {
            // @@TODO cancel request
            clearTimeout(this.timeoutFunc)
            await this.$store.dispatch('cancelUseRoute')
            this.active_route = 0
            this.waitTime = 0
        }
    }
})
</script>

<style lang="scss" scoped>
#game-locations-list {
    .locations {
        display: grid;
        grid-gap: 5px;
        .item {
            padding: 10px;
            display: flex;
            position: relative;
            justify-content: space-between;
            border-radius: 5px;
            transition: .3s;
            cursor: pointer;
            overflow: hidden;
            &:hover {
                background-color: var(--block-color);
            }
            &__name {
                text-transform: capitalize;
            }
            &__time {
                font-weight: bold;
            }
            &__right {
                display: flex;
                align-items: center;
            }
            .line {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: var(--contrast);
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 1s linear;
            }
            &.active .line {
                transform: scaleX(1);
            }
            &__cross {
                position: relative;
                width: 16px;
                height: 16px;
                margin-left: 1rem;
                cursor: pointer;
                &::before, &::after {
                    content: '';
                    position: absolute;
                    width: 141.4%;
                    height: 2px;
                    left: 50%;
                    top: 50%;
                    background-color: var(--contrast);
                    transform: translate(-50%, -50%) rotate(45deg);
                }
                &::after {
                    transform: translate(-50%, -50%) rotate(-45deg);
                }
            }
        }
    }
}
</style>