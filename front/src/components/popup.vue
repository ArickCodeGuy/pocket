<template>
    <div class="popup" @mousedown="close">
        <div class="popup-table" @mousedown="close">
            <div class="popup-content-row" @mousedown="close">
                <div class="popup-content-cell" @mousedown="close">
                    <div class="popup-content">
                        <div class="popup-closer" v-if="showCloser" @mousedown="close"></div>
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
    props: ['visibility', 'closerVisibility'],
    data() {
        return {
            isVisible: false,
            showCloser: true,
        }
    },
    watch: {
        visibility: {
            handler(val: boolean) {
                if (typeof val === 'boolean') {
                    this.isVisible = val
                }
            },
            immediate: true
        },
        closerVisibility: {
            handler(val: boolean) {
                if (typeof val === 'boolean') {
                    this.showCloser = val
                }
            },
            immediate: true
        }
    },
    methods: {
        close(event: MouseEvent) {
            // no bubbling happens but just in case
            event.stopPropagation()
            if (event.target === event.currentTarget) {
                this.$emit('popupVisibilityChange', false)
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
    .popup-closer {
        --size: 20px;
        margin-bottom: 1rem;
        position: relative;
        width: var(--size);
        height: var(--size);
        cursor: pointer;
        &::before, &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 141.4%;
            height: 3px;
            background-color: var(--contrast);
            transform: translate(-50%, -50%) rotate(45deg);
            transition: .3s;
        }
        &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        &:hover {
            &::before {
                transform: translate(-50%, -50%) rotate(-45deg);
            }
            &::after {
                transform: translate(-50%, -50%) rotate(45deg);
            }
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
        max-width: 740px;
        margin-left: auto;
        margin-right: auto;
        background-color: var(--bgc);
        padding: 12px;
    }
    @media (min-width: 768px) {
        .popup-content-wrapper {
            padding: 15px;
        }
        .popup-content {
            padding: 15px;
        }
    }
}
</style>