import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/checkout";

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0,
    };
  },
  getters: {
    products(state) {
      return state.items;
    },
    totalSum(state) {
      return state.total.toFixed(2);
    },
    quantity(state) {
      return state.qty;
    },
  },
  mutations: {
    addProdToCart(state, payload) {
      const productData = payload;
      const productInCartIndex = state.items.findIndex(
        (ci) => ci.id === productData.id
      );

      if (productInCartIndex >= 0) {
        state.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          id: productData.id,
          name: productData.name,
          img: productData.img,
          price: productData.price,
          rate: productData.rate,
          categories: productData.categories,
          qty: 1,
        };
        state.items.push(newItem);
      }
      state.qty++;
      state.total += productData.price;
    },
    removeFromCart(state, payload) {
      const prodId = payload.id;
      const productInCardIndex = state.items.findIndex(
        (ci) => ci.id === prodId
      );
      const prodData = state.items[productInCardIndex];
      state.items.splice(productInCardIndex, 1);
      state.qty -= prodData.qty;
      state.total -= prodData.price * prodData.qty;
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.qty = 0;
    },
  },
  actions: {
    addProdToCart(context, payload) {
      const prodId = payload.id;
      const products = context.rootGetters["prods/products"];
      const product = products.find((prod) => prod.id === prodId);
      context.commit("addProdToCart", product);
    },
    removeFromCart(context, payload) {
      context.commit("removeFromCart", payload);
    },
    clearCart(context) {
      context.commit("clearCart");
    },
    async checkout(context, payload) {
      const checkout = {
        user: payload.user,
        products: payload.products,
        total: payload.total,
        shipping_address: payload.shipping_address,
        payment_method: payload.payment_method,
      };

      try {
        await axios.post(API_URL, checkout);
        context.commit("clearCart");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error("Failed to checkout. Please try again later.");
        }
      }
    },
  },
};
