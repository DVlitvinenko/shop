<template>
  <div
    v-if="product"
    class="flex max-w-[1360px] flex-col w-full gap-2 p-2 sm:px-10 sm:py-10 sm:flex-row"
  >
    <img
      :src="product.img"
      alt="img"
      class="object-cover object-center w-full sm:w-1/3 h-72 rounded-3xl"
    />
    <div class="flex flex-col items-start gap-2 p-4">
      <p class="font-semibold">{{ product.title }}</p>
      <p class="font-semibold text-right">{{ product.price }}</p>
      <p class="">{{ product.description }}</p>
      <Button class="max-w-44" @click.stop="addToCart(product)"
        >В корзину</Button
      >
    </div>
  </div>
  <NotFound v-else />
</template>

<script setup lang="ts">
import Button from "@components//UI/Button.vue";
import { useProductStore } from "@store/useProductStore";
import { Product } from "@typesDir/types";
import NotFound from "./NotFound.vue";

interface CardProps {
  id: number;
}

const props = defineProps<CardProps>();

const productStore = useProductStore();

const findProduct = () => {
  const result = productStore.products?.find((item) => item.id === props.id);
  if (result) {
    return result;
  }
  return productStore.promoProducts?.find((item) => item.id === props.id);
};

const product = findProduct();

const addToCart = (product: Product) => {
  productStore.addToCart(product);
};
</script>

<style scoped></style>
