import { createStore } from "vuex";

import productsModule from "./products/index.js";
import cartModule from "./cart/index.js";

const store = createStore({
  modules: {
    prods: productsModule,
    cart: cartModule,
  },
});

export default store;
