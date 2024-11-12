<template>
  <div
    class="px-3 py-3 transition-shadow shadow-none rounded-3xl bg-background-card hover:shadow-md"
    @click="handleClick"
  >
    <div class="flex items-center justify-between px-2 text-2xl cursor-pointer">
      {{ props.title }}
      <font-awesome-icon
        :class="`transition-transform ${!isOpened && 'rotate-180'}`"
        :icon="['fas', 'chevron-up']"
      />
    </div>
    <Transition name="slide-fade">
      <div v-if="isOpened" class="flex items-center h-12 px-2 text-base">
        {{ props.text }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface TextOpenProps {
  title: string;
  text: string;
  isOpened: boolean;
}
const props = defineProps<TextOpenProps>();
const emit = defineEmits<{ (event: "open"): void }>();
const handleClick = () => {
  emit("open");
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  height: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  height: 48px;
}
</style>
