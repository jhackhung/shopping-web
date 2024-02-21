<template>
    <section>
        <ul>
            <product-item v-for="prod in products" :key="prod.id" :img="prod.img" :name="prod.name" :rate="prod.rate"
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
    data() {
        return {
            products: [
                {
                    id: 'p1',
                    img: 'https://via.placeholder.com/150',
                    name: '商品一',
                    rate: 4.5,
                    price: 29.99,
                    categories: ['clothing']
                },
                {
                    id: 'p2',
                    img: 'https://via.placeholder.com/150',
                    name: '商品2',
                    rate: 3.5,
                    price: 39.99,
                    categories: ['electronics']
                },
                {
                    id: 'p3',
                    img: 'https://via.placeholder.com/150',
                    name: '商品3',
                    rate: 5,
                    price: 49.99,
                    categories: ['clothing', 'electronics']
                }
            ]
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