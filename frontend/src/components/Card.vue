<template>
  <div class="w-full p-4 cursor-pointer sm:w-1/2 md:w-1/3" @click="goProduct">
    <div
      class="rounded-3xl bg-background-card hover:shadow-md shadow-background-card"
    >
      <img
        :src="props.product.img"
        alt="img"
        class="object-cover object-center w-full h-72 rounded-3xl"
      />
      <div class="flex flex-col items-start justify-between gap-2 p-4">
        <p class="font-semibold">{{ props.product.title }}</p>
        <p class="font-semibold text-right">{{ props.product.price }}</p>
        <p class="">{{ props.product.description }}</p>
        <Button class="mx-auto max-w-44" @click.stop="addToCart"
          >В корзину</Button
        >
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

const emit = defineEmits<{
  (event: "go-product", id: number): void;
  (event: "add-to-cart", product: Product): void;
}>();

const goProduct = () => {
  emit("go-product", props.product.id);
};

const addToCart = () => {
  emit("add-to-cart", props.product);
};
</script>

<style scoped></style>
