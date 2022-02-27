<template>
    <div
        class="spacer"
    />
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@for $i from 1 through 10 {
    .spacer-#{$i} {
        height: 4px * $i;
        @media (min-width: 768px) {
            &-md {
                height: 4px * $i;
            }
        }
        @media (min-width: 1200px) {
            &-lg {
                height: 4px * $i;
            }
        }
    }
}
</style>