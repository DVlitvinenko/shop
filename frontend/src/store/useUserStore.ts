import { User } from "@typesDir/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>({
    id: 1,
    name: "John Doe",
    story: [
      {
        id: 1,
        title: "Product 1",
        img: "https://via.placeholder.com/150",
        price: 29.99,
        description: "Description for Product 1",
        count: 1,
        date: new Date("2023-01-15"),
      },
      {
        id: 2,
        title: "Product 2",
        img: "https://via.placeholder.com/150",
        price: 49.99,
        description: "Description for Product 2",
        count: 1,
        date: new Date("2023-02-20"),
      },
    ],
    cart: [],
  });

  return { user };
});
