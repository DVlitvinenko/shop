<template>
  <div>
    <div class="space-y-4 text-sm">
      <div class="flex flex-col justify-between gap-2 sm:flex-row">
        <ul class="w-full p-1 border-2 rounded-3xl">
          <li
            class="flex items-center justify-between p-1 cursor-pointer hover:shadow-md rounded-3xl"
            v-for="{ value, name } in productClasses"
            :key="value"
            @click="updateClass(value as ProductClass)"
          >
            <span>{{ name }}</span
            ><span
              :class="`flex items-center justify-center w-5 h-5 border-2 rounded-full ${localFilters.class?.includes(value as ProductClass)} `"
            >
              <font-awesome-icon
                v-if="localFilters.class?.includes(value as ProductClass)"
                icon="check"
            /></span>
          </li>
        </ul>
        <ul class="w-full p-1 border-2 rounded-3xl">
          <li
            class="flex items-center justify-between p-1 cursor-pointer hover:shadow-md rounded-3xl"
            v-for="{ value, name } in productTypes"
            @click="updateType(value as ProductType)"
          >
            <span>{{ name }}</span
            ><span
              :class="`flex items-center justify-center w-5 h-5 border-2 rounded-full ${localFilters.type?.includes(value as ProductType)} `"
            >
              <font-awesome-icon
                v-if="localFilters.type?.includes(value as ProductType)"
                icon="check"
            /></span>
          </li>
        </ul>
      </div>

      <div
        class="flex flex-col items-center justify-between w-full gap-2 sm:flex-row"
      >
        <Input
          class="w-full h-10"
          label="Мин. цена"
          type="number"
          :value="localFilters.price?.min"
          @change="updatePrice('min', $event)"
          placeholder="Мин. цена"
        />
        <Input
          class="w-full h-10"
          label="Макс. цена"
          type="number"
          :value="localFilters.price?.max"
          @change="updatePrice('max', $event)"
          placeholder="Макс. цена"
        />
      </div>
      <div
        class="flex flex-col items-center justify-between w-full gap-2 sm:grid sm:grid-cols-2 sm:flex-row"
      >
        <Input
          type="text"
          class="w-full h-10"
          label="Бренд"
          :value="localFilters.brand"
          @change="updateBrand($event)"
          placeholder="Бренд"
        />
        <Select
          class="w-full h-10"
          v-model="localFilters.sort!"
          :list="sortOptions"
        />
      </div>
    </div>
    <Button class="mt-4" @click="applyFilters">Применить фильтры</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineEmits, defineProps } from "vue";
import Input from "./UI/Input.vue";
import Select from "./UI/Select.vue";
import Button from "./UI/Button.vue";

import { ClothingClasses } from "@constants/ClothingClass";
import { getDataArray } from "@utils/utils";
import { FiltersType, ProductClass, ProductType } from "@typesDir/types";
import { ClothingTypes } from "@constants/ClothingType";

const props = defineProps<{ filters: FiltersType }>();

const emit = defineEmits<{
  (event: "filters-changed", filters: FiltersType): void;
  (event: "close"): void;
}>();

const localFilters = ref<FiltersType>({ ...props.filters });

const productClasses = getDataArray(ClothingClasses);

const productTypes = getDataArray(ClothingTypes);

const sortOptions = [
  { value: "price-asc", name: "Цена: по возрастанию" },
  { value: "price-desc", name: "Цена: по убыванию" },
  { value: "rating-asc", name: "Рейтинг: по возрастанию" },
  { value: "rating-desc", name: "Рейтинг: по убыванию" },
  { value: "default", name: "По умолчанию" },
];

const updateClass = (value: ProductClass) => {
  if (localFilters.value.class?.includes(value as ProductClass)) {
    return (localFilters.value = {
      ...localFilters.value,
      class: [...localFilters.value.class.filter((item) => item !== value)],
    });
  }
  if (localFilters.value.class) {
    return (localFilters.value = {
      ...localFilters.value,
      class: [...localFilters.value.class, value],
    });
  }
  localFilters.value = {
    ...localFilters.value,
    class: [value],
  };
};

const updateType = (value: ProductType) => {
  if (localFilters.value.type?.includes(value as ProductType)) {
    return (localFilters.value = {
      ...localFilters.value,
      type: [...localFilters.value.type.filter((item) => item !== value)],
    });
  }
  if (localFilters.value.type) {
    return (localFilters.value = {
      ...localFilters.value,
      type: [...localFilters.value.type, value],
    });
  }
  localFilters.value = {
    ...localFilters.value,
    type: [value],
  };
};

const updatePrice = (key: "min" | "max", event: InputEvent) => {
  if (!localFilters.value.price) {
    localFilters.value.price = { min: 0, max: 1000000 };
  }
  const value = parseFloat((event.target as HTMLInputElement).value);
  localFilters.value.price = {
    ...localFilters.value.price,
    [key]: value,
  };
};

// const updateBrand = (event: InputEvent) => {
//   const value = parseFloat((event.target as HTMLInputElement).value);
//   localFilters.value.brand = String(value);
// };

const applyFilters = () => {
  emit("filters-changed", localFilters.value);
  emit("close");
};
</script>

<style scoped>
h3 {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
