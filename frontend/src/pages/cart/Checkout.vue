<template>
    <section class="backdrop">
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <div class="card-container">
            <h1 class="checkout-title">結帳</h1>

            <div class="item-view">
                <h2>購物商品</h2>
                <ul class="item-list">
                    <li v-for="(item, index) in items" :key="index">
                        <img :src="item.img" :alt="item.name" class="item-img">
                        <div class="item-details">
                            <h2>{{ item.name }}</h2>
                            <div class="item-details-sub">
                                <p class="item-price">NT$ {{ item.price }}元</p>
                                <p class="item-quantity">數量： {{ item.qty }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="item-details-all">
                    <h3>共 {{ quantity }} 件商品</h3>
                    <h3>總金額： NT${{ total }}</h3>
                </div>
            </div>
            <div class="form-container">
                <form @submit.prevent="handleSubmit" class="checkout-form">
                    <div class="form-group">
                        <label for="customerName">顧客名稱:</label>
                        <input type="text" id="customerName" v-model="customerName" required>
                    </div>
                    <div class="form-group">
                        <label for="shippingAddress">收貨位置:</label>
                        <textarea id="shippingAddress" v-model="shippingAddress" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>付款方式:</label>
                        <label for="creditCard" class="radio">
                            <input type="radio" name="radio" id="creditCard" value="creditCard" v-model="paymentMethod">
                            <span>信用卡</span>
                        </label>
                        <label for="cash" class="radio">
                            <input type="radio" name="radio" id="cash" value="cash" v-model="paymentMethod">
                            <span>現金</span>
                        </label>
                    </div>
                    <base-button type="submit">確認結帳</base-button>
                </form>
            </div>
        </div>
        <div v-if="message">
            <base-dialog :show="true" :title="title" @close="handleMessage">
                {{ message }}
            </base-dialog>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        items() {
            return this.$store.getters['cart/products'];
        },
        total() {
            return this.$store.getters['cart/totalSum'];
        },
        quantity() {
            return this.$store.getters['cart/quantity'];
        }
    },
    data() {
        return {
            customerName: '',
            shippingAddress: '',
            paymentMethod: 'creditCard',
            user: localStorage.getItem('user'),
            isLoading: false
        }
    },
    created() {
        if (!this.user) {
            this.$router.push({ path: '/login', query: { redirectToCheckout: true } });
        }

        this.customerName = this.user;
    },
    methods: {
        async handleSubmit() {
            try {
                const order = {
                    user: this.customerName,
                    shipping_address: this.shippingAddress,
                    payment_method: this.paymentMethod,
                    products: this.items,
                    total: this.total
                }
                this.isLoading = true;
                await this.$store.dispatch('cart/checkout', order);
                this.isLoading = false;
                this.$router.push({ path: '/products', query: { checkout: 'success' } });
            } catch (error) {
                this.title = '錯誤';
                this.message = error.message;
                this.isLoading = false;
            }
        },
        handleMessage() {
            this.title = '';
            this.message = '';
            this.$router.replace({ query: {} });
        }
    }
}
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent black background */
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-container {
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 2rem auto;
    padding: 2rem;
    width: 90%;
    max-width: 40rem;
    z-index: 100;
    overflow-y: auto;
    max-height: 80vh;
}

.checkout-title {
    text-align: center;
    margin-bottom: 1rem;
}

.item-view {
    margin-bottom: 1rem;
}

.item-list {
    list-style: none;
    padding: 0;
}

.item-list li {
    margin-bottom: 1rem;
    display: flex;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
}

.item-img {
    width: 6rem;
    height: 6rem;
    border-radius: 12px;
    margin-right: 1rem;
}

.item-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.item-details-sub {
    display: flex;
    align-items: center;
}

.item-price {
    font-size: 1.25rem;
    margin-right: 2rem;
}

.item-quantity {
    margin: 0;
}

.item-details-all {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: bold;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

input[type="text"],
textarea {
    width: 100%;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

input[type="text"]:focus,
textarea:focus {
    border-color: #4CAF50;
    outline: none;
}

textarea {
    resize: vertical;
}

.checkout-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

.form-group label {
    align-self: start;
}

label.radio {
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.1;
    display: grid;
    grid-template-columns: 1em auto;
    gap: 0.5em;
}

.radio input[type="radio"],
span {
    margin-top: 1em;
}

input[type="radio"] {
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
    display: grid;
    place-content: center;
}

input[type="radio"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    background-color: CanvasText;
}

input[type="radio"]:checked::before {
    transform: scale(1);
}
</style>