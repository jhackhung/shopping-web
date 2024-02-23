<template>
    <header>
        <h1>
            <router-link to="/">Shop</router-link>
        </h1>
        <nav>
            <ul>
                <li>

                    <router-link to="/products" class="mode">商品</router-link>

                </li>
                <li class="cart-container" @mouseover="showCartPreview" @mouseleave="hideCartPreview">
                    <router-link to="/cart" class="mode">
                        <img class="cart-img" src="../../assets/shopping-cart.png" alt="shopping-cart">
                    </router-link>
                    <base-badge>{{ cartquantity }}</base-badge>
                    <div v-show="isCartPreviewVisible" class="cart-preview">
                        <p v-if="cartquantity === 0">購物車內目前沒有商品</p>
                        <ul v-else>
                            <li v-for="item in cartItems" :key="item.id">
                                <img :src="item.img" :alt="item.name" class="preview-img">
                                <div>
                                    <h3>{{ item.name }} - ${{ item.price }}</h3>
                                    <p>{{ item.qty }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <router-link to="/login">登入</router-link>
                    <!-- <router-link>登出</router-link> -->
                </li>
                <li>
                    <router-link to="/signup">註冊</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
export default {
    computed: {
        cartquantity() {
            return this.$store.getters['cart/quantity'];
        },
        cartItems() {
            return this.$store.getters['cart/products'];
        }
    },
    data() {
        return {
            isCartPreviewVisible: false,
        }
    },
    methods: {
        showCartPreview() {
            this.isCartPreviewVisible = true;
        },
        hideCartPreview() {
            this.isCartPreviewVisible = false;
        },
    }

}
</script>
<style scoped>
header {
    height: 60px;
    background-color: #f8f9fa;
    display: flex;
    margin: 0 10%;
    padding: 12px 0;
    justify-content: space-between;
    align-items: center;
}

h1 {
    margin-left: 2rem;
}

ul {
    list-style: none;
    margin-right: 2rem;
    padding: 0;
    display: flex;
    justify-self: center;
    align-items: center;
}

li {
    margin: 0 1rem;
}

a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    padding-bottom: 0.25rem;
}

.cart-img {
    width: 25px;
    height: 25px;
    top: 6px;
    position: relative;
}

.preview-img {
    width: 75px;
    height: 75px;
    margin-right: 10px;
}

.cart-preview {
    position: absolute;
    top: 50px;
    right: 250px;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    display: none;
    flex-direction: column;
    max-height: 300px;
    overflow-y: auto;
}

.cart-preview ul {
    list-style: none;
    padding: 0;
    margin: 1px auto;
    display: grid;
}

.cart-preview li {
    margin: 10px;
    display: flex;
    align-items: center;
}

.cart-preview li h3,
.cart-preview li p {
    margin: 0;
}

.cart-container:hover .cart-preview {
    display: block;
}

.mode:hover,
.mode:active,
.mode.router-link-active {
    border-color: #333;
}
</style>