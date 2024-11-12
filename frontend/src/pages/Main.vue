<template>
  <div class="">
    <Promo />
    <div class="bg-background-secondary">
      <h2 class="py-4 text-xl font-bold text-center sm:py-8 sm:text-4xl">
        Топ товаров
      </h2>
      <LastProducts />
    </div>
    <Discount />
    <div class="bg-background-secondary">
      <h2 class="py-4 text-xl font-bold text-center sm:py-8 sm:text-4xl">
        Часто задаваемые вопросы
      </h2>
      <FAQ class="max-w-[1360px] px-2 sm:px-8" />
    </div>
    <div class="">
      <h2 class="py-4 text-xl font-bold text-center sm:py-8 sm:text-4xl">
        Отзывы
      </h2>
      <ReviewsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import Discount from "@components/Discount.vue";
import FAQ from "@components/FAQ.vue";
import LastProducts from "@components/ProductList.vue";
import Promo from "@components/Promo.vue";
import ReviewsList from "@components/ReviewsList.vue";
</script>

<style scoped></style>
