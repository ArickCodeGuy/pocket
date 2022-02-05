<template>
    <div class="Header">
        <div class="container">
            <div class="left">
                <ul class="links">
                    <li
                        v-for="(item, i) in links"
                        :key="i"
                    >
                        <router-link :to="item.link">
                            {{ item.label }}
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="theme-changer" @click="changeTheme">{{theme}}</div>
            </div>
        </div>
    </div>
    <div class="Header-fake" v-if="showFake"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({
    props: {
        showFake: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            links: [
                {link: '/', label: 'Home'},
                {link: '/forum', label: 'Forum'},
                {link: '/login', label: 'Login'},
            ],
        }
    },
    computed: {
        theme() { return this.$store.state.theme }
    },
    methods: {
        changeTheme() {
            let newTheme = this.theme === 'light' ? 'dark': 'light';
            this.$store.dispatch('changeTheme', newTheme)
        },
    }
})
</script>

<style lang="scss" scoped>
    .Header-fake {
        height: 54px;
    }
    .Header {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 100;
        background-color: var(--block-color);
        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .links {
            display: flex;
            // gap: 10px;
            list-style: none;
            margin: 0;
            padding: 0;
            li {

            }
            a {
                text-transform: uppercase;
                text-decoration: none;
                font-size: 1.2rem;
                display: inline-block;
                padding: 15px 20px;
                color: var(--color-primary);
                &:hover {
                    background-color: var(--bgc);
                }
            }
        }
        .theme-changer {
            display: flex;
            align-items: center;
            text-transform: capitalize;
            cursor: pointer;
            &::after {
                content: '';
                margin-left: 1rem;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                background-color: var(--contrast);
            }
        }
    }
</style>