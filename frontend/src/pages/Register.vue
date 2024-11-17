<template>
  <FormWrap>
    <Input v-model="name" placeholder="Введите логин" />
    <Input v-model="email" type="email" placeholder="Введите почту" />
    <Input v-model="pass" type="password" placeholder="Введите пароль" />
    <Input v-model="rePass" type="password" placeholder="Повторите пароль" />
    <Button :is-loading="isLoading" :disabled="isDisabled" @click="register"
      >Зарегистрироваться</Button
    >
    <router-link class="w-full" to="/login">
      <Button>Уже есть аккаунт</Button>
    </router-link>
    <p class="text-xs text-center">
      Нажимая "Зарегистрироваться" вы подтверждаете согласие с
      <router-link class="text-text-accent" to="/politic"
        >политикой конфиденциальности</router-link
      >
    </p>
  </FormWrap>
</template>

<script setup lang="ts">
import client from "@client/client";
import Button from "@components/UI/Button.vue";
import FormWrap from "@components/UI/FormWrap.vue";
import Input from "@components/UI/Input.vue";
import { useUserStore } from "@store/useUserStore";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const name = ref("");
const pass = ref("");
const rePass = ref("");
const isDisabled = ref(true);
const isLoading = ref(false);

const router = useRouter();

const userStore = useUserStore();

const checkData = () => {
  if (name.value && pass.value && rePass.value === pass.value) {
    return (isDisabled.value = false);
  }
  isDisabled.value = true;
};

watch([name, pass, rePass], () => checkData());

const register = async () => {
  if (name.value && pass.value && email.value && pass.value === rePass.value) {
    isLoading.value = true;
    try {
      const data = await client.register(name.value, email.value, pass.value);

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
