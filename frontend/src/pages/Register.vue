<template>
  <FormWrap>
    <Input v-model="name" placeholder="Введите логин" />
    <Input v-model="pass" type="password" placeholder="Введите пароль" />
    <Input v-model="rePass" type="password" placeholder="Повторите пароль" />
    <Button :disabled="isDisabled" @click="register">Зарегистрироваться</Button>
    <router-link class="w-full" to="/login"
      ><Button>Уже есть аккаунт</Button></router-link
    >
    <p class="text-xs text-center">
      Нажимая "Зарегистрироваться" вы подтверждаете согласие с
      <router-link class="text-text-accent" to="/politic"
        >политикой конфиденциальности</router-link
      >
    </p>
  </FormWrap>
</template>

<script setup lang="ts">
import Button from "@components/UI/Button.vue";
import FormWrap from "@components/UI/FormWrap.vue";
import Input from "@components/UI/Input.vue";
import { ref, watch } from "vue";

const name = ref("");
const pass = ref("");
const rePass = ref("");
const isDisabled = ref(true);

const checkData = () => {
  if (name.value && pass.value && rePass.value === pass.value) {
    return (isDisabled.value = false);
  }
  isDisabled.value = true;
};

watch([name, pass, rePass], () => checkData());

const register = () => {
  console.log("register");
};
</script>

<style scoped></style>
