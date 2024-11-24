<template>
  <div class="w-full p-2 sm:w-1/2">
    <div
      class="p-2 cursor-pointer bg-background-secondary rounded-3xl hover:shadow-md"
      @click="goProduct"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold">{{ props.order.title }}</h3>
        <div class="text-sm text-gray-500">
          <div>{{ formattedDate }}</div>
          <div>{{ formattedStatus }}</div>
        </div>
      </div>

      <div class="flex mt-5">
        <img
          v-if="props.order.image"
          :src="props.order.image"
          alt="Product image"
          class="object-cover object-center w-32 h-auto mr-5 rounded-3xl"
        />
        <div class="flex flex-col w-full space-y-3">
          <div
            v-for="(value, label) in productDetails"
            :key="label"
            class="flex justify-between"
          >
            <span class="font-medium">{{ label }}:</span>
            <span>{{ value }}</span>
          </div>
        </div>
      </div>
      <div class="flex w-full">
        <Confirmation
          cancel="Нет"
          class="mt-2 ml-auto w-fit"
          confirm="Да"
          @confirm="cancelOrder"
          :title="`Вы хотите отменить заказ: ${
            props.order.title
          } за ${cutNumber(Number(props.order.price), 2)}₽`"
        >
          <Button
            variant="danger"
            v-if="!nonCanceledStatuses.includes(String(props.order.status))"
            class="w-fit"
          >
            Отменить заказ
          </Button>
        </Confirmation>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderStatus } from "@constants/OrderStatus";
import { Order } from "@typesDir/types";
import { cutNumber, translateToRussian } from "@utils/utils";
import Button from "./UI/Button.vue";
import Confirmation from "./UI/Confirmation.vue";

interface OrderItemProps {
  order: Order;
}

const props = defineProps<OrderItemProps>();

const formattedDate = new Date(props.order.date).toLocaleDateString();
const formattedStatus = translateToRussian(
  String(props.order.status),
  OrderStatus
);

const productDetails = {
  Модель: props.order.model,
  Бренд: props.order.brand,
  Цена: `${cutNumber(Number(props.order.price), 2)}₽`,
  Цвет: props.order.color,
  Количество: props.order.count,
};

const emit = defineEmits<{
  (event: "cancel-order", id: number): void;
  (event: "click", id: number): void;
}>();

const nonCanceledStatuses: (keyof typeof OrderStatus)[] = [
  "Returned",
  "Refunded",
  "Canceled",
  "Deliver",
];

const cancelOrder = () => {
  emit("cancel-order", props.order.id);
};

const goProduct = () => {
  emit("click", props.order.id);
};
</script>

<style scoped></style>
