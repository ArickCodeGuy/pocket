<template>
    <div id="Forum">
        <Header/>
        <div class="container">
            <div @click="togglePopup()">show popup</div>
            <Popup v-if="popup" @popupVisibilityChange="togglePopup">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, est.
            </Popup>
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
        togglePopup(val: boolean) {
            if (val !== undefined) {
                this.popup = val
            }else {
                this.popup = !this.popup
            }

        }
    }
})
</script>