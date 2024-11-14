<template>
  <div class="flex flex-wrap items-stretch justify-between px-2 pb-2 sm:pb-10">
    <NewsItem
      v-for="item in newsItems"
      @go-news="goNews"
      :item="item"
      :key="item.title"
    />
  </div>
</template>

<script setup lang="ts">
import { useInfoStore } from "@store/useInfoStore";
import NewsItem from "./NewsItem.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const infoStore = useInfoStore();

const newsItems = infoStore.news;

const goNews = (id: number) => {
  router.push({ path: `/news/${id}` });
};
</script>

<style scoped></style>
