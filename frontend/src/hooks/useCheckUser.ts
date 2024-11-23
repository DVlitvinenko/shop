import { useUserStore } from "@store/useUserStore";
import { useRouter } from "vue-router";

export const useCheckUser = () => {
  const router = useRouter();
  const userStore = useUserStore();

  return (callback: () => void) => {
    if (!userStore.user) {
      return router.push({ path: "/login" });
    } else callback();
  };
};
