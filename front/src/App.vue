<template>
    <router-view/>
    <Loader v-if="false"/>
</template>

<script>
import Loader from './components/loader.vue'
export default {
    components: {Loader}
}
</script>