export default {
  namespaced: true,
  state() {
    return {
      products: [
        {
          "id": "1",
          "img": "https://images.unsplash.com/photo-1534961880437-ce5ae2033053?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          "name": "優質短袖白T",
          "rate": 0,
          "price": 500,
          "categories": ['T-shirt'],
        },
        {
          "id": "2",
          "img": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
          "name": "骷髏手短黑T",
          "rate": 0,
          "price": 790,
          "categories": ['T-shirt'],
        },
        {
          "id": "3",
          "img": "https://images.unsplash.com/photo-1529391409740-59f2cea08bc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1124&q=80",
          "name": "超時尚牛仔庫",
          "rate": 0,
          "price": 1200,
          "categories": ['Jeans', 'Pants'],
        },
        {
          "id": "4",
          "img": "https://images.unsplash.com/photo-1491998664548-0063bef7856c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
          "name": "質感褐色系大衣服",
          "rate": 0,
          "price": 2300,
          "categories": ['Coat', 'Jacket'],
        }
      ],
    };
  },
  getters: {
    products(state) {
      return state.products;
    },
  },
};
