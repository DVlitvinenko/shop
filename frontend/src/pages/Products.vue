<template>
  <Button
    @click="filtersShow"
    class="fixed w-32 mb-2 top-24 sm:right-10 right-2"
    >Фильтры</Button
  >
  <div class="flex space-x-2">
    <div class="">
      <ProductList />
    </div>
  </div>
  <Dialog @close="filtersShow" :is-showed="isShowed">
    <Filters />
  </Dialog>
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
