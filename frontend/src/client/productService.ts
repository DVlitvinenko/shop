import { FiltersType, Product, Review } from "@typesDir/types";
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

const getProduct = async (
  id: number
): Promise<{ product: Product; reviews: Review }> => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export { getProducts, getProduct };
