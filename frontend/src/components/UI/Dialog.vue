<template>
  <div
    v-show="isShowed"
    @click.self="handleClick"
    class="fixed left-0 z-10 flex items-center justify-center w-full h-full mt-0 bg-black -top-2 bg-opacity-20"
  >
    <div class="min-w-[300px] w-1/2 p-2 m-0 bg-white rounded-md">
      <slot />
    </div>
  </div>
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

<style scoped></style>
