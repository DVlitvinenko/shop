<template>
  <div class="pb-6 sm:pb-0">
    <div class="space-y-2 text-sm sm:space-y-4">
      <div class="flex flex-col flex-wrap justify-between gap-2 sm:flex-row">
        <CheckboxList
          :list="productClasses"
          :checked-list="localFilters.class ?? []"
          @click="(value) => updateArrayFilter('class', value)"
        />
        <CheckboxList
          :list="productTypes"
          :checked-list="localFilters.type ?? []"
          @click="(value) => updateArrayFilter('type', value)"
        />
        <CheckboxList
          :list="productColors"
          :checked-list="localFilters.color ?? []"
          @click="(value) => updateArrayFilter('color', value)"
        />
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
    <Button
      class="absolute bottom-0 left-0 right-0 w-full mx-auto rounded-none sm:rounded-button sm:relative sm:w-full sm:mt-4"
      @click="applyFilters"
    >
      Применить фильтры
    </Button>
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
import { FiltersType, ProductType } from "@typesDir/types";
import { ClothingTypes } from "@constants/ClothingType";
import CheckboxList from "./UI/CheckboxList.vue";
import { ClothingColors } from "@constants/ClosingColor";

const props = defineProps<{ filters: FiltersType }>();

const emit = defineEmits<{
  (event: "filters-changed", filters: FiltersType): void;
  (event: "close"): void;
}>();

const localFilters = ref<FiltersType>({ ...props.filters });

const productClasses = getDataArray(ClothingClasses);

const productTypes = getDataArray(ClothingTypes);

const productColors = getDataArray(ClothingColors);

const sortOptions = [
  { value: "price-asc", name: "Цена: по возрастанию" },
  { value: "price-desc", name: "Цена: по убыванию" },
  { value: "rating-asc", name: "Рейтинг: по возрастанию" },
  { value: "rating-desc", name: "Рейтинг: по убыванию" },
  { value: "default", name: "По умолчанию" },
];

type ArrayFilterKey = "class" | "color" | "type";

const checkIncludes = <T>(arr: readonly T[], x: T): boolean => arr.includes(x);

const updateArrayFilter = (key: ArrayFilterKey, data: string) => {
  const currentFilter = localFilters.value[key];

  if (!currentFilter) {
    localFilters.value = {
      ...localFilters.value,
      [key]: [data],
    };
    return;
  }

  if (Array.isArray(currentFilter)) {
    if (checkIncludes(currentFilter as string[], data)) {
      localFilters.value = {
        ...localFilters.value,
        [key]: currentFilter.filter((item) => item !== data),
      };
      return;
    }

    localFilters.value = {
      ...localFilters.value,
      [key]: [...currentFilter, data],
    };
    return;
  }

  localFilters.value = {
    ...localFilters.value,
    [key]: [data],
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

const updateBrand = (event: InputEvent) => {
  const value = parseFloat((event.target as HTMLInputElement).value);
  localFilters.value.brand = String(value);
};

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
