<template>
    <div class="home">
        <Header
            :logo="logoLink"
            :links="links"
        />
        <div class="container">
            home
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