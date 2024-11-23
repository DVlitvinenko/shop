<template>
  <div v-if="product" class="max-w-[1360px] w-full gap-2 p-2 sm:px-10">
    <div class="flex w-full p-2">
      <div
        class="relative flex flex-col w-full gap-6 overflow-hidden transition-shadow duration-300 bg-white shadow-md sm:flex-row rounded-3xl"
      >
        <img
          :src="product.image ?? 'placeholder.jpg'"
          alt="Product Image"
          class="object-cover object-center w-full bg-gray-200 sm:w-1/2 max-h-96 min-h-64"
        />
        <div
          v-if="product.average_rating"
          class="absolute top-0 z-10 flex items-center justify-center gap-1 text-yellow-500 left-2"
        >
          <Star class="my-2" :max="5" :rating="rating ?? 0" />
        </div>
        <div class="flex flex-col justify-start w-full h-full gap-4 p-2">
          <div class="flex items-center justify-between">
            <h3 class="px-1 text-lg font-semibold text-gray-800 truncate">
              {{ product.title }}
            </h3>
            <span class="text-lg font-semibold text-gray-800">
              {{ product.price }} ₽
            </span>
          </div>

          <div class="flex flex-wrap items-center text-sm text-gray-700">
            <span
              v-for="(item, i) in productProperties"
              :key="`param_${product.id}_${i}`"
              class="px-1 rounded-sm text-bold"
            >
              <span v-if="item.value"> {{ item.value }}</span>
            </span>
          </div>
          <p class="px-1 mt-1 text-sm text-gray-500">
            {{ product.description || "Описание отсутствует" }}
          </p>
          <div class="pt-1 mt-auto ml-auto max-w-56">
            <Button
              v-if="!inCart"
              variant="primary"
              class="w-full"
              @click.stop="addToCart"
            >
              В корзину
            </Button>
            <Button
              v-else
              variant="danger"
              class="w-full"
              @click.stop="removeFromCart"
            >
              Удалить из корзины
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full p-2 sm:w-1/2" v-for="review in infoStore.reviews">
        <ReviewItem :review="review" />
      </div>
    </div>
  </div>
  <NotFound v-else />
</template>

<script setup lang="ts">
import Button from "@components//UI/Button.vue";
import { useProductStore } from "@store/useProductStore";
import { Product, Review } from "@typesDir/types";
import NotFound from "./NotFound.vue";
import { calculateRating, translateToRussian } from "@utils/utils";
import { ClothingColors } from "@constants/ClosingColor";
import { ClothingTypes } from "@constants/ClothingType";
import { ClothingClasses } from "@constants/ClothingClass";
import client from "@client/client";
import { computed, onMounted, ref } from "vue";
import Star from "@components/UI/Star.vue";
import { useInfoStore } from "@store/useInfoStore";
import ReviewItem from "../components/ReviewItem.vue";

interface CardProps {
  id: number;
}

const product = ref<Product>();
const reviews = ref<Review[]>();

const props = defineProps<CardProps>();

const productStore = useProductStore();
const infoStore = useInfoStore();

onMounted(async () => {
  const data = await client.getProduct(props.id);
  product.value = data.product;
  reviews.value = data.reviews;
});

const addToCart = async () => {
  product.value && (await productStore.addToCart(product.value));
};

const removeFromCart = () => {
  product.value && productStore.removeFromCart(product.value.id);
};

const inCart = computed(
  () => !!productStore.cart.find((item) => item.id === props.id)
);

const rating = computed(
  () =>
    product.value?.average_rating &&
    calculateRating(product.value.average_rating)
);

const productProperties = computed(() => {
  if (product.value) {
    return [
      {
        type: "class",
        value: product.value.class
          ? `${translateToRussian(
              product.value.class,
              ClothingClasses
            )} одежда,`
          : " одежда,",
        onClick: () => console.log("Класс кликнут"),
        text: "Класс",
      },
      {
        type: "type",
        value: product!.value.type
          ? translateToRussian(product.value.type, ClothingTypes)
          : "",
        onClick: () => console.log("Тип кликнут"),
        text: "Тип",
      },
      {
        type: "brand",
        value: product.value.brand ?? "",
        onClick: () => console.log("Бренд кликнут"),
        text: "Бренд",
      },
      {
        type: "model",
        value: product.value.model ?? "",
        onClick: () => console.log("Модель кликнута"),
        text: "Модель",
      },
      {
        type: "color",
        value: product.value.color
          ? `Цвет: ${translateToRussian(product!.value.color, ClothingColors)}`
          : "",
        onClick: () => console.log("Цвет кликнут"),
        text: "Цвет",
      },
    ];
  }
  return [];
});
</script>

<style scoped></style>
