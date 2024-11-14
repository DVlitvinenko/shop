<template>
  <div class="w-full p-2 sm:p-10" v-if="review">
    <h3 class="mb-2 font-bold">Отзыв {{ review.id }}</h3>
    <div class="flex flex-col items-center sm:flex-row">
      <div class="p-2 place-items-center sm:w-1/3">
        <p class="font-bold">{{ review.name }}</p>
        <img
          :src="review.img"
          class="object-cover object-center h-20 rounded-full"
          alt=""
        />
      </div>

      <div class="p-2 space-y-2 place-items-center sm:w-1/3">
        <p class="text-center">
          {{ review.body }}
        </p>
      </div>
    </div>
  </div>
  <NotFound v-else />
</template>

<script setup lang="ts">
import { useInfoStore } from "@store/useInfoStore";

type Item = { name: string; img: string; body: string };

interface ReviewProps {
  item: Item;
  id: number;
}

const props = defineProps<ReviewProps>();

const infoStore = useInfoStore();

const review = infoStore.reviews.find((item) => (item.id = props.id));
</script>

<style scoped></style>
