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

  const news = ref([
    {
      id: 0,
      title: "Новая коллекция уже в продаже!",
      date: "12 ноября 2024",
      description:
        "Не упустите шанс обновить свой гардероб! Заходите и выбирайте!",
      img: "https://r.mobirisesite.com/892184/assets/images/photo-1503342217505-b0a15ec3261c.jpeg",
      link: "#", // Replace with the actual link if necessary
    },
    {
      id: 1,
      title: "Супер распродажа на выходные!",
      date: "10 ноября 2024",
      description: "Скидки до 70%! Не пропустите!",
      img: "https://r.mobirisesite.com/892184/assets/images/photo-1538329972958-465d6d2144ed.jpeg",
      link: "#", // Replace with the actual link if necessary
    },
    {
      id: 2,
      title: "Бесплатная доставка на все заказы!",
      date: "8 ноября 2024",
      description: "Заказывайте без лишних затрат! Мы заботимся о вас!",
      img: "https://r.mobirisesite.com/892184/assets/images/photo-1465408953385-7c4627c29435.jpeg",
      link: "#", // Replace with the actual link if necessary
    },
    {
      id: 3,
      title: "Секреты стиля от наших дизайнеров!",
      date: "5 ноября 2024",
      description: "Узнайте, как создать идеальный образ! Читайте наш блог!",
      img: "https://r.mobirisesite.com/892184/assets/images/photo-1558769132-cb1aea458c5e.jpeg",
      link: "#", // Replace with the actual link if necessary
    },
  ]);

  return { reviews, news };
});
