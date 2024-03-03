<template>
    <li>
        <div class="product__data">
            <div class="product__image">
                <img :src="img" :alt="name">
            </div>
            <div class="product__text">
                <h3>{{ name }}</h3>
                <h4>單價：${{ price }}</h4>
                <!-- <div class="product__cgs">
                    <base-badge v-for="cgs in categories">{{ cgs }}</base-badge>
                </div> -->
                <p>{{ description }}</p>
            </div>
        </div>
        <div class="product__actions">
            <base-button @click="addToCart">加入購物車</base-button>
        </div>
    </li>
</template>
<script>
export default {
    props: ['id', 'img', 'name', 'rate', 'description', 'price', 'categories'],
    computed: {
        isLoggedIn() {
            return this.$store.getters['auth/isLoggedIn'];
        }
    },
    methods: {
        addToCart() {
            if (!this.isLoggedIn) {
                this.$router.push({ 'path': '/login', query: { redirectToProductList: true } });
            } else {
                this.$store.dispatch('cart/addProdToCart', {
                    id: this.id,
                })
            }
        }
    }
}
</script>
<style scoped>
li {
    width: 25rem;
    height: 20rem;
    margin: 1.5rem auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    background-color: white;
}

.product__data {
    display: flex;
}

.product__image {
    margin-right: 1rem;
}

.product__image img {
    height: 10rem;
    width: 10rem;
    border-radius: 15px;
    object-fit: cover;
}

.product__text {
    width: 100%;
    padding: 0.5rem;
}

.product__text h3 {
    margin: 0 0 0.5rem 0;
}

.product__text h4 {
    margin: 0;
}

.product__cgs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: center;
    margin-top: 4rem;
}

.product__actions {
    margin-top: 2rem;
    text-align: center;
    font-weight: 700;
}

/* button {
    margin: 1rem auto;
    font: inherit;
    cursor: pointer;
    background-color: #fff;
    color: #363636;
    border: 1px solid #fff;
    padding: 0.5rem 1.5rem;
    border-radius: 30px;
    font-size: 14px;
    letter-spacing: 1px;
}

button:hover,
button:active {
    background-color: #363636;
    border-color: #363636;
    color: #fff;
} */
</style>