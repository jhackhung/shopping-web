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
  },
};
