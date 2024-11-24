<template>
  <div class="container p-6 mx-auto" v-if="userStore.user">
    <div class="p-6 mb-6 bg-white shadow-md rounded-3xl">
      <p class="text-3xl text-gray-700">
        <span class="font-medium">{{ userStore.user.name }}</span>
      </p>
      <div class="mt-4 w-60">
        <Button @click="handleEdit" variant="primary"> Сменить пароль </Button>
      </div>
      <div class="mt-4 w-60">
        <Button @click="handleDelete" variant="primary">
          Удалить профиль
        </Button>
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
          <Button class="w-56" :disabled="isDisabled" @click="handleUpdatePass"
            >Изменить пароль</Button
          >
        </div>
      </Dialog>
    </div>

    <div class="p-6 bg-white shadow-md rounded-3xl">
      <h2 class="mb-4 text-2xl font-semibold">История покупок</h2>
      <ul>
        <!-- <li v-if="userStore.user.story.length === 0" class="text-gray-500">
          Нет истории покупок
        </li> -->
        <!-- <li
          v-for="item in userStore.user.story"
          :key="item.id"
          class="py-4 border-b border-gray-200"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
              <p class="text-gray-500">Дата: {{ formatDate(item.date) }}</p>
            </div>
            <div class="flex items-center">
              <img
                :src="item.img"
                alt="Product Image"
                class="object-cover w-16 h-16 rounded-3xl"
              />
              <p class="ml-4 text-lg font-bold">{{ item.price.toFixed(2) }}р</p>
            </div>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@components/UI/Button.vue";
import Dialog from "@components/UI/Dialog.vue";
import Input from "@components/UI/Input.vue";
import { useUserStore } from "@store/useUserStore";
import { ref, watch } from "vue";
const userStore = useUserStore();

const isEdit = ref(false);
const isDelete = ref(false);
const pass = ref("");
const rePass = ref("");
const newPass = ref("");
const isDisabled = ref(true);

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US").format(date);
};

const handleEdit = () => {
  isEdit.value = !isEdit.value;
};

const handleDelete = () => {
  isDelete.value = !isDelete.value;
};

const checkData = () => {
  if (rePass.value && pass.value && rePass.value === newPass.value) {
    return (isDisabled.value = false);
  }
  isDisabled.value = true;
};

watch([pass, rePass], () => checkData());

const editUser = () => {
  alert("Edit user profile functionality is not implemented yet.");
};

const handleUpdatePass = () => {};
</script>

<style scoped></style>
