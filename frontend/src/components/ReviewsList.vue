<template>
  <div class="flex flex-wrap items-center justify-between px-2 pb-2 sm:pb-10">
    <Review v-for="item in reviews" :item="item" @go-review="goReview" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Review from "./Review.vue";
import { useInfoStore } from "@store/useInfoStore";

const router = useRouter();

const infoStore = useInfoStore();

const reviews = infoStore.reviews;

const goReview = (id: number) => {
  router.push({ path: `/review/${id}` });
};
</script>

<style scoped></style>
