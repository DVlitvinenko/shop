<template>
  <div class="container p-6 mx-auto space-y-6" v-if="userStore.user">
    <div
      class="flex flex-wrap items-center justify-center w-full gap-4 p-6 bg-white shadow-md sm:justify-between rounded-3xl"
    >
      <p class="text-3xl text-gray-700">
        <span class="font-medium">{{ userStore.user.name }}</span>
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <div class="w-60">
          <Button @click="handleEdit" variant="primary">
            Сменить пароль
          </Button>
        </div>
        <div class="w-60">
          <Confirmation
            @confirm="handleDeleteUser"
            cancel="Нет"
            confirm="Да"
            title=" Все текущие заказы будут отменены!  Удалить профиль?"
          >
            <Button variant="primary"> Удалить профиль </Button>
          </Confirmation>
        </div>
      </div>
      <Dialog :is-showed="isEdit" @close="handleEdit">
        <div class="flex flex-col items-center justify-center w-full gap-2">
          <Input
            class="w-full"
            v-model="pass"
            type="password"
            placeholder="Введите пароль"
          />
          <Input
            class="w-full"
            v-model="newPass"
            type="password"
            placeholder="Введите новый пароль"
          />
          <Input
            class="w-full"
            v-model="rePass"
            type="password"
            placeholder="Повторите новый пароль"
          />
          <Confirmation
            @confirm="handleUpdatePass"
            cancel="Нет"
            confirm="Да"
            title="Изменить пароль?"
          >
            <Button class="w-56" :disabled="isDisabled">Изменить пароль</Button>
          </Confirmation>
        </div>
      </Dialog>
    </div>

    <div class="p-6 bg-white shadow-md rounded-3xl" v-if="activeOrders?.length">
      <h2 class="mb-4 text-2xl font-semibold">Активные заказы</h2>
      <div class="flex flex-col flex-wrap sm:flex-row">
        <OrderItem
          v-for="(order, i) in activeOrders"
          :order="order"
          @cancel-order="handleCancelOrder"
          @click="goProduct"
          :key="`active_order_${order.id}_${i}`"
        />
      </div>
    </div>
    <div
      class="p-6 bg-white shadow-md rounded-3xl"
      v-if="historyOrders?.length"
    >
      <h2 class="mb-4 text-2xl font-semibold">История заказов</h2>
      <div class="flex flex-col flex-wrap sm:flex-row">
        <OrderItem
          v-for="(order, i) in historyOrders"
          :order="order"
          :key="`order_${order.id}_${i}`"
          @click="goProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import client from "@client/client";
import OrderItem from "@components/OrderItem.vue";
import Button from "@components/UI/Button.vue";
import Confirmation from "@components/UI/Confirmation.vue";
import Dialog from "@components/UI/Dialog.vue";
import Input from "@components/UI/Input.vue";
import { OrderStatus } from "@constants/OrderStatus";
import { useProductStore } from "@store/useProductStore";
import { useUserStore } from "@store/useUserStore";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const productStore = useProductStore();

const router = useRouter();

const isEdit = ref(false);
const pass = ref("");
const rePass = ref("");
const newPass = ref("");
const isDisabled = ref(true);

const activeOrders = computed(() =>
  productStore.orders?.filter(
    (item) => !historyStatuses.includes(String(item.status))
  )
);

const historyOrders = computed(() =>
  productStore.orders?.filter((item) =>
    historyStatuses.includes(String(item.status))
  )
);

const historyStatuses: (keyof typeof OrderStatus)[] = [
  "Returned",
  "Refunded",
  "Canceled",
  "Deliver",
];

const handleEdit = () => {
  isEdit.value = !isEdit.value;
};

const handleCancelOrder = async (id: number) => {
  try {
    await client.cancelOrder(id);
    productStore.deleteOrder(id);
    const orders = (await client.getOrders()).orders;
    productStore.setOrders(orders);
  } catch (error) {}
};

const checkData = () => {
  if (rePass.value && pass.value && rePass.value === newPass.value) {
    return (isDisabled.value = false);
  }
  isDisabled.value = true;
};

watch([pass, rePass], () => checkData());

const goProduct = (id: number) => {
  router.push(`product/${id}`);
};

const handleUpdatePass = async () => {
  if (!isDisabled) {
    return;
  }

  await client.changeUserPassword(pass.value, newPass.value, rePass.value);
};

const handleDeleteUser = async () => {
  await client.deleteUser();
  userStore.unsetUser();
};
</script>

<style scoped></style>
