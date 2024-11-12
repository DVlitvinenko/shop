<template>
  <div>Фильтры</div>
  <div class="space-y-4">
    <Select value="test" :list="[{ value: 'test', name: 'test' }]" />
    <Select value="test" :list="[{ value: 'test', name: 'test' }]" />
    <Select value="test" :list="[{ value: 'test', name: 'test' }]" />
    <Select value="test" :list="[{ value: 'test', name: 'test' }]" />
    <Input placeholder="test" />
    <Input placeholder="test" />
    <Input placeholder="test" />
    <Input placeholder="test" />
  </div>
</template>

<script setup lang="ts">
import Input from "./UI/Input.vue";
import Select from "./UI/Select.vue";
</script>

<style scoped></style>
