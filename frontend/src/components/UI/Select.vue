<template>
  <select
    class="border-2 rounded-md bg-background min-w-40 border-secondary"
    v-model="value"
  >
    <option :value="item.value" v-for="item in list" :key="item.value">
      {{ item.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
type ListItem = { value: string; name: string };

interface SelectProps {
  list: ListItem[];
}

const value = defineModel();

const { list } = defineProps<SelectProps>();

defineOptions({ name: "my-select" });
</script>

<style scoped></style>
