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
                <li>
                    <router-link to="/cart" class="mode">購物車</router-link>
                    <base-badge>{{ cartquantity }}</base-badge>
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


.mode:hover,
.mode:active,
.mode.router-link-active {
    border-color: #333;
}
</style>