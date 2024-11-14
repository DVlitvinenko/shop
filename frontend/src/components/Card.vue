<template>
  <div class="flex w-full p-4 sm:w-1/2 md:w-1/3" @click="goProduct">
    <div
      class="flex flex-col flex-1 cursor-pointer rounded-3xl bg-background-card hover:shadow-md shadow-background-card"
    >
      <img
        :src="props.product.img"
        alt="img"
        class="object-cover object-center w-full h-72 rounded-3xl"
      />
      <div
        class="flex flex-col items-start justify-between flex-grow gap-2 p-4"
      >
        <p class="font-semibold">{{ props.product.title }}</p>
        <p class="font-semibold text-right">{{ props.product.price }}</p>
        <p class="">{{ props.product.description }}</p>
        <Button
          v-if="!inCart"
          variant="primary"
          class="mx-auto max-w-44"
          @click.stop="addToCart"
        >
          В корзину
        </Button>
        <Button
          v-else
          class="mx-auto max-w-44"
          variant="danger"
          @click.stop="dellAboutCart"
        >
          Из корзины
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from "@typesDir/types";
import Button from "./UI/Button.vue";

interface CardProps {
  product: Product;
  inCart?: boolean;
}

const props = defineProps<CardProps>();

const emit = defineEmits<{
  (event: "go-product", id: number): void;
  (event: "add-to-cart", product: Product): void;
  (event: "dell-about-cart", id: number): void;
}>();

const goProduct = () => {
  emit("go-product", props.product.id);
};

const addToCart = () => {
  emit("add-to-cart", props.product);
};

const dellAboutCart = () => {
  emit("dell-about-cart", props.product.id);
};
</script>

<style scoped></style>
