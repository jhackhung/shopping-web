<template>
    <header>
        <h1>
            <router-link to="/" class="logo">
                <img src="../../assets/cozyFit.png" alt="icon">
                <p>CozyFit</p>
            </router-link>
        </h1>
        <nav>
            <ul>
                <li>
                    <router-link to="/products" class="mode mode-prod">商品</router-link>
                </li>
                <li class="cart-container" @mouseover="showCartPreview" @mouseleave="hideCartPreview">
                    <router-link to="/cart" class="mode mode-cart">
                        <img class="cart-img" src="../../assets/shopping-cart.png" alt="shopping-cart">
                    </router-link>
                    <base-badge class="badge">{{ cartquantity }}</base-badge>
                    <div v-show="isCartPreviewVisible" class="cart-preview">
                        <p v-if="cartquantity === 0" class="no-item-content">購物車內目前沒有商品</p>
                        <ul v-else>
                            <li v-for="item in cartItems" :key="item.id">
                                <img :src="item.img" :alt="item.name" class="preview-img">
                                <div>
                                    <p class="nav-shopping-cart-title">{{ item.name }}</p>
                                    <p class="nav-shopping-cart-price">NT${{ item.price }}  <strong>x{{ item.qty }}</strong></p>
                                    <i class="remove-icon" @click="removeFromCart(item.id)"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li v-if="!isLoggedIn">
                    <router-link to="/login">登入</router-link>
                </li>
                <li v-else>
                    <router-link :to="{ path: '/login', query: { logout: true } }" tag="button" @click.native="logout">登出</router-link>
                </li>
                <li v-if="!isLoggedIn">
                    <router-link to="/signup">註冊</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script>
export default {
    data() {
        return {
            isCartPreviewVisible: false,
        }
    },
    computed: {
        cartquantity() {
            return this.$store.getters['cart/quantity'];
        },
        cartItems() {
            return this.$store.getters['cart/products'];
        },
        isLoggedIn() {
            return this.$store.getters['auth/isLoggedIn'];
        }
    },
    methods: {
        logout() {
            if(this.cartquantity > 0) {
                this.$store.dispatch('cart/clearCart');
            }
            this.$store.dispatch('auth/logout');
        },
        showCartPreview() {
            this.isCartPreviewVisible = true;
        },
        hideCartPreview() {
            this.isCartPreviewVisible = false;
        },
        removeFromCart(id) {
            this.$store.dispatch('cart/removeFromCart', {
                id
            });
        }
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

.logo {
    font: 2rem 'Madimi One', cursive;
    display: flex;
    align-items: center;
}


.logo img {
    width: 40px;
    height: 40px;
}

.badge {
    position: absolute;
    right: 20.25rem;
    top: 0.9rem;
    cursor: default;
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
    right: 330px;
    background-color: white;
    border: 1px solid #ccc;
    padding: 12px;
    width: 340px;
    display: none;
    flex-direction: column;
    max-height: 300px;
    overflow-y: auto;
    z-index: 100;
}

.no-item-content {
    text-align: center;
    color: #999;
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
    position: relative;
}

.cart-preview li p {
    margin: 0;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.nav-shopping-cart-title {
    height: 35px;
    font-size: 15px;
    font-weight: 700;
    color: #4a4e5c;
}

.nav-shopping-cart-price {
    font-size: 1.2rem;
    line-height: 1.5;
    color: #333;
}

.remove-icon {
    position: absolute;
    right: 0;
    top: 25px;
    width: 20px;
    height: 20px;
    background: url(../../assets/remove.png) no-repeat;
    background-size: cover;
    cursor: pointer;
}

.cart-container:hover .cart-preview {
    display: block;
}

.mode-prod {
    position: absolute;
    right: 27rem;
    top: 1.2rem;
}

.mode-cart {
    position: absolute;
    right: 24rem;
    top: 0.75rem;
}
.mode:hover,
.mode:active,
.mode.router-link-active {
    border-color: #333;
}
</style>