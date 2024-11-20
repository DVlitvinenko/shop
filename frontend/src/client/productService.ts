import { FiltersType, Product } from "@typesDir/types";
import { axiosInstance } from "./axiosInstance";

const getProducts = async (
  filters: FiltersType
): Promise<{ products: Product[]; total_count: number }> => {
  try {
    const response = await axiosInstance.post("/products", filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export { getProducts };
