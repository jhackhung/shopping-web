export default {
  namespaced: true,
  state() {
    return {
      products: [],
      lastFetch: null,
    };
  },
  getters: {
    products(state) {
      return state.products;
    },
    hasProducts(state) {
      return state.products && state.products.length > 0;
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if(!lastFetch) {
          return true;
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    }
  },
  actions: {
    async loadProducts(context, payload) {
      if(!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }

      const response = await fetch('http://127.0.0.1:3000/api/v1/prods');
      const responseData = await response.json();

      if(!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      const products = [];

      for(const key of responseData.data.products) {
        const product = {
          id: key.id,
          name: key.name,
          img: key.img,
          description: key.description,
          price: key.price,
          rate: key.rate,
          categories: key.categories,
        };

        products.push(product);
      }

      context.commit('setProducts', products);
      context.commit('setFetchTimestamp');
    }
  }
};
