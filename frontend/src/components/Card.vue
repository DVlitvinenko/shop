<template>
  <div class="flex w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4" @click="goProduct">
    <div
      class="relative flex flex-col w-full overflow-hidden transition-shadow duration-300 bg-white shadow-md cursor-pointer rounded-3xl hover:shadow-lg"
    >
      <img
        :src="props.product.image ?? 'placeholder.jpg'"
        alt="Product Image"
        class="object-cover object-center w-full bg-gray-200 min-h-64"
      />
      <div
        v-if="props.product.average_rating && rating"
        class="absolute top-0 flex items-center gap-1 text-yellow-500 right-1"
      >
        <Star class="my-2" :max="5" :rating="rating" />
      </div>
      <div class="flex flex-col justify-between h-full p-2">
        <div class="flex items-center justify-between">
          <h3 class="px-1 text-lg font-semibold text-gray-800 truncate">
            {{ props.product.title }}
          </h3>
          <span class="text-lg font-semibold text-gray-800">
            {{ props.product.price }} ₽
          </span>
        </div>

        <div class="flex flex-wrap items-center text-sm text-gray-700">
          <span
            v-for="(item, i) in productProperties"
            :key="`param_${props.product.id}_${i}`"
            class="px-1 rounded-sm text-bold"
          >
            <span v-if="item.value"> {{ item.value }}</span>
          </span>
        </div>
        <p class="px-1 mt-1 text-sm text-gray-500">
          {{ description || "Описание отсутствует" }}
        </p>
        <div class="mt-1">
          <Button
            v-if="!inCart"
            variant="primary"
            class="w-full"
            @async-click.stop="addToCart"
          >
            В корзину
          </Button>
          <Button
            v-else
            variant="danger"
            class="w-full"
            @async-click.stop="removeFromCart"
          >
            Удалить из корзины
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from "@typesDir/types";
import Button from "./UI/Button.vue";
import { cutNumber, translateToRussian } from "@utils/utils";
import { ClothingClasses } from "@constants/ClothingClass";
import { ClothingTypes } from "@constants/ClothingType";
import { ClothingColors } from "@constants/ClosingColor";
import Star from "./UI/Star.vue";

interface CardProps {
  product: Product;
  inCart?: boolean;
}

const props = defineProps<CardProps>();

const rating = cutNumber(props.product.average_rating, 1);

const description =
  props.product.description.length > 150
    ? `${props.product.description.slice(0, 150)}...`
    : props.product.description;

const emit = defineEmits<{
  (event: "go-product", id: number): void;
  (event: "add-to-cart", product: Product): void;
  (event: "dell-about-cart", id: number): void;
}>();

const goProduct = () => {
  emit("go-product", props.product.id);
};

const addToCart = () => {
  emit("add-to-cart", props.product);
};

const removeFromCart = () => {
  emit("dell-about-cart", props.product.id);
};

const productProperties = [
  {
    type: "class",
    value: props.product.class
      ? `${translateToRussian(
          String(props.product.class),
          ClothingClasses
        )} одежда,`
      : " одежда,",
    onClick: () => console.log("Класс кликнут"),
    text: "Класс",
  },
  {
    type: "type",
    value: props.product.type
      ? translateToRussian(String(props.product.type), ClothingTypes)
      : "",
    onClick: () => console.log("Тип кликнут"),
    text: "Тип",
  },
  {
    type: "brand",
    value: props.product.brand ?? "",
    onClick: () => console.log("Бренд кликнут"),
    text: "Бренд",
  },
  {
    type: "model",
    value: props.product.model ?? "",
    onClick: () => console.log("Модель кликнута"),
    text: "Модель",
  },
  {
    type: "color",
    value: props.product.color
      ? `Цвет: ${translateToRussian(
          String(props.product.color),
          ClothingColors
        )}`
      : "",
    onClick: () => console.log("Цвет кликнут"),
    text: "Цвет",
  },
];
</script>
