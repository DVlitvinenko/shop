<template>
  <div class="flex flex-col items-center w-48 gap-2">
    <Input v-model="name" />
    <Input v-model="pass" type="password" />
    <Button :disabled="isDisabled" @click="login">Войти</Button>
    <router-link class="w-full" to="/register"
      ><Button variant="secondary">Еще нет аккаунта</Button></router-link
    >
  </div>
</template>

<script setup lang="ts">
import Button from "@components/UI/Button.vue";
import Input from "@components/UI/Input.vue";
import { ref, watch } from "vue";

const name = ref("");
const pass = ref("");
const isDisabled = ref(true);

const checkData = () => {
  if (name.value || pass.value) {
    return (isDisabled.value = false);
  }
  isDisabled.value = true;
};

watch([name, pass], () => checkData());

const login = () => {
  if (name && pass) {
    console.log("login");
  }
};
</script>

<style scoped></style>
