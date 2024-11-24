import { useErrorStore } from "@store/useErrorStore";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    return response;
  },
  (error) => {
    const errorStore = useErrorStore();
    errorStore.addError(error.response?.data?.message || "Неизвестная ошибка");
    return Promise.reject(error);
  }
);

export { axiosInstance };
