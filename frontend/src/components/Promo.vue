<template>
  <div class="relative z-0 w-screen bg-slate-700 sm:min-h-96 min-h-48">
    <video
      loop
      :src="video"
      class="object-cover object-center"
      autoplay
      muted
    ></video>
    <div
      class="absolute bottom-0 left-0 flex flex-col items-center justify-center w-full px-4 text-center sm:pb-8"
    >
      <h1 class="my-5 text-2xl text-text-accent sm:text-7xl">Модный Магазин</h1>
      <p class="my-2 text-sm sm:text-xl text-text-light">
        Одевайся стильно, будь уникальным, выделяйся из толпы!
      </p>
      <Button variant="secondary" @click="goShoping" class="my-2 max-w-44"
        >Начать Шопинг</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "./UI/Button.vue";
import video from "@assets/video/1112.mp4";

const router = useRouter();

const goShoping = () => {
  router.push("/products");
};
</script>

<style scoped></style>
