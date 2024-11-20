<template>
  <div class="relative z-0 flex items-center justify-center w-8 h-8">
    <font-awesome-icon
      :icon="['far', 'star']"
      class="absolute top-0 left-0 w-full h-full text-[#ff8105] font-normal"
    />
    <font-awesome-icon
      :icon="['fas', 'star']"
      class="absolute top-0 left-0 w-full h-full star"
      :style="starStyle"
    />
    <span class="z-10 text-xs text-text">{{ rating }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps<{
  rating: number;
  max: number;
}>();

const value = computed(() => (100 / props.max) * props.rating);

const starStyle = computed(() => ({
  maskImage: `linear-gradient(to right, #ffcc00 ${value.value}%, transparent 0%)`,
  WebkitMaskImage: `linear-gradient(to right, #ffcc00 ${value.value}%, transparent 0%)`,
  color: "#ffcc00",
}));
</script>

<style scoped>
.star {
  font-size: 1rem;
  -webkit-mask-image: inherit;
  mask-image: inherit;
}
</style>
