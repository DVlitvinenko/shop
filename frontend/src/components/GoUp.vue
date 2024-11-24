<template>
  <Transition name="arrow"
    ><div
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed z-40 bottom-3 left-3"
    >
      <font-awesome-icon
        icon="circle-arrow-up"
        class="h-10 text-gray-700 rounded-full shadow-md cursor-pointer hover:text-gray-900"
      /></div
  ></Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

const handleScroll = () => {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const halfScreenHeight = window.innerHeight / 2;
  isVisible.value = scrollPosition > halfScreenHeight;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.arrow-enter-active,
.arrow-leave-active {
  transition: opacity 0.5s ease;
}
.arrow-enter-from,
.arrow-leave-to {
  opacity: 0;
}
</style>
