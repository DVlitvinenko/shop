import { useUserStore } from "@store/useUserStore";
import client from "@client/client";

export const useCheckAuth = () => {
  return async () => {
    const userStore = useUserStore();

    if (!userStore.user) {
      try {
        const user = await client.getUser();
        if (user) {
          userStore.setUser(user);
        }
      } catch (error) {
        console.error("Ошибка получения пользователя:", error);
      }
    }
  };
};
