<template>
    <div id="Game-menu">
        <div
            class="menu"
            :class="{ 'toggled': toggled }"
        >
            <div class="menu__top">
                <div class="char">
                    <div
                        class="char__img"
                        :style="{ backgroundImage: 'url('+user.img+')' }"
                    />
                    <div class="char__right">
                        <div class="char__name">{{user.name}}</div>
                        <div class="char__desc">{{user.lvl}} level</div>
                    </div>
                </div>
            </div>
            <div class="menu__body">
                <div class="menu__group">
                    <router-link :to="'/game/user/info/'" class="menu__item">Character</router-link>
                    <router-link :to="'/game/user/skills/'" class="menu__item">Skills</router-link>
                    <router-link :to="'/game/user/backpack/'" class="menu__item">Backpack</router-link>
                </div>
                <div class="menu__group">
                    <router-link :to="'/game/'" class="menu__item">Location</router-link>
                    <router-link :to="'/game/quests/'" class="menu__item">Quests</router-link>
                    <router-link :to="'/game/friends/'" class="menu__item">Friends</router-link>
                </div>
                <div class="menu__group">
                    <div class="menu__group-title">Rules & Safety</div>
                    <router-link :to="'/game/agreement/'" class="menu__item">Agreement</router-link>
                    <router-link :to="'/game/confidentiality/'" class="menu__item">Policy</router-link>
                </div>
                <div class="menu__group">
                    <div class="menu__group-title">Discussions</div>
                    <router-link :to="'/forum/'" class="menu__item">Forum</router-link>
                    <router-link :to="'#'" class="menu__item">VK</router-link>
                </div>
                <div class="menu__group">
                    <div class="menu__group-title">Other</div>
                    <router-link :to="'/game/change/'" class="menu__item">Change character</router-link>
                </div>
            </div>
        </div>
        <div
            class="menu-bg"
            :class="{ 'toggled': toggled }"
            @mousedown="toggleNav"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: ['toggled'],
    methods: {
        toggleNav() {
            this.$emit('toggleNav')
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
})
</script>

<style lang="scss" scoped>
#Game-menu {
    .menu {
        --p: 15px;
        z-index: 100;
        position: fixed;
        overflow-y: auto;
        background-color: var(--block-color2);
        top: 0;
        width: 300px;
        max-width: calc(100% - 30px);
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
        @media (min-width: 1800px) {
            left: 0;
            width: 300px;
            padding: 40px 0;
        }
    }
    .menu-bg {
        position: fixed;
        z-index: 95;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--block-shadow);
        transition: .3s;
        opacity: 0;
        cursor: pointer;
        pointer-events: none;
        &.toggled {
            pointer-events: auto;
            opacity: 1;
        }
    }
}
</style>