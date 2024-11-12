<template>
  <div class="w-full p-4 sm:w-1/2 md:w-1/3">
    <div class="rounded-3xl bg-background-card">
      <img
        :src="props.product.img"
        alt="img"
        class="object-cover object-center w-full h-72 rounded-3xl"
      />
      <div class="flex flex-col items-start justify-between gap-2 p-4">
        <p class="font-semibold">{{ props.product.title }}</p>
        <p class="font-semibold text-right">{{ props.product.price }}</p>
        <p class="">{{ props.product.description }}</p>
        <Button class="mx-auto max-w-44" @click="addToCart">В корзину</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from "@typesDir/types";
import Button from "./UI/Button.vue";

interface CardProps {
  product: Product;
}

const props = defineProps<CardProps>();

const addToCart = () => {
  console.log(props.product.id);
};
</script>

<style scoped></style>
