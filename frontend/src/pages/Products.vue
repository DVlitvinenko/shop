<template>
  <Button
    @click="filtersShow"
    class="fixed w-32 mb-2 top-24 sm:right-10 right-2"
    >Фильтры</Button
  >
  <div class="flex space-x-2">
    <div class="">
      <ProductList :products="products" />
    </div>
  </div>
  <Dialog @close="filtersShow" :is-showed="isShowed">
    <Filters />
  </Dialog>
</template>

<script setup lang="ts">
import { getProducts } from "@client/productService";
import Filters from "@components/Filters.vue";
import ProductList from "@components/ProductList.vue";
import Button from "@components/UI/Button.vue";
import Dialog from "@components/UI/Dialog.vue";
import { useProductStore } from "@store/useProductStore";
import { FiltersType } from "@typesDir/types";
import { computed, onMounted, ref } from "vue";

const defaultFilters: FiltersType = {};

const isShowed = ref(false);
const filters = ref<FiltersType>(defaultFilters);

const productStore = useProductStore();

const products = computed(() => productStore.products ?? []);

const filtersShow = () => {
  isShowed.value = !isShowed.value;
};

onMounted(() => getProducts(filters.value));
</script>

<style scoped></style>
