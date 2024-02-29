import { createStore } from "vuex";

import productsModule from "./products/index.js";
import cartModule from "./cart/index.js";
import authModule from "./auth/index.js";

const store = createStore({
  modules: {
    prods: productsModule,
    cart: cartModule,
    auth: authModule,
  },
});

export default store;
