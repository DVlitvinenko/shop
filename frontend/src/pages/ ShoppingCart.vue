<template>
  <div
    class="flex max-w-[1360px] flex-col w-full gap-2 p-2 sm:px-10 sm:py-2 sm:flex-row"
  >
    <div class="w-full p-2 bg-background-card rounded-2xl">
      <div v-if="cart.length" class="p-2" v-for="item in cart" :key="item.id">
        <div class="">{{ item.title }}</div>
        <div class="">{{ item.description }}</div>
        <div class="">{{ item.count }}</div>
        <div class="">{{ item.price }}</div>
      </div>
      <div class="" v-else>Корзина пуста</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@store/useProductStore";

const productStore = useProductStore();
const cart = productStore.cart;
</script>

<style scoped></style>
