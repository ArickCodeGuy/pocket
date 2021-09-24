<template>
    <div id="game-header">
        <div class="container">
            <div class="top">
                <div
                    class="burger"
                    :class="{'toggled': menu.toggled}"
                    @click="toggleNav"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="header"><router-link to="/">Pocket</router-link></div>
            </div>
        </div>
        <nav class="nav">
            <ul>
                <li v-for="(item,i) in items" :key="i">
                    <span class="first">{{item.first}}</span>
                    <span class="second">{{item.second}}</span>
                </li>
            </ul>
        </nav>
        <div
            class="menu"
            :class="{ 'toggled': menu.toggled }"
        >
            <div class="menu__top">
                <div class="char">
                    <div
                        class="char__img"
                        :style="{ backgroundImage: 'url('+user.img+')' }"
                    />
                    <div class="char__right">
                        <div class="char__name">{{user.name}}</div>
                        <div class="char__desc">{{user.lvl}} уровень</div>
                    </div>
                </div>
            </div>
            <div class="menu__body">
                <div class="menu__group">
                    <router-link :to="'/game/user/info/'" class="menu__item">Персонаж</router-link>
                    <router-link :to="'/game/user/skills/'" class="menu__item">Умения</router-link>
                    <router-link :to="'/game/user/backpack/'" class="menu__item">Сумка</router-link>
                </div>
                <div class="menu__group">
                    <router-link :to="'/game/'" class="menu__item">Локация</router-link>
                    <router-link :to="'/game/quests/'" class="menu__item">Задания</router-link>
                    <router-link :to="'/game/friends/'" class="menu__item">Друзья</router-link>
                </div>
                <div class="menu__group">
                    <div class="menu__group-title">Правила и безопасность</div>
                    <router-link :to="'/game/agreement/'" class="menu__item">Соглашение</router-link>
                    <router-link :to="'/game/confidentiality/'" class="menu__item">Конфиденциальность</router-link>
                </div>
                <div class="menu__group">
                    <div class="menu__group-title">Общение</div>
                    <router-link :to="'#'" class="menu__item">ВК</router-link>
                </div>
                <div class="menu__group">
                    <div class="menu__group-title">Прочее</div>
                    <router-link :to="'/game/change/'" class="menu__item">Сменить персонажа</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="">
export default {
    data () {
        return {
            items: [
                {first: this.$store.state.user.calculated_health, second: this.$store.state.user.current_health},
                {first: this.$store.state.user.calculated_mana, second: this.$store.state.user.current_mana},
                {first: this.$store.state.user.calculated_weight, second: this.$store.state.user.current_weight},
            ],
            menu: {
                toggled: false,
            }
        }
    },
    methods: {
        toggleNav() {
            this.menu.toggled = !this.menu.toggled
        }
    },
    computed: {
        user: function() {
            return {
                img: this.$store.state.user.profile_picture,
                name: this.$store.state.user.name,
                lvl: this.$store.state.user.lvl,
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    #game-header {
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
            @media (min-width: 768px) {
                display: none;
            }
        }
        .nav {
            display: flex;
            ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            li {
                margin: 0;
                padding: 5px 10px;
                padding-left: 40px;
                background-size: 50px;
                background-repeat: no-repeat;
                background-position: left 10px center;
                box-shadow: var(--block-shadow);
            }
        }
        .menu {
            --p: 15px;
            position: absolute;
            overflow-y: auto;
            top: 0;
            width: 100%;
            height: 100vh;
            left: -100%;
            transition: .3s;
            &.toggled {
                left: 0;
            }
            &__top {
            }
            .char {
                padding: 10px var(--p);
                display: flex;
                align-items: center;
                &__img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--contrast);
                    border: 1px solid var(--block-shadow);
                    margin-right: 20px;
                }
                &__right {

                }
                &__name {
                    color: var(--color-primary);
                    // line-height: .9em;
                }
                &__desc {
                    font-size: .7rem;
                    line-height: normal;
                }
            }
            &__body {
            }
            &__group {
                padding-top: 0;
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid var(--contrast);
                &:last-child {border-bottom: 0;}
            }
            &__item {
                text-decoration: none;
                color: var(--color-primary);
                display: block;
                padding: 5px var(--p);
                transition: .3s;
                &:hover {
                    background-color: var(--block-color-hover);
                }
            }
            &__group-title {
                padding: 5px var(--p);
                margin-bottom: 0.5em;
            }
            @media (min-width: 768px) {
                left: 0;
                width: 300px;
                padding: 40px 0;
            }
        }
    }
</style>