<template>
  <TransitionGroup
    name="product"
    tag="div"
    class="flex flex-wrap items-stretch w-full p-4"
  >
    <Card
      :in-cart="checkInCart(product)"
      @dell-about-cart="removeFromCart"
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

const addToCart = async (product: Product) => {
  await productStore.addToCart(product);
};

const removeFromCart = (id: number) => {
  productStore.removeFromCart(id);
};

const checkInCart = (product: Product) => {
  const cartItem = productStore.cart?.find((item) => item.id === product.id);
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
