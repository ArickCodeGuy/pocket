<template>
    <div id="game">
        <Header />
        <GameBody />
    </div>
</template>

<script>
import Header from './../components/GameHeader/index'
import GameBody from './../components/GameBody/index'
export default {
    components: {Header, GameBody},
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