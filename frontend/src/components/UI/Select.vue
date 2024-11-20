<template>
  <select
    class="w-full px-2 py-1 border-2 element hover:border-gray-400 rounded-3xl bg-background-card focus:outline-none"
    :value="modelValue"
    @change="updateValue"
  >
    <!-- Опция по умолчанию -->
    <option v-if="selectDisplayName" :value="null">
      Выбрать {{ selectDisplayName }}
    </option>

    <!-- Опции для списка -->
    <option :value="item.value" v-for="item in list" :key="item.value">
      {{ item.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
type ListItem = { value: string; name: string };

interface SelectProps {
  list: ListItem[];
  selectDisplayName?: string;
  modelValue: string;
}

const { list, selectDisplayName, modelValue } = defineProps<SelectProps>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const updateValue = (e: any) => {
  emit("update:modelValue", e.target.value);
};

defineOptions({ name: "my-select" });
</script>

<style scoped>
.element {
  overflow: -moz-scrollbars-none; /* Hides the scrollbar */
}
.element::-webkit-scrollbar {
  display: none; /* Hides the scrollbar */
}
</style>
