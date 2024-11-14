import { useUserStore } from "@store/useUserStore";
import { useRouter } from "vue-router";

export const useCheckUser = () => {
  const router = useRouter();
  const user = useUserStore().user;

  return (callback: () => void) => {
    if (!user) {
      return router.push({ path: "/login" });
    } else callback;
  };
};
