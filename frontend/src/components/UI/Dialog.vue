<template>
  <Transition name="bounce" tag="div">
    <div
      v-show="isShowed"
      @click.self="handleClick"
      class="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen mt-0 bg-black bg-opacity-20"
    >
      <div class="min-w-[300px] w-1/2 p-2 m-0 bg-white rounded-3xl">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface DialogProps {
  isShowed: boolean;
}

defineOptions({
  name: "my-dialog",
});

const { isShowed } = defineProps<DialogProps>();

const emit = defineEmits<{ (event: "close"): void }>();

const handleClick = () => {
  emit("close");
};
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
