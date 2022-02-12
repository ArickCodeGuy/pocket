<template>
    <div
        class="popup"
        @mousedown="close"
        :style="{
            'animation-duration': `${animationDuration}ms`
        }"
        :class="{
            'animate-in': isAnimating === true,
            'animate-out': isAnimating === false,
            'animation-in-end': (isAnimating === null && visibility === true),
            'animation-out-end': (isAnimating === null && visibility === false)
        }"
        v-show="visibility"
    >
        <div class="popup-table" @mousedown="close">
            <div class="popup-content-row" @mousedown="close">
                <div class="popup-content-cell" @mousedown="close">
                    <div
                        class="popup-content"
                    >
                        <div class="popup-closer" v-if="closerVisibility" @mousedown="close"></div>
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        closerVisibility: {
            type: Boolean,
            default: true,
        },
        visibility: {
            type: Boolean,
            default: false,
        },
        animationDuration: {
            type: Number,
            default: 300,
        },
    },
    data() {
        return {
            isAnimating: null as null | boolean,
            timeoutFunc: null as null | number,
        }
    },
    methods: {
        close(event: MouseEvent) {
            // no bubbling happens but just in case
            event.stopPropagation()
            if (event.target === event.currentTarget) {
                this.$emit('popupVisibilityChange', false)
            }
        },
        changeVisibility(val: boolean) {
            this.isAnimating = val
            if (typeof this.timeoutFunc === 'function') {
                clearTimeout(this.timeoutFunc)
            }
            this.timeoutFunc = setTimeout(() => {
                this.isAnimating = null
            }, this.animationDuration)
        },
    },
    watch: {
        visibility: {
            handler(val) {
                this.changeVisibility(val)
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    overflow-y: scroll;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: var(--block-shadow);
    z-index: 1000;
    animation-iteration-count: 1;
    @keyframes animatein {
        from {opacity: 0;}
        to {opacity: 1;}
    }
    @keyframes animateout {
        from {opacity: 1;}
        to {opacity: 0;}
    }
    &.animate-in {animation: animatein; display: block !important;}
    &.animate-out {animation: animateout; display: block !important;}
    // &.animation-in-end {opacity: 1;}
    // &.animation-out-end {opacity: 0;}
    .popup-closer {
        --size: 20px;
        margin-bottom: 1rem;
        position: relative;
        width: var(--size);
        height: var(--size);
        cursor: pointer;
        transition: .3s;
        &::before, &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 141.4%;
            height: 3px;
            background-color: var(--contrast);
            transform: translate(-50%, -50%) rotate(45deg);
        }
        &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        &:hover {
            transform: scale(.8);
        }
    }
    .popup-table {
        display: table;
        width: 100%;
        height: 100%;
    }
    .popup-content-row {
        display: table-row;
    }
    .popup-content-cell {
        display: table-cell;
        vertical-align: middle;
    }
    .popup-content {
        cursor: auto;
        // min-height: 500px;
        max-width: 740px;
        margin-left: auto;
        margin-right: auto;
        background-color: var(--bgc);
        padding: 12px;
    }
    @media (min-width: 768px) {
        padding: 40px;
        .popup-content-wrapper {
            padding: 15px;
        }
        .popup-content {
            padding: 15px;
        }
    }
}
</style>