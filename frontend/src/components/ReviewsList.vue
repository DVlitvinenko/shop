<template>
  <div class="flex flex-wrap items-center justify-between px-2 pb-2 sm:pb-10">
    <Review
      v-for="item in reviews"
      :body="item.body"
      :img="item.img"
      :name="item.name"
    />
  </div>
</template>

<script setup lang="ts">
import Review from "./Review.vue";

const reviews = [
  {
    name: "Alice Johnson",
    img: "https://via.placeholder.com/150", // Placeholder image URL
    body: "I absolutely love this product! It has changed my life for the better.",
  },
  {
    name: "Bob Smith",
    img: "https://via.placeholder.com/150", // Placeholder image URL
    body: "Great quality and fantastic customer service. Highly recommend!",
  },
  {
    name: "Charlie Brown",
    img: "https://via.placeholder.com/150", // Placeholder image URL
    body: "Not what I expected. The product did not meet my needs.",
  },
  {
    name: "Diana Prince",
    img: "https://via.placeholder.com/150", // Placeholder image URL
    body: "Excellent experience! Will definitely purchase again.",
  },
  {
    name: "Edward Elric",
    img: "https://via.placeholder.com/150", // Placeholder image URL
    body: "The product is good, but it took too long to arrive.",
  },
  {
    name: "Fiona Gallagher",
    img: "https://via.placeholder.com/150", // Placeholder image URL
    body: "Amazing! I can't believe how well it works. Five stars!",
  },
];
</script>

<style scoped></style>
