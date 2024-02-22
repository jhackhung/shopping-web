export default {
  namespaced: true,
  state() {
    return {
      products: [
        {
          id: "p1",
          img: "https://via.placeholder.com/150",
          name: "商品一",
          rate: 4.5,
          price: 29.99,
          categories: ["clothing"],
        },
        {
          id: "p2",
          img: "https://via.placeholder.com/150",
          name: "商品2",
          rate: 3.5,
          price: 39.99,
          categories: ["electronics"],
        },
        {
          id: "p3",
          img: "https://via.placeholder.com/150",
          name: "商品3",
          rate: 5,
          price: 49.99,
          categories: ["clothing", "electronics"],
        },
      ],
    };
  },
  getters: {
    products(state) {
      return state.products;
    },
  },
};
