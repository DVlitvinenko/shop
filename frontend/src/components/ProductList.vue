<template>
  <TransitionGroup
    name="product"
    tag="div"
    class="flex flex-wrap items-center justify-center p-4"
  >
    <Card
      :in-cart="checkInCart(product)"
      @dell-about-cart="dellAboutCart"
      @add-to-cart="addToCart"
      @go-product="goProduct"
      v-for="product in props.products"
      :product="product"
      :key="`product_${product.id}`"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Card from "./Card.vue";
import { useProductStore } from "@store/useProductStore";
import { Product } from "@typesDir/types";

const props = defineProps<{ products: Product[] }>();

const productStore = useProductStore();

const router = useRouter();

const goProduct = (id: number) => {
  router.push({ path: `/product/${id}` });
};

const addToCart = (product: Product) => {
  productStore.addToCart(product);
};

const dellAboutCart = (id: number) => {
  productStore.dellAboutCart(id);
};

const checkInCart = (product: Product) => {
  const cartItem = productStore.cart.find((item) => item.id === product.id);
  return !!cartItem;
};
</script>

<style scoped>
.product-enter-active,
.product-leave-active {
  transition: all 0.5s ease;
}
.product-enter-from,
.product-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
