<script setup lang="ts">
import Header from "@components/Header.vue";
</script>

<template>
  <div class="min-h-screen mx-auto place-items-center bg-background text-text">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style>
.router-link-exact-active {
  background: rgb(220, 214, 208, 80);
}
</style>
