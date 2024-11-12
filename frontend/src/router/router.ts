import ShoppingCart from "@pages/ ShoppingCart.vue";
import Admin from "@pages/Admin.vue";
import Cabinet from "@pages/Cabinet.vue";
import Login from "@pages/Login.vue";
import Main from "@pages/Main.vue";
import Orders from "@pages/Orders.vue";
import Product from "@pages/Product.vue";
import Products from "@pages/Products.vue";
import Register from "@pages/Register.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: Main },
  { path: "/products", component: Products },
  {
    path: "/product:id",
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
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
