<template>
  <div class="w-full p-2 sm:w-1/2 md:w-1/3">
    <div class="space-y-2 place-items-center">
      <p class="h-12 text-center">
        {{ shortText }}
      </p>
      <p>{{ props.name }}</p>
      <img :src="props.img" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface ReviewProps {
  name: string;
  img: string;
  body: string;
}

const props = defineProps<ReviewProps>();

const shortText = props.body.slice(0, 150) + "...";
</script>

<style scoped></style>
