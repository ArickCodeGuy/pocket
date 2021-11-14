<template>
    <div id="Game-header">
        <div class="container">
            <div class="top">
                <div
                    class="burger"
                    :class="{'toggled': menuToggled}"
                    @click="toggleNav"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="header"><router-link to="/game/">{{title}}</router-link></div>
            </div>
            <hr class="spacer">
            <nav
                class="nav"
                v-if="showNav"
            >
                <div class="nav__list">
                    <router-link v-for="(item,i) in items" :key="i" class="nav__link" :to="item.link">
                        <div class="first">{{item.first}}</div>
                        <div class="second">{{item.second}}</div>
                    </router-link>
                </div>
            </nav>
            <hr class="spacer" v-if="showNav">
        </div>
        <Menu
            :toggled="menuToggled"
            @toggleNav="toggleNav"
        />
    </div>
</template>
<script lang="">
import Menu from './Menu.vue'
export default {
    props: {
        showNav: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: 'Pocket'
        }
    },
    components: {Menu},
    data() {
        return {
            menuToggled: false,
            items: [
                {first: this.$store.state.user.calculated_health + '', second: this.$store.state.user.current_health + '', link: '/game/user/info/'},
                {first: this.$store.state.user.calculated_mana + '', second: this.$store.state.user.current_mana + '', link: '/game/user/skills/'},
                {first: this.$store.state.user.calculated_weight + '', second: this.$store.state.user.current_weight + '', link: '/game/user/backpack/'},
            ],
        }
    },
    beforeMount() {
        this.$store.dispatch('getProfile')
    },
    computed: {
        current_health() { return this.$store.state.user.current_health + '' },
        current_mana() { return this.$store.state.user.current_mana + '' },
        current_weight() { return this.$store.state.user.current_weight + '' },
        calculated_health() { return this.$store.state.user.calculated_health + '' },
        calculated_mana() { return this.$store.state.user.calculated_mana + '' },
        calculated_weight() { return this.$store.state.user.calculated_weight + '' },
    },
    methods: {
        toggleNav() {
            this.menuToggled = !this.menuToggled
        }
    }
}
</script>

<style lang="scss" scoped>
    #Game-header {
        .top {
            padding: 10px 0;
            display: flex;
            align-items: center;
            .burger {
                margin-right: 20px;
            }
        }
        .header {
            font-size: 2rem;
            font-weight: bold;
            line-height: normal;
            a {
                text-decoration: none;
                color: var(--color-primary);
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .burger {
            width: 30px;
            height: 20px;
            position: relative;
            cursor: pointer;
            transition: .3s;
            span {
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                width: 100%;
                height: 3px;
                border-radius: 3px;
                background-color: var(--contrast);
                transition: .3s;
                &:nth-child(1) {}
                &:nth-child(2) {
                    top: 50%;
                    transform: translateY(-50%);
                }
                &:nth-child(3) {
                    top: 100%;
                    transform: translateY(-100%);
                }
            }
            &.toggled {
                transform: rotate(90deg);
                :nth-child(1) {
                    top: 50%;
                    transform: translateY(-50%) rotate(45deg); 
                }
                :nth-child(2) {
                    width: 0;
                    left: 50%;
                }
                :nth-child(3) {
                    top: 50%;
                    transform: translateY(-50%) rotate(-45deg);
                }
            }
            @media (min-width: 1800px) {
                display: none;
            }
        }
        .nav {
            font-size: .6rem;
            &__list {
                display: flex;
                gap: 15px;
                justify-content: space-between;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            &__link {
                width: 100%;
                margin: 0;
                border-radius: 20px;
                padding: 5px 10px;
                padding-left: 40px;
                background-size: 50px;
                background-repeat: no-repeat;
                background-position: left 10px center;
                text-decoration: none;
                color: var(--color-primary);
                box-shadow: 0px 0px 10px var(--block-shadow);
                line-height: normal;
                .first {

                }
                .second {
                    font-size: .7em;
                }
            }
            @media (min-width: 768px) {
                font-size: 1rem;
                &__list {
                    gap: 30px;
                }
                &__link {
                    border-radius: 30px;
                    padding-left: 55px;
                }
            }
        }
    }
</style>