<template>
  <div class="w-full p-2 sm:w-1/2 md:w-1/3">
    <div
      class="w-full p-2 cursor-pointer bg-background-card rounded-3xl"
      @click="emit('go-review', props.item.id)"
    >
      <div class="space-y-2 place-items-center">
        <p class="h-12 text-center">
          {{ shortText }}
        </p>
        <p>{{ props.item.name }}</p>
        <img
          :src="props.item.img"
          class="object-cover object-center h-20 rounded-full"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cutText } from "@utils/utils";

type Item = { name: string; img: string; body: string; id: number };

interface ReviewProps {
  item: Item;
}

const props = defineProps<ReviewProps>();

const emit = defineEmits<{ (event: "go-review", id: number): void }>();

const shortText = cutText(props.item.body, 150);
</script>

<style scoped></style>
