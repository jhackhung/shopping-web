import { createRouter, createWebHistory } from "vue-router";

import ProductsList from "./pages/products/ProductsList.vue";
import ProductDetail from "./pages/products/ProductDetail.vue";
import UserCart from "./pages/cart/UserCart.vue";
import Login from "./pages/auth/Login.vue";
import Signup from "./pages/auth/Signup.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/products" },
    { path: "/products", component: ProductsList },
    { path: "/products/:id", component: ProductDetail, props: true },
    { path: "/cart", component: UserCart },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
