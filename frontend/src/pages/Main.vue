<template>
  <div class="">
    <Promo />
    <div class="bg-background-secondary">
      <h2
        class="pt-4 text-xl font-bold text-center sm:pb-4 sm:pt-8 sm:text-4xl"
      >
        Топ товаров
      </h2>
      <ProductList />
    </div>
    <Discount />
    <div class="bg-background-secondary">
      <h2 class="py-4 text-xl font-bold text-center sm:py-8 sm:text-4xl">
        Часто задаваемые вопросы
      </h2>
      <FAQ />
    </div>
    <div class="">
      <h2 class="py-4 text-xl font-bold text-center sm:py-8 sm:text-4xl">
        Отзывы
      </h2>
      <ReviewsList />
    </div>
    <div class="">
      <h2 class="py-4 text-xl font-bold text-center sm:py-8 sm:text-4xl">
        Новости
      </h2>
      <NewsList />
    </div>
    <div class="bg-background-secondary">
      <About />
    </div>
  </div>
</template>

<script setup lang="ts">
import About from "@components/About.vue";
import Discount from "@components/Discount.vue";
import FAQ from "@components/FAQ.vue";
import NewsList from "@components/NewsList.vue";
import ProductList from "@components/ProductList.vue";
import Promo from "@components/Promo.vue";
import ReviewsList from "@components/ReviewsList.vue";
</script>

<style scoped></style>
