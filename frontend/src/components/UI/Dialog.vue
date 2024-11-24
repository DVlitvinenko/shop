<template>
  <Transition name="bounce" tag="div">
    <div
      v-show="props.isShowed"
      @click.self="handleClick"
      class="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen mt-0 bg-black bg-opacity-20"
    >
      <div
        @scroll.self
        class="min-w-[300px] container w-1/2 p-2 m-0 bg-white max-h-[90%] overflow-y-auto rounded-3xl"
      >
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

const props = defineProps<DialogProps>();

const emit = defineEmits<{ (event: "close"): void }>();

const handleClick = () => {
  emit("close");
};
</script>

<style scoped>
.bounce-enter-active,
.bounce-leave-active {
  transition: opacity 0.5s ease;
}
.bounce-enter-from,
.bounce-leave-to {
  opacity: 0;
}
.bounce-enter-active > div,
.bounce-leave-active > div {
  transition: transform 0.5s ease;
}
.bounce-enter-from > div {
  transform: scale(0) translateX(-100%) translateY(-100%);
}
.bounce-leave-to > div {
  transform: scale(0) translateX(100%) translateY(100%);
}
.container {
  overflow: -moz-scrollbars-none;
}
.container::-webkit-scrollbar {
  display: none;
}
</style>
