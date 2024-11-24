<template>
  <TransitionGroup
    name="fade"
    tag="div"
    class="fixed z-50 space-y-2 top-5 right-5"
  >
    <div
      v-for="error in errors"
      :key="error"
      class="p-4 text-white bg-red-500 rounded-lg shadow-md"
    >
      {{ error }}
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useErrorStore } from "@store/useErrorStore";
import { computed } from "vue";

const errorStore = useErrorStore();
const errors = computed(() => errorStore.errors);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
