<template>
  <section
    key="promo"
    class="relative z-0 w-screen -mt-32 bg-slate-700 sm:min-h-96 min-h-48"
  >
    <Promo />
  </section>

  <section class="bg-background-secondary" key="top">
    <h2 class="pt-4 text-xl font-bold text-center sm:pb-4 sm:pt-8 sm:text-4xl">
      Топ товаров
    </h2>
    <ProductList :products="promoProducts" />
  </section>
  <section
    key="discount"
    class="flex items-center justify-between w-full px-2 py-4 sm:py-14 bg-primary sm:px-10"
  >
    <Discount />
  </section>

  <section class="w-full bg-background-secondary" key="faq">
    <h2 class="py-4 text-xl font-bold text-center sm:py-8 sm:text-4xl">
      Часто задаваемые вопросы
    </h2>
    <FAQ />
  </section>
  <section class="" key="review">
    <h2 class="py-4 text-xl font-bold text-center sm:py-8 sm:text-4xl">
      Отзывы
    </h2>
    <ReviewsList />
  </section>
  <section class="" key="news">
    <h2 class="py-4 text-xl font-bold text-center sm:py-8 sm:text-4xl">
      Новости
    </h2>
    <NewsList />
  </section>
  <section class="bg-background-secondary" key="about">
    <About />
  </section>
</template>

<script setup lang="ts">
import client from "@client/client";
import About from "@components/About.vue";
import Discount from "@components/Discount.vue";
import FAQ from "@components/FAQ.vue";
import NewsList from "@components/NewsList.vue";
import ProductList from "@components/ProductList.vue";
import Promo from "@components/Promo.vue";
import ReviewsList from "@components/ReviewsList.vue";
import { useProductStore } from "@store/useProductStore";
import { computed, onMounted } from "vue";

const productStore = useProductStore();

const promoProducts = computed(() => productStore.promoProducts ?? []);

const getPromoProducts = async () => {
  const data = await client.getProducts({
    count: { min: 1 },
    sort: "rating-desc",
    limit: 6,
  });
  productStore.setPromoProducts(data.products);
};

onMounted(() => {
  if (!productStore.promoProducts) {
    getPromoProducts();
  }
});
</script>

<style scoped></style>
