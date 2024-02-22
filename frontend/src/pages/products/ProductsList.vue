<template>
    <section>
        <ul>
            <product-item v-for="prod in products" :key="prod.id" :id="prod.id" :img="prod.img" :name="prod.name" :rate="prod.rate"
                :price="prod.price" :categories="prod.categories"></product-item>
        </ul>
    </section>
</template>
<script>
import ProductItem from '@/components/products/ProductItem.vue'

export default {
    components: {
        ProductItem
    },
    computed: {
        products() {
            return this.$store.getters['prods/products'];
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}
</style>