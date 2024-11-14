<template>
  <div class="w-full h-full p-2" v-if="item">
    <div class="relative space-y-2 text-left">
      <img
        :src="item.img"
        class="object-cover object-center h-full rounded-xl min-h-60"
        alt=""
      />
      <div
        class="absolute bottom-0 left-0 flex flex-col w-full h-full space-y-4 text-3xl text-center justify-evenly bg-background-secondary bg-opacity-30"
      >
        <p class="font-bold">{{ item.title }}</p>
        <p>{{ item.date }}</p>
        <p class="h-20">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
  <NotFound v-else />
</template>

<script setup lang="ts">
import { useInfoStore } from "@store/useInfoStore";
import NotFound from "./NotFound.vue";

type Item = {
  title: string;
  img: string;
  description: string;
  id: number;
  date: string;
};

interface ReviewProps {
  id: number;
}

const props = defineProps<ReviewProps>();

const infoStore = useInfoStore();

const item: Item | undefined = infoStore.news.find(
  (item) => item.id === props.id
);
</script>

<style scoped></style>
