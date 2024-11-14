import { defineStore } from "pinia";
import { ref } from "vue";

export const useInfoStore = defineStore("info", () => {
  const reviews = ref([
    {
      id: 0,
      name: "Alice Johnson",
      img: "https://via.placeholder.com/150", // Placeholder image URL
      body: "I absolutely love this product! It has changed my life for the better.",
    },
    {
      id: 1,
      name: "Bob Smith",
      img: "https://via.placeholder.com/150", // Placeholder image URL
      body: "Great quality and fantastic customer service. Highly recommend!",
    },
    {
      id: 2,
      name: "Charlie Brown",
      img: "https://via.placeholder.com/150", // Placeholder image URL
      body: "Not what I expected. The product did not meet my needs.",
    },
    {
      id: 3,
      name: "Diana Prince",
      img: "https://via.placeholder.com/150", // Placeholder image URL
      body: "Excellent experience! Will definitely purchase again.",
    },
    {
      id: 4,
      name: "Edward Elric",
      img: "https://via.placeholder.com/150", // Placeholder image URL
      body: "The product is good, but it took too long to arrive.",
    },
    {
      id: 5,
      name: "Fiona Gallagher",
      img: "https://via.placeholder.com/150", // Placeholder image URL
      body: "Amazing! I can't believe how well it works. Five stars!",
    },
  ]);

  return { reviews };
});
