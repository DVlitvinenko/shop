<template>
  <Button
    @click="filtersShow"
    class="fixed z-10 mb-2 shadow-md max-w-fit sm:top-24 top-16 sm:right-8 right-2"
  >
    {{ productStore.allCountProducts }}
    <font-awesome-icon :icon="['fas', 'filter']" />
  </Button>
  <div class="flex w-full space-x-2">
    <div class="w-full">
      <ProductList :products="products" />
      <div class="-mt-[550px]" v-intersection="getMoreProducts"></div>
    </div>
  </div>
  <Dialog @close="filtersShow" :is-showed="isShowed">
    <Filters
      @filters-changed="applyFilters"
      @close="filtersShow"
      :filters="productStore.filters"
    />
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

const isShowed = ref(false);

const productStore = useProductStore();

const products = computed(() => productStore.products ?? []);

const filtersShow = () => {
  isShowed.value = !isShowed.value;
};

onMounted(async () => {
  if (!productStore.products) {
    const data = await getProducts(productStore.filters);

    productStore.setProducts(data.products);
    productStore.setAllProductsCount(data.total_count);
  }
});

const getMoreProducts = async () => {
  if (productStore.products) {
    productStore.updateFilters({
      offset: productStore.filters.offset ? productStore.filters.offset + 1 : 1,
    });

    const data = await getProducts(productStore.filters);

    productStore.addProducts(data.products);
    productStore.setAllProductsCount(data.total_count);
  }
};

const applyFilters = async (filters: FiltersType) => {
  productStore.updateFilters({ ...filters, offset: 1 });

  const data = await getProducts(filters);

  productStore.setProducts(data.products);
  productStore.setAllProductsCount(data.total_count);
};
</script>

<style scoped></style>
