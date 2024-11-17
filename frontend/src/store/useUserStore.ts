import { User } from "@typesDir/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<any>();
  // !исправить
  const checkUser = (): boolean => {
    return !!user.value;
  };

  const setUser = (userData: User) => {
    user.value = userData;
  };

  const unsetUser = () => {
    user.value = undefined;
  };

  return { user, checkUser, setUser, unsetUser };
});
