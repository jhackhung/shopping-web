<template>
    <section class="product-list">
        <section>
            <base-dialog :show="!!error" title="錯誤!" @close="handleError">
                <p>{{ error }}</p>
            </base-dialog>
        </section>
        <section>
            <!-- <div class="controls">
                <base-button mode="square" @click="loadProducts(true)">重新整理</base-button>
            </div> -->
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasProducts">
                <product-item v-for="prod in products" :key="prod.id" :id="prod.id" :img="prod.img" :name="prod.name"
                    :rate="prod.rate" :description="prod.description" :price="prod.price" :categories="prod.categories"></product-item>
            </ul>
            <h3 v-else class="no-product">尚無商品</h3>
        </section>
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
            isLoading: false,
            error: null
        }
    },
    computed: {
        products() {
            return this.$store.getters['prods/products'];
        },
        hasProducts() {
            return !this.isLoading && this.$store.getters['prods/hasProducts'];
        }
    },
    methods: {
        async loadProducts(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('prods/loadProducts', { forceRefresh: refresh });
            } catch (err) {
                this.error = err.message || 'Failed to fetch products.';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    },
    created() {
        this.loadProducts();
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    max-width: 30rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(25rem, 1fr)); /* Two columns with minimum width of 15rem */
    gap: 1rem; /* Gap between grid items */
    justify-content: center; /* Center the grid horizontally */
}

.product-list {
    margin: 2rem auto;
    max-width: 40rem;
}

.no-product {
    text-align: center;
    margin-top: 2rem;
}

.controls {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    margin: 20px auto;
}
</style>