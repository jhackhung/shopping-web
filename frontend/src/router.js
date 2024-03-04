import { createRouter, createWebHistory } from "vue-router";

import ProductsList from "./pages/products/ProductsList.vue";
import ProductDetail from "./pages/products/ProductDetail.vue";
import Checkout from "./pages/cart/Checkout.vue";
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
    { path: "/cart", component: UserCart, meta: { requiresAuth: true } },
    { path: "/checkout", component: Checkout, meta: { requiresAuth: true } },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});


export default router;
