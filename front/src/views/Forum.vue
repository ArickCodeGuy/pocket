<template>
    <div id="Forum">
        <Header :showFake="true"/>
        <div class="container">
            <div @click="togglePopup">show popup</div>
            <Popup :visibility="popup" @popupVisibilityChange="togglePopup">\</Popup>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './../components/Header/index.vue'
export default defineComponent({
    components: {Header},
    data() {
        return {
            a: '',
            popup: false,
        }
    },
    methods: {
        togglePopup() {
            this.popup = !this.popup

            // const result = await this.$Popup('my text')

        }
    }
})
</script>