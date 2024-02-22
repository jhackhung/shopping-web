<template>
    <button :class="mode">
        <slot></slot>
    </button>
</template>
<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: 'default'
        }
    }
}
</script>
<style scoped>
button {
    text-decoration: none;
    font: inherit;
    cursor: pointer;
    margin-right: 0.25rem;
    display: inline-block;
}
.default {
    background-color: #a9abad;
    border: 1px solid #a9abad;
    margin-top: 0.5rem;
    padding: 0.75rem 4.5rem;
    color: #000;
    border-radius: 10px;
    transition-property: background-color;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0, 0, 1, 1);
}


.default:hover {
    background-color: #363636;
    color: #fff
}

.square {
    border-radius: 10px;
    background-color: #484848;
    color: #fff;
    border: none;
}

.square:hover,
.square:active {
    background-color: #363636;
}
</style>