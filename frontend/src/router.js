import { createRouter, createWebHistory } from 'vue-router';

import ProductsList from './pages/products/ProductsList.vue';
import ProductDetail from './pages/products/ProductDetail.vue';
import UserCart from './pages/cart/UserCart.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/products'},
        { path: '/products', component: ProductsList },
        { path: '/products/:id', component: ProductDetail, props: true },
        { path: '/cart', component: UserCart },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

export default router;