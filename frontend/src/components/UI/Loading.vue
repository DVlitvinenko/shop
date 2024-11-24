<template>
  <Transition name="loading">
    <div
      v-if="props.isLoading"
      class="fixed top-0 left-0 z-50 w-screen h-screen bg-opacity-90 bg-background-secondary"
    >
      <img
        :src="logo"
        alt=""
        class="object-contain object-center w-full h-full p-40"
      />
    </div>
  </Transition>
  <div
    v-if="props.isLoading"
    class="fixed top-0 left-0 z-[51] w-screen h-screen bg-opacity-90 bg-background-secondary"
  >
    <img
      :src="logo"
      alt=""
      class="object-contain object-center w-full h-full p-40 animate-pulse"
    />
  </div>
</template>

<script setup lang="ts">
import logo from "@assets/logo.svg";
import { Transition } from "vue";

const props = defineProps<{ isLoading: boolean }>();
</script>

<style scoped>
.list-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}
.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
.list-enter-active > img,
.loading-leave-active > img {
  transition: transform 1s ease;
}
.loading-enter-from > img,
.loading-leave-to > img {
  transform: scale(0) rotate(360deg) translateX(-50%) translateY(-50%);
}
</style>
