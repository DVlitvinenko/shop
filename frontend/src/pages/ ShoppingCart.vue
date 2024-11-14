<template>
  <div
    class="flex max-w-[1360px] flex-col w-full gap-2 p-2 sm:px-10 sm:py-10 sm:flex-row"
  >
    <div
      class="p-2 bg-background-card rounded-2xl"
      v-for="item in productStore.cart"
      :key="item.id"
    >
      <div class="">{{ item.title }}</div>
      <div class="">{{ item.description }}</div>
      <div class="">{{ item.count }}</div>
      <div class="">{{ item.price }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@store/useProductStore";

const productStore = useProductStore();
</script>

<style scoped></style>
