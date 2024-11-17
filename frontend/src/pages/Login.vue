<template>
  <FormWrap>
    <Input v-model="name" />
    <Input v-model="pass" type="password" />
    <Button :disabled="isDisabled" :is-loading="isLoading" @click="login"
      >Войти</Button
    >
    <router-link class="w-full" to="/register">
      <Button>Еще нет аккаунта</Button>
    </router-link>
  </FormWrap>
</template>

<script setup lang="ts">
import Button from "@components/UI/Button.vue";
import FormWrap from "@components/UI/FormWrap.vue";
import Input from "@components/UI/Input.vue";
import { ref, watch } from "vue";
import { useUserStore } from "../store/useUserStore";
import client from "@client/client";
import { useRouter } from "vue-router";

const name = ref("");
const pass = ref("");
const isDisabled = ref(true);
const isLoading = ref(false);

const router = useRouter();

const userStore = useUserStore();

const checkData = () => {
  if (name.value || pass.value) {
    return (isDisabled.value = false);
  }
  isDisabled.value = true;
};

watch([name, pass], () => checkData());

const login = async () => {
  if (name && pass) {
    isLoading.value = true;
    try {
      const data = await client.login(name.value, pass.value);
      userStore.setUser(data);
      router.push({ path: "/" });
    } catch (error) {
      console.log((error as Error).message);
    }

    isLoading.value = false;
  }
};
</script>

<style scoped></style>
