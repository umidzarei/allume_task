<template>
    <div>
        <slot name="heading"></slot>
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 'guide'
        }
    }
}
</script>