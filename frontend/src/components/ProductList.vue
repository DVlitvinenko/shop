<template>
  <div class="flex flex-wrap items-center justify-center p-4">
    <Card
      @add-to-cart="addToCart"
      @go-product="goProduct"
      v-for="product in productStore.products"
      :product="product"
      :key="`product_${product.id}`"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Card from "./Card.vue";
import { useProductStore } from "@store/useProductStore";
import { Product } from "@typesDir/types";

const productStore = useProductStore();

const router = useRouter();

const goProduct = (id: number) => {
  router.push({ path: `/product/${id}` });
};

const addToCart = (product: Product) => {
  productStore.addToCart(product);
};
</script>

<style scoped></style>
