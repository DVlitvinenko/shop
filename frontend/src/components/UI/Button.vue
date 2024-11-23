<template>
  <button
    :class="[
      'px-6 py-3 cursor-pointer rounded-button focus-within:border-none text-text-light focus:border-none focus:outline-none active:bg-opacity-20 w-full hover:bg-opacity-80 transition-opacity',
      variant === 'primary' && 'bg-button-primary border-none',
      variant === 'secondary' && 'bg-inherit border-button-border border-2',
      variant === 'danger' && 'bg-state-error',
      disabled || isLoading
        ? 'cursor-default bg-opacity-60 hover:bg-opacity-60'
        : '',
      isLoading && 'animate-border',
    ]"
    :disabled="disabled || isLoading"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref } from "vue";

type Variant = "primary" | "secondary" | "danger";

const props = defineProps({
  variant: {
    type: String as PropType<Variant>,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "async-click", e: MouseEvent): Promise<void>;
}>();

const isLoading = ref(false);

const handleClick = async (e: MouseEvent) => {
  if (props.disabled || isLoading.value) return;

  try {
    isLoading.value = true;
    const asyncClickHandler = emit as unknown as (
      event: "async-click",
      e: MouseEvent
    ) => Promise<void>;
    await asyncClickHandler("async-click", e);
  } catch (error) {
    console.error("Ошибка при выполнении async-click:", error);
  } finally {
    isLoading.value = false;
  }

  emit("click", e);
};
</script>

<style>
.animate-border {
  overflow: hidden;
  position: relative;
  border: none;
  animation: border-move 2s linear infinite;
  background: linear-gradient(90deg, white, var(--button-color), white);
  background-size: 200% 100%;
}

@keyframes border-move {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 200% 0%;
  }
}

.bg-button-primary {
  --button-color: #84a59d;
}
.bg-inherit {
  --button-color: #fafafa;
}
.bg-state-error {
  --button-color: #e53e3e;
}
</style>
