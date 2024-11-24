import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("error", () => {
  const errors = ref<string[]>();

  const addError = (error: string) => {
    if (errors.value) {
      errors.value = [error, ...errors.value];
    } else errors.value = [error];
    setTimeout(() => removeError(error), 3000);
  };

  const removeError = (error: string) => {
    if (errors.value) {
      errors.value = [...errors.value.filter((item) => item !== error)];
    }
  };

  return { errors, addError, removeError };
});
