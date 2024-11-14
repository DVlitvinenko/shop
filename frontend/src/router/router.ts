import ShoppingCart from "@pages/ ShoppingCart.vue";
import Admin from "@pages/Admin.vue";
import Cabinet from "@pages/Cabinet.vue";
import Login from "@pages/Login.vue";
import Main from "@pages/Main.vue";
import NewsPage from "@pages/NewsPage.vue";
import NotFound from "@pages/NotFound.vue";
import Orders from "@pages/Orders.vue";
import Product from "@pages/Product.vue";
import Products from "@pages/Products.vue";
import Register from "@pages/Register.vue";
import ReviewPage from "@pages/ReviewPage.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: Main },
  { path: "/products", component: Products },
  {
    path: "/product/:id",
    component: Product,
    props: (route: any) => ({
      id: Number(route.params.id),
    }),
  },
  { path: "/cabinet", component: Cabinet },
  { path: "/cabinet/orders", component: Orders },
  { path: "/cart", component: ShoppingCart },
  { path: "/admin", component: Admin },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/review/:id",
    component: ReviewPage,
    props: (route: any) => ({
      id: Number(route.params.id),
    }),
  },
  {
    path: "/news/:id",
    component: NewsPage,
    props: (route: any) => ({
      id: Number(route.params.id),
    }),
  },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
