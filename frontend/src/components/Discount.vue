<template>
  <p class="text-xl font-bold sm:text-3xl">Скидки до 50% на новую коллекцию!</p>
  <Button @click="goProducts" variant="primary" class="max-w-52"
    >Покупай сейчас!</Button
  >
</template>

<script setup lang="ts">
import Button from "./UI/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goProducts = () => {
  router.push("/products");
};
</script>

<style scoped></style>
