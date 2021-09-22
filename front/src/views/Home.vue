<template>
    <div class="home">
        <Header
            :logo="logoLink"
            :links="links"
        />
    </div>
</template>

<script lang="ts">
import Header from './../components/Header/index.vue'
export default {
    components: {Header},
    data() {
        return {
            links: [
                {link: '/', label: 'Home'},
                {link: '/forum', label: 'Forum'},
                {link: '/login', label: 'Login'},
            ],
            logoLink: './../assets/logo.png'
        }
    }
};
</script>