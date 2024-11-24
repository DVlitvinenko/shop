<template>
  <div
    class="flex sm:flex-row max-w-[1360px] flex-col w-full gap-4 p-4 sm:px-10 sm:py-6"
  >
    <div class="w-full p-2 shadow-md bg-background-card rounded-3xl">
      <div v-if="productStore.cart?.length">
        <div
          @click="goProduct(item.id)"
          v-for="item in productStore.cart"
          :key="item.id"
          class="flex items-center justify-between px-2 py-4 border-b cursor-pointer hover:shadow-md rounded-3xl"
        >
          <img
            :src="item.image || '/placeholder.jpg'"
            alt="Product Image"
            class="object-cover object-center w-20 h-auto bg-gray-200 rounded-md"
          />

          <div class="flex-1 ml-4">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ item.title }}
            </h3>
            <p class="text-sm text-gray-500">{{ item.description }}</p>
            <p class="text-sm text-gray-500">
              Цена: {{ cutNumber(Number(item.price), 2) }}₽
            </p>
            <p class="text-sm text-gray-500">
              Осталось на складе: {{ item.count }}
            </p>
          </div>
          <div class="flex flex-col flex-wrap justify-between gap-2">
            <div class="flex items-center gap-2">
              <Button @async-click.stop="decreaseQuantity(item)" class="">
                −
              </Button>
              <span class="text-xl font-medium">{{ item.quantity }}</span>
              <Button
                @async-click.stop="increaseQuantity(item)"
                class=""
                :disabled="item.quantity >= item.count"
              >
                +
              </Button>
            </div>

            <Button
              variant="danger"
              @async-click.stop="removeFromCart(item.id)"
              class=""
            >
              Удалить
            </Button>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">Корзина пуста</div>
    </div>

    <div
      v-if="productStore.cart?.length"
      class="flex flex-col items-end w-full gap-4 p-4 shadow-md h-fit sm:place-items-center sm:w-1/5 bg-background-card rounded-3xl"
    >
      <div class="text-lg font-bold">
        Итого: {{ cutNumber(Number(totalPrice), 2) }}₽
      </div>
      <Confirmation
        cancel="Нет"
        confirm="Да"
        :title="`Оформить заказ на ${cutNumber(Number(totalPrice), 2)}₽`"
        @confirm="placeOrder"
      >
        <Button class="text-nowrap"> Оформить заказ </Button>
      </Confirmation>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "@store/useProductStore";
import { useRouter } from "vue-router";
import { CartItem } from "@typesDir/types";
import Button from "@components/UI/Button.vue";
import client from "@client/client";
import { cutNumber } from "@utils/utils";
import Confirmation from "@components/UI/Confirmation.vue";

const productStore = useProductStore();

const router = useRouter();

const increaseQuantity = async (item: CartItem) => {
  if (item.quantity < item.count) {
    try {
      await client.incrementQuantityInCart(item.id);
      item.quantity += 1;
    } catch (error) {}
  }
};

const decreaseQuantity = async (item: CartItem) => {
  if (item.quantity > 1) {
    try {
      await client.incrementQuantityInCart(item.id);
      item.quantity -= 1;
    } catch (error) {}
  }
};

const removeFromCart = (id: number) => {
  productStore.removeFromCart(id);
};

const totalPrice = computed(() =>
  productStore.cart?.reduce(
    (total, item: CartItem) => total + Number(item.price) * item.quantity,
    0
  )
);

const placeOrder = async () => {
  await client.order(productStore.cart!.map((item) => item.id));
  const orders = (await client.getOrders()).orders;
  productStore.setOrders(orders);
  productStore.clearCart();
  goCabinet();
};

const goProduct = (id: number) => {
  router.push(`product/${id}`);
};

const goCabinet = () => {
  router.push(`cabinet/`);
};
</script>

<style scoped></style>
