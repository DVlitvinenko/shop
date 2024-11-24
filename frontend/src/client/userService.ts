import { User } from "@typesDir/types";
import { axiosInstance } from "./axiosInstance";

const getUser = async (): Promise<User> => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    const response = await axiosInstance.get("/user");
    return response.data.user;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const login = async (name: string, password: string): Promise<User> => {
  try {
    const response = await axiosInstance.post("/login", { name, password });
    localStorage.setItem("token", response.data.token);

    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token);
    }

    return response.data.user;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await axiosInstance.post("/register", {
      name,
      email,
      password,
    });

    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token);
    }

    return response.data.user;
  } catch (error: any) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

const logout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    localStorage.removeItem("token");

    return response.data;
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const changeUserPassword = async (
  password: string,
  newPassword: string,
  newPasswordConfirmation: string
) => {
  try {
    await axiosInstance.patch("/user/password", {
      new_password: newPassword,
      current_password: password,
      new_password_confirmation: newPasswordConfirmation,
    });
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const deleteUser = async () => {
  try {
    await axiosInstance.delete("/user");
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export { login, register, logout, getUser, changeUserPassword, deleteUser };
