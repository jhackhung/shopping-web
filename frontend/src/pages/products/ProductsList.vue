<template>
    <section class="product-list">
        <section>
            <base-dialog :show="!!error" title="錯誤!" @close="handleError">
                <p>{{ error }}</p>
            </base-dialog>
        </section>
        <section>
            <div v-if="message">
                <base-dialog :show="true" :title="title" @close="handleMessage">
                    {{ message }}
                </base-dialog>
            </div>
        </section>
        <section>
            <div class="search-container">
                <input type="text" v-model="search" placeholder="搜尋商品">
            </div>
            <!-- <div class="controls">
                <base-button mode="square" @click="loadProducts(true)">重新整理</base-button>
            </div> -->
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasProducts">
                <product-item v-for="prod in filteredProducts" :key="prod.id" :id="prod.id" :img="prod.img" :name="prod.name"
                    :rate="prod.rate" :description="prod.description" :price="prod.price"
                    :categories="prod.categories"></product-item>
                <h3 class="no-product" v-if="!filteredProducts.length">找不到此條件的商品</h3>
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
            error: null,
            message: '',
            title: '',
            search: ''
        }
    },
    computed: {
        products() {
            return this.$store.getters['prods/products'];
        },
        hasProducts() {
            return !this.isLoading && this.$store.getters['prods/hasProducts'];
        },
        filteredProducts() {
            if (this.search) {
                return this.products.filter(prod => prod.name.includes(this.search));
            }
            return this.products;
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
        },
        handleMessage() {
            this.message = '';
            this.title = '';
            this.$router.replace({ query: {} });
        }
    },
    created() {
        this.loadProducts();

        if (this.$route.query.checkout) {
            this.title = '成功';
            this.message = '您已成功結帳';
        } else if (this.$route.query.redirectToCheckout) {
            this.title = '購物車尚無商品';
            this.message = '請先加入商品至購物車';
        } else {
            this.title = '';
            this.message = '';
        }
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
    grid-template-columns: repeat(2, minmax(25rem, 1fr));
    /* Two columns with minimum width of 15rem */
    gap: 1rem;
    /* Gap between grid items */
    justify-content: center;
    /* Center the grid horizontally */
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

.search-container {
    text-align: center;
    margin-bottom: 20px;
}

.search-container input[type=text] {
    padding: 10px;
    width: 50%;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

</style>