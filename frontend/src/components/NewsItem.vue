<template>
  <div class="w-full h-full p-2 sm:w-1/2 md:w-1/4" @click="goNews">
    <div
      class="w-full h-full p-2 cursor-pointer bg-background-card hover:shadow-md shadow-background-card rounded-3xl"
    >
      <div class="space-y-2 text-left">
        <img
          :src="props.item.img"
          class="object-cover object-center w-auto rounded-xl min-h-60"
          alt=""
        />
        <p class="font-bold">{{ props.item.title }}</p>
        <p>{{ props.item.date }}</p>
        <p class="h-20">
          {{ shortText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cutText } from "@utils/utils";

type Item = {
  title: string;
  img: string;
  description: string;
  id: number;
  date: string;
};

interface ReviewProps {
  item: Item;
}

const goNews = () => {
  emit("go-news", props.item.id);
};

const emit = defineEmits<{ (event: "go-news", id: number): void }>();

const props = defineProps<ReviewProps>();

const shortText = cutText(props.item.description, 150);
</script>

<style scoped></style>
