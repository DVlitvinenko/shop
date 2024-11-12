<template>
  <button
    :class="[
      'px-6 py-3  cursor-pointer  rounded-button focus-within:border-none text-text-light focus:border-none focus:outline-none active:bg-opacity-20 w-full hover:bg-opacity-80 transition-opacity',
      variant === 'primary' && 'bg-button-primary border-none',
      variant === 'secondary' && 'bg-inherit border-button-border border-2',
      variant === 'danger' && 'bg-state-error',
      disabled && 'cursor-default bg-opacity-80 ',
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, defineOptions } from "vue";

defineOptions({
  name: "my-button",
});

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

const emit = defineEmits<{ (event: "click", e: MouseEvent): void }>();

const handleClick = (e: MouseEvent) => {
  if (!props.disabled) {
    emit("click", e);
  }
};
</script>
