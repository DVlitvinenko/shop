<template>
  <div
    :class="`p-4 bg-white border border-gray-200  rounded-3xl transition-shadow ${
      clicked && 'cursor-pointer hover:shadow-md'
    }`"
  >
    <div class="flex items-center justify-between mb-1">
      <h3 class="text-lg font-semibold text-gray-800">
        {{ props.review.title }}
      </h3>
      <Star v-if="rating" :max="5" :rating="rating" />
    </div>
    <div class="flex items-center">
      <div class="text-sm font-medium text-gray-600">
        {{ props.review.user.name }}
      </div>
      <span class="mx-2 text-gray-400">•</span>
      <div class="text-sm text-gray-500">
        {{ new Date(props.review.created_at).toLocaleDateString() }}
      </div>
    </div>

    <p class="mb-4 text-gray-700">
      {{ body }}
    </p>
  </div>
</template>

<script setup lang="ts">
import Star from "@components/UI/Star.vue";
import { Review } from "@typesDir/types";
import { calculateRating, cutText } from "@utils/utils";
import { onMounted, ref } from "vue";

interface ReviewProps {
  review: Review;
  slice?: number;
  clicked?: boolean;
}

const props = defineProps<ReviewProps>();
const rating = ref();
const body = ref(props.review.body);

onMounted(() => {
  rating.value = calculateRating(props.review.rating);
  if (props.slice) {
    body.value = cutText(props.review.body, props.slice);
  }
});
</script>

<style scoped></style>
