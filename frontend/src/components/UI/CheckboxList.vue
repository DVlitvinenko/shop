<template>
  <div class="relative w-full p-1 border-2 rounded-3xl">
    <Input class="w-full" v-model="searchedValue" />
    <div
      class="absolute left-0 z-10 w-full h-3 top-13 from-background-card bg-gradient-to-b rounded-t-3xl"
    ></div>
    <TransitionGroup
      tag="ul"
      class="w-full h-32 p-1 overflow-y-auto list"
      name="list"
    >
      <li
        class="flex items-center justify-between p-1 cursor-pointer hover:shadow-md rounded-3xl"
        v-for="(item, index) in filteredList"
        :key="index"
        @click="handleClick(item.value)"
      >
        <span>{{ item.name }}</span>
        <span
          :class="`flex items-center justify-center w-5  h-5 border-2 rounded-full ${check(
            item.value
          )}`"
        >
          <font-awesome-icon v-if="check(item.value)" icon="check" />
        </span>
      </li>
    </TransitionGroup>
    <div
      class="absolute left-0 z-10 w-full h-4 bottom-1 from-background-card bg-gradient-to-t rounded-b-3xl"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, TransitionGroup } from "vue";
import Input from "./Input.vue";

interface ListItem<T> {
  value: T;
  name: string;
}

interface CheckboxListProps<T> {
  list: ListItem<T>[];
  checkedList: T[];
}

const props = defineProps<CheckboxListProps<any>>();

const searchedValue = ref("");
const list = ref<ListItem<(typeof props.list)[0]["value"]>[]>(props.list);

const emit = defineEmits<{
  (event: "click", value: (typeof props.list)[0]["value"]): void;
}>();

const check = (item: any): boolean => {
  return props.checkedList.includes(item);
};

const handleClick = (value: any) => {
  emit("click", value);
};

const filteredList = computed(() =>
  list.value.filter((item) => {
    if (!searchedValue.value) {
      return true;
    }
    return item.name.toLowerCase().includes(searchedValue.value);
  })
);
</script>

<style scoped>
.list {
  overflow: -moz-scrollbars-none;
}
.list::-webkit-scrollbar {
  display: none;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
