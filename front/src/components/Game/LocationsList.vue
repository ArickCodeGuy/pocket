<template>
    <div id="game-locations-list">
        <div class="locations">
            <div
                class="item"
                v-for="location in locationsList"
                :key="location.id"
                @click="changeLocation(location.id)"
            >
                <div class="item__name">{{location.name}}</div>
                <div class="item__time">{{location.time}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        locationsList() {return this.$store.getters.getLocationNeighbours}
    },
    methods: {
        changeLocation(to) {
            to
        }
    }
}
</script>

<style lang="scss" scoped>
#game-locations-list {
    .locations {
        display: grid;
        grid-gap: 5px;
        .item {
            padding: 10px;
            display: flex;
            justify-content: space-between;
            border-radius: 5px;
            transition: .3s;
            cursor: pointer;
            &:hover {
                background-color: var(--block-color);
            }
            &__name {
                text-transform: capitalize;
            }
            &__time {
                font-weight: bold;
            }
        }
    }
}
</style>