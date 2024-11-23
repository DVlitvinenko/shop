<template>
  <div class="w-full p-2 sm:p-10" v-if="review">
    <ReviewItem :review="review" />
  </div>
  <NotFound v-else />
</template>

<script setup lang="ts">
import client from "@client/client";
import ReviewItem from "@components/ReviewItem.vue";
import { Review } from "@typesDir/types";
import { onMounted, ref } from "vue";

interface ReviewProps {
  id: number;
}

const props = defineProps<ReviewProps>();

const review = ref<Review>();

onMounted(async () => {
  const data = await client.getReview(props.id);
  review.value = data.reviews;
});
</script>

<style scoped></style>
