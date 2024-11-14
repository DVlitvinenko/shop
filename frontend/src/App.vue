<script setup lang="ts">
import Footer from "@components/Footer.vue";
import Header from "@components/Header.vue";
import { useUserStore } from "@store/useUserStore";

const userStore = useUserStore();
</script>

<template>
  <div class="min-h-screen mx-auto place-items-center bg-background text-text">
    <div class="pb-32"><Header :isLogin="!!userStore.user" /></div>
    <router-view />
  </div>
  <Footer />
</template>

<style>
.router-link-exact-active {
  background: rgb(220, 214, 208, 80);
}
</style>
