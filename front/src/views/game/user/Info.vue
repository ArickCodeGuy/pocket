<template>
    <div id="user-info">
        <Header :showNav="false"/>
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="character-grid">
                        <div @click="characterGridClick('neck')" class="character-grid__item character-grid__item--neck" />
                        <div @click="characterGridClick('head')" class="character-grid__item character-grid__item--head" />
                        <div @click="characterGridClick('hands')" class="character-grid__item character-grid__item--hands" />
                        <div @click="characterGridClick('hand-left')" class="character-grid__item character-grid__item--hand-left" />
                        <div @click="characterGridClick('hand-right')" class="character-grid__item character-grid__item--hand-right" />
                        <div @click="characterGridClick('body')" class="character-grid__item character-grid__item--body" />
                        <div @click="characterGridClick('feet')" class="character-grid__item character-grid__item--feet" />
                        <div @click="characterGridClick('profile-picture')" class="character-grid__item character-grid__item--profile-picture" />
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="characteristics">
                        <!-- <p class="title">Characteristics:</p> -->
                        <!-- <div class="spacer"></div> -->
                        <div class="spare">
                            <span>Free points</span>
                            <span>{{ points + '' }}</span>
                        </div>
                        <div class="spacer"></div>
                        <!-- @@TODO tooltip -->
                        <div class="group">
                            <div class="group-item" v-for="(attribute, i) in attributes" :key="attribute.key">
                                <span>{{ attribute.title }}</span>
                                <span class="group-item__right">
                                    <span :class="{ 'hidden': !attribute.plus }" class="group-item__minus" @click="removePoint(i)"></span>
                                    <span :class="{ 'hidden': !points }" class="group-item__plus" @click="addPoint(i)"></span>
                                    <span class="group-item__number">{{ attribute.value }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="submit" :class="{ 'disabled': points_wasted === 0 }" @click="characteristicsSubmit">Submit</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './../../../components/Game/Header'
export default {
    components: {Header},
    data() {
        return {
            points: 0,
            points_wasted: 0,
            attributes: [],
        }
    },
    watch: {
        '$store.state.user': {
            handler(val) {
                this.points = val.free_attributes;
                this.attributes = [
                    {key: 'base_strength', title: 'Strength', plus: 0, value: val.base_strength},
                    {key: 'base_agility', title: 'Agility', plus: 0, value: val.base_agility},
                    {key: 'base_stamina', title: 'Stamina', plus: 0, value: val.base_stamina},
                    {key: 'base_wisdom', title: 'Wisdom', plus: 0, value: val.base_wisdom},
                    {key: 'base_luck', title: 'Luck', plus: 0, value: val.base_luck},
                ];
            },
            immediate: true,
            deep: true,
            flush: 'post',
        }
    },
    methods: {
        characterGridClick(item) {
            this.$store.dispatch('getItemsByType')
        },
        addPoint(i) {
            if (this.points) {
                this.attributes[i].value++
                this.attributes[i].plus++
                this.points_wasted++
                this.points--
            }
        },
        removePoint(i) {
            if (this.attributes[i].plus !== 0) {
                this.attributes[i].value--
                this.attributes[i].plus--
                this.points_wasted--
                this.points++
            }
        },
        characteristicsSubmit() {
            const data = this.attributes.reduce((obj, item) => {
                obj[item.key] = item.value
                return obj
            }, {})
            this.$store.dispatch('requestAttributesChange', data)
        }
    }
}
</script>

<style lang="scss">
.character-grid {
    display: grid;
    grid-gap: 10px;
    grid-template-areas: 'neck pp head'
                         'hand-left pp hands'
                         'hand-left pp hand-right'
                         'body pp feet';
    &__item {
        &--neck {grid-area: neck}
        &--profile-picture {grid-area: pp}
        &--head {grid-area: head}
        &--hands {grid-area: hands}
        &--hand-left {grid-area: hand-left}
        &--hand-right {grid-area: hand-right}
        &--body {grid-area: body}
        &--feet {grid-area: feet}
        background-color: rgba(0,0,0,.1);
        cursor: pointer;
        &::after {
            content: '';
            display: block;
            padding-top: 50%;
        }
    }
}
.characteristics {
    .title {
        font-weight: bold;
        margin: 0;
    }
    .spare {
        font-weight: bold;
        display: flex;
        justify-content: space-between;
    }
    .group {
        font-size: .8rem;
        > * {
            padding: 2px 0;
            border-bottom: 1px dashed rgba(0,0,0,.3);
            &:last-child {
                border: none;
            }
        }
    }
    .group-item {
        display: flex;
        justify-content: space-between;
        &__right {
            display: flex;
            align-items: center;
        }
        &__plus, &__minus {
            position: relative;
            cursor: pointer;
            margin-right: 1rem;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            border: 2px solid var(--contrast);
            &.hidden {
                opacity: 0;
                pointer-events: none;
            }
            &::before, &::after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 60%;
                height: 2px;
                background-color: var(--contrast);
            }
            &::after {
                transform: translate(-50%, -50%) rotate(90deg);
            }
        }
        &__minus {
            &::after {display: none;}
        }
        &__number {
            width: 30px;
        }
    }
    .submit {
        cursor: pointer;
        padding: 5px 10px;
        text-align: center;
        border: 1px solid var(--contrast);
        transition: .3s;
        &.disabled {
            opacity: .5;
            pointer-events: none;
        }
    }
}
</style>