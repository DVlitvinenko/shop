<script setup lang="ts">
import Footer from "@components/FooterItem.vue";
import Header from "@components/Header.vue";
import Loading from "@components/UI/Loading.vue";
import { useCheckAuth } from "@hooks/useCheckAuth";
import { useProductStore } from "@store/useProductStore";
import { onMounted, ref } from "vue";

const checkAuth = useCheckAuth();

const productStore = useProductStore();

const isLoading = ref(true);

onMounted(async () => {
  await checkAuth();
  await productStore.getInitialData();
  isLoading.value = false;
});
</script>

<template>
  <Loading :is-loading="isLoading" />
  <div class="min-h-screen mx-auto place-items-center bg-background text-text">
    <div class="pb-16 sm:pb-32">
      <Header />
    </div>

    <router-view />
  </div>
  <Footer v-if="$route.path !== '/products'" />
</template>

<style scoped></style>
