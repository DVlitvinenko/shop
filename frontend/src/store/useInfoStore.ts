import client from "@client/client";
import { Review } from "@typesDir/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useInfoStore = defineStore("info", () => {
  const reviews = ref<Review[]>();

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

  const getTopReviews = async () => {
    const data = await client.getReviews(4, "desc");
    setReviews(data.reviews);
  };

  const setReviews = (reviewsData: Review[]) => {
    reviews.value = [...reviewsData];
  };

  return { reviews, news, setReviews, getTopReviews };
});
