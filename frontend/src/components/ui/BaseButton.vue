<template>
    <button>
        <slot></slot>
    </button>
</template>
  
<style scoped>
button {
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font: inherit;
    background-color: #f8f9fa;
    border: 1px solid #f8f9fa;
    color: #000;
    cursor: pointer;
    border-radius: 30px;
    margin-right: 0.5rem;
    display: inline-block;
    transition-property: background-color;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0, 0, 1, 1);
}

button:hover {
    background-color: #ccc;
}
</style>