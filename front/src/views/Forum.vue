<template>
    <div id="Forum">
        <Header :showFake="true"/>
        <div class="container">
            <div @click="changePopupVisibility()">show popup</div>
            <Popup :visibility="popupVisibility" @popupVisibilityChange="changePopupVisibility">\</Popup>
            <Spacer class="spacer-10-lg"/>
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
            popupVisibility: false,
        }
    },
    methods: {
        changePopupVisibility(bool: boolean | undefined) {
            bool !== undefined ? this.popupVisibility = bool: this.popupVisibility = !this.popupVisibility
        }
    }
})
</script>