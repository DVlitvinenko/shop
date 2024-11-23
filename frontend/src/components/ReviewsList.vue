<template>
  <TransitionGroup
    name="review"
    tag="div"
    class="flex flex-wrap items-center justify-between px-2 pb-2"
  >
    <div
      v-if="infoStore.reviews"
      class="w-1/2 p-2"
      @click="goReview(item.id)"
      :key="`review_${i}`"
      v-for="(item, i) in infoStore.reviews"
    >
      <ReviewItem :review="item" :slice="150" clicked />
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useInfoStore } from "@store/useInfoStore";
import ReviewItem from "@components/ReviewItem.vue";

const router = useRouter();

const infoStore = useInfoStore();

const goReview = (id: number) => {
  router.push({ path: `/review/${id}` });
};
</script>

<style scoped>
.review-enter-active,
.review-leave-active {
  transition: all 0.5s ease;
}
.review-enter-from,
.review-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
