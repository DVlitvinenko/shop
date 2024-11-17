<template>
  <nav
    class="fixed top-0 left-0 z-10 flex items-center justify-between w-screen p-1 px-2 space-x-4 text-base font-semibold sm:py-2 sm:text-xl sm:px-10 text-text"
  >
    <div
      class="bg-background-header bg-opacity-80 mx-auto flex items-center p-2 justify-between rounded-button w-full max-w-[1360px] shadow-background-header shadow-md"
    >
      <img
        :src="logo"
        alt=""
        class="h-8 cursor-pointer sm:h-14"
        @click="goMain"
      />
      <div class="flex items-center justify-between gap-2">
        <div
          @click="toggleMenu"
          class="fixed z-10 p-2 rounded-md top-2 right-5 sm:hidden focus:outline-none"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
        <div class="items-center justify-between hidden gap-2 sm:flex">
          <router-link class="p-2 rounded-md" to="/">Главная</router-link>
          <router-link class="p-2 rounded-md" to="/products"
            >Каталог
          </router-link>
          <router-link class="p-2 rounded-md" v-if="isLogin" to="/cart"
            >Корзина{{
              productStore.cart.length ? ` (${productStore.cart.length})` : ""
            }}
          </router-link>
          <router-link class="p-2 rounded-md" v-if="isLogin" to="/cabinet"
            >Кабинет
          </router-link>
          <router-link class="p-2 rounded-md" v-if="isAdmin" to="/admin"
            >Админ
          </router-link>
        </div>
      </div>
      <div class="hidden sm:block" v-if="!isLogin">
        <Button variant="primary" @click="login">Вход</Button>
      </div>
      <div class="hidden sm:block" v-if="isLogin" @click="logout">
        <Button variant="primary">Выход</Button>
      </div>
    </div>
    <Transition class="" name="slide-fade">
      <div
        v-show="isMenuOpen"
        class="fixed top-0 flex flex-col items-center w-full gap-2 py-5 shadow-md ring-0 sm:hidden bg-background-header bg-opacity-90 rounded-bl-button"
      >
        <router-link class="p-2 rounded-md" to="/" @click="toggleMenu"
          >Главная</router-link
        >
        <router-link class="p-2 rounded-md" to="/products" @click="toggleMenu"
          >Каталог</router-link
        >
        <router-link
          class="p-2 rounded-md"
          v-if="isLogin"
          to="/catalog"
          @click="toggleMenu"
          >Корзина</router-link
        >
        <router-link
          class="p-2 rounded-md"
          v-if="isLogin"
          to="/cabinet"
          @click="toggleMenu"
          >Кабинет</router-link
        >
        <router-link
          class="p-2 rounded-md"
          v-if="isAdmin"
          to="/admin"
          @click="toggleMenu"
          >Админ</router-link
        >
        <div v-if="!isLogin">
          <Button variant="primary" @click="login">Вход</Button>
        </div>
        <div v-if="isLogin" @click="logout">
          <Button variant="primary">Выход</Button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import logo from "@assets/logo.svg";
import Button from "./UI/Button.vue";
import { useProductStore } from "@store/useProductStore";
import client from "@client/client";
import { useUserStore } from "@store/useUserStore";

const isAdmin = ref(false);
const isMenuOpen = ref(false); // State for mobile menu visibility
const router = useRouter();

const userStore = useUserStore();

const productStore = useProductStore();

const isLogin = ref(false);

const goMain = () => {
  router.push({ path: "/" });
};

const logout = async () => {
  try {
    await client.logout();
  } catch (error) {
    console.log(error);
  }
  userStore.unsetUser();
};

watch(
  () => userStore.user,
  () => {
    isLogin.value = userStore.checkUser();
  },
  { deep: true }
);

const login = () => {
  router.push({ path: "/login" });
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value; // Toggle the mobile menu
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
