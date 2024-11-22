<script setup lang="ts">
import Footer from "@components/Footer.vue";
import Header from "@components/Header.vue";
import { useCheckAuth } from "@hooks/useCheckAuth";
import { onMounted } from "vue";

const checkAuth = useCheckAuth();

onMounted(async () => {
  await checkAuth();
});
</script>

<template>
  <div class="min-h-screen mx-auto place-items-center bg-background text-text">
    <div class="pb-16 sm:pb-32">
      <Header />
    </div>
    <router-view />
  </div>
  <Footer v-if="$route.path !== '/products'" />
</template>

<style>
.router-link-exact-active {
  background: rgb(220, 214, 208, 80);
}
</style>
