<template>
    <div id="game-location-info">
        <div class="name">{{location.name}}</div>
        <hr class="spacer">
        <div class="description">{{location.description}}</div>
    </div>
</template>

<script>
export default {
    computed: {
        location() {return this.$store.getters.getLocationInfo},
    },
    beforeMount() {
        this.$store.dispatch('getLocationData')
    }
}
</script>

<style lang="scss" scoped>
#game-location-info {
    .name {
        font-weight: bold;
    }
    .description {
        padding: 10px;
        background-color: var(--block-color);
        border-radius: 5px;
    }
}
</style>