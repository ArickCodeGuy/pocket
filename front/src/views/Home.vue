<template>
    <div class="home">
        <Header
            :logo="logoLink"
            :links="links"
        />
        <div class="main-banner">
            <div class="container">
                <div class="content">
                    <h1 class="heading">Pocket game</h1>
                    <p>Best text browser rpg</p>
                    <router-link to="/login" class="btn">Login</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Header from './../components/Header/index.vue'
export default {
    components: {Header},
    data() {
        return {
            logoLink: './../assets/logo.png'
        }
    }
};
</script>

<style lang="scss" scoped>
.main-banner {
    display: flex;
    align-items: center;
    min-height: 100vh;
    padding: var(--section-padding) 0;
    .content {
        max-width: 768px;
    }
}
</style>