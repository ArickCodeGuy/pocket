<template>
    <div id="Header">
        <div class="container">
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent ({
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
    },
    methods: {
    }
})
</script>

<style lang="scss" scoped>
    #Header {
        z-index: 100;
        position: relative;
        background-color: var(--block-color);
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
    }
</style>