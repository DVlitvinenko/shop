import { FiltersType, Product } from "@typesDir/types";
import { axiosInstance } from "./axiosInstance";

const getProducts = async (filters: FiltersType): Promise<Product[]> => {
  const response = await axiosInstance.get("/products", {
    data: filters,
  });

  return response.data;
};

export { getProducts };
