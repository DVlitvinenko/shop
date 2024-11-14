<template>
  <div class="w-full h-full p-2 sm:w-1/2 md:w-1/4">
    <div class="space-y-2 text-left">
      <!-- <img
        :src="props.item.img"
        class="object-cover object-center w-auto rounded-xl min-h-60"
        alt=""
      />
      <p class="font-bold">{{ props.item.title }}</p>
      <p>{{ props.item.date }}</p>
      <p class="h-20">
        {{ shortText }}
      </p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@components/UI/Button.vue";

type Item = {
  title: string;
  img: string;
  description: string;
  id: number;
  date: string;
};

interface ReviewProps {
  id: Item;
}

const props = defineProps<ReviewProps>();
</script>

<style scoped></style>
