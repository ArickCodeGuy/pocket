<template>
    <div id="game-location-info">
        <div class="name">{{location.name}}</div>
        <div class="description">{{location.description}}</div>
    </div>
</template>

<script>
export default {
    computed: {
        location() {return this.$store.getters.getLocationInfo},
    },
}
</script>

<style lang="scss" scoped>
#game-location-info {
    .name {
        font-weight: bold;
        margin-bottom: 1rem;
    }
    .description {
        padding: 10px;
        background-color: var(--block-color);
        border-radius: 5px;
    }
}
</style>