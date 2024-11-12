<template>
  <input
    class="p-1 border-2 rounded-md border-secondary bg-background-subtle focus:outline-none"
    :type="type"
    :placeholder="placeholder"
    v-model="value"
  />
</template>

<script setup lang="ts">
import { InputTypeHTMLAttribute, PropType } from "vue";

type ModelValue = string | number;

interface InputProps {
  type?: InputTypeHTMLAttribute;
  placeholder?: string;
}

defineOptions({
  name: "my-input",
});

const value = defineModel<ModelValue>();

const { type, placeholder } = defineProps({
  type: {
    type: String as PropType<InputProps["type"]>,
    default: "text",
  },
  placeholder: {
    type: String as PropType<InputProps["placeholder"]>,
    default: "Введите значение",
  },
});
</script>
