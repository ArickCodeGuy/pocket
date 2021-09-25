<template>
    <div id="game">
        <Header />
        <div class="container">
            <LocationInfo />
            <LocationsList />
        </div>
    </div>
</template>

<script>
import Header from './../components/Game/Header'
import LocationInfo from './../components/Game/LocationInfo'
import LocationsList from './../components/Game/LocationsList'
export default {
    components: {Header, LocationInfo, LocationsList},
    data() {
        return {
            
        }
    },
    beforeMount() {
        this.$store.dispatch('getProfile')
            .then(() => {
                this.$store.dispatch('getLocationData')
            })
    }
}
</script>

<style lang="scss" scoped>
#game {
    .container {
        display: grid;
        grid-gap: var(--gap);
    }
}
</style>