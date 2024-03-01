<template>
    <section class="cart-container">
        <h1>購物車</h1>
        <div v-if="quantity === 0" class="empty-cart">
            <p>購物車是空的</p>
        </div>
        <div v-else>
            <p class="cart-info">共 {{ quantity }} 件商品，總金額 {{ total }} 元</p>
            <base-button class="checkout-btn">結帳</base-button>
            <ul class="cart-items">
                <li v-for="item in cart" :key="item.id" class="cart-item">
                    <img :src="item.img" :alt="item.name" class="item-img">
                    <div class="item-details">
                        <h2>{{ item.name }}</h2>
                        <p class="item-price">NT$ {{ item.price }}元</p>
                        <p class="item-quantity">數量： {{ item.qty }}</p>
                    </div>
                    <div class="remove-btn-container">
                        <button class="remove-btn" @click="removeFromCart(item.id)">移除</button>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        cart() {
            return this.$store.getters['cart/products'];
        },
        total() {
            return this.$store.getters['cart/totalSum'];
        },
        quantity() {
            return this.$store.getters['cart/quantity'];
        }
    },
    methods: {
        removeFromCart(id) {
            this.$store.dispatch('cart/removeFromCart', {
                id
            });
        }
    }
}
</script>

<style scoped>
.cart-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.empty-cart {
    text-align: center;
}

.cart-info {
    margin-bottom: 20px;
}

.checkout-btn {
    background-color: #0070c9;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
    display: inline-block;
}

.cart-items {
    list-style-type: none;
    padding: 20px;
    background-color: #f8f9fa;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}

.item-img {
    width: 100px;
    height: 100px;
    margin: 20px;
    display: inline-block;
}

.item-details {
    flex-grow: 1;
}

.item-price {
    font-weight: bold;
}

.remove-btn {
    background-color: #f00;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.remove-btn:hover {
    background-color: #d00;
}

</style>
