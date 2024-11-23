<script setup lang="ts">
import Footer from "@components/Footer.vue";
import Header from "@components/Header.vue";
import { useCheckAuth } from "@hooks/useCheckAuth";
import { useInfoStore } from "@store/useInfoStore";
import { useProductStore } from "@store/useProductStore";
import logo from "@assets/logo.svg";
import { onMounted, ref } from "vue";

const checkAuth = useCheckAuth();

const productStore = useProductStore();
const infoStore = useInfoStore();

const isLoading = ref(true);

onMounted(async () => {
  await checkAuth();
  await productStore.getPromoProducts();
  await productStore.getCart();
  await infoStore.getTopReviews();
  isLoading.value = false;
});
</script>

<template>
  <div class="min-h-screen mx-auto place-items-center bg-background text-text">
    <div
      v-if="isLoading"
      class="fixed top-0 left-0 z-50 w-screen h-screen bg-opacity-90 bg-background-secondary"
    >
      <img
        :src="logo"
        alt=""
        class="object-contain object-center w-full h-full p-20"
      />
    </div>
    <div class="pb-16 sm:pb-32">
      <Header />
    </div>

    <router-view />
  </div>
  <Footer v-if="$route.path !== '/products'" />
</template>

<style scoped></style>
