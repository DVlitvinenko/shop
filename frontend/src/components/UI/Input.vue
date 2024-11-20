<template>
  <input
    class="px-6 py-3 border-2 hover:border-gray-400 rounded-button bg-background-card focus:outline-none"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from "vue";

type ModelValue = string | number;

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "Введите значение",
  },
  modelValue: {
    type: [String, Number] as PropType<ModelValue>,
    default: "",
  },
});

const emit = defineEmits<{
  (event: "update:modelValue", value: ModelValue): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
