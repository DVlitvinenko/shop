<template>
  <Button @click="filtersShow" class="mb-2 sm:hidden">Фильтры</Button>
  <div class="flex space-x-2">
    <div class="hidden w-1/3 p-2 rounded-md sm:block bg-background-card">
      <Filters />
    </div>
    <div class=""><ProductList /></div>
  </div>
  <Dialog @close="filtersShow" :is-showed="isShowed"><Filters /></Dialog>
</template>

<script setup lang="ts">
import Filters from "@components/Filters.vue";
import ProductList from "@components/ProductList.vue";
import Button from "@components/UI/Button.vue";
import Dialog from "@components/UI/Dialog.vue";
import { ref } from "vue";

const isShowed = ref(false);

const filtersShow = () => {
  isShowed.value = !isShowed.value;
};
</script>

<style scoped></style>
