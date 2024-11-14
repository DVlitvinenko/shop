import { useCheckUser } from "@hooks/useCheckUser";
import { Product } from "@typesDir/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("products", () => {
  const checkUser = useCheckUser();

  const products = ref<Product[]>([
    {
      count: 25,
      description: "High-quality wireless headphones with noise cancellation.",
      id: 1,
      img: "img/photo-1.jpeg",
      price: 199.99,
      title: "Wireless Headphones",
    },
    {
      count: 15,
      description: "A durable and stylish backpack for everyday use.",
      id: 2,
      img: "img/photo-1.jpeg",
      price: 49.99,
      title: "Stylish Backpack",
    },
    {
      count: 30,
      description: "Smartwatch with fitness tracking and notifications.",
      id: 3,
      img: "img/photo-1.jpeg",
      price: 129.99,
      title: "Smartwatch",
    },
    {
      count: 10,
      description: "Portable Bluetooth speaker with excellent sound quality.",
      id: 4,
      img: "img/photo-1.jpeg",
      price: 89.99,
      title: "Bluetooth Speaker",
    },
    {
      count: 50,
      description: "Ergonomic office chair for maximum comfort.",
      id: 5,
      img: "img/photo-1.jpeg",
      price: 299.99,
      title: "Ergonomic Office Chair",
    },
    {
      count: 20,
      description: "High-speed USB-C charging cable.",
      id: 6,
      img: "img/photo-1.jpeg",
      price: 19.99,
      title: "USB-C Charging Cable",
    },
  ]);

  const cart = ref<Product[]>([]);

  const addToCart = (product: Product) => {
    checkUser(
      () =>
        (cart.value = [
          ...cart.value.filter((item) => item.id !== product.id),
          { ...product, count: 1 },
        ])
    );
  };

  const dellAboutCart = (id: number) => {
    cart.value = [...cart.value.filter((item) => item.id !== id)];
  };

  return { products, cart, addToCart, dellAboutCart };
});
