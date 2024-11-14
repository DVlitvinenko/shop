<template>
  <div class="pb-2 space-y-2 sm:pb-10 max-w-[1360px] px-2 sm:px-8">
    <TextOpen
      v-for="item in faqItems"
      :is-opened="openedQuestion === item.id"
      :text="item.answer"
      :title="item.question"
      :key="`question_${item.id}`"
      @open="handleOpen(item.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TextOpen from "./UI/TextOpen.vue";

const openedQuestion = ref<number | null>(null);

const handleOpen = (id: number) => {
  if (openedQuestion.value === id) {
    return (openedQuestion.value = null);
  }
  openedQuestion.value = id;
};

const faqItems = [
  {
    id: 0,
    question: "Как сделать заказ?",
    answer: "Просто выбери товар и нажми 'Купить'!",
  },
  {
    id: 1,
    question: "Как вернуть товар?",
    answer: "Свяжись с нашей службой поддержки!",
  },
  {
    id: 2,
    question: "Есть ли доставка по всей стране?",
    answer: "Конечно! Мы доставляем везде!",
  },
  {
    id: 3,
    question: "Как узнать размер?",
    answer: "Смотри нашу таблицу размеров на сайте!",
  },
  {
    id: 4,
    question: "Можно ли отменить заказ?",
    answer: "Да, если он еще не отправлен!",
  },
];
</script>

<style scoped></style>
