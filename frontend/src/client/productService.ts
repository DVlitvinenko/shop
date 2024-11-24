import { CartItem, FiltersType, Order, Product, Review } from "@typesDir/types";
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
): Promise<{ product: Product; reviews: Review[] }> => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const getReviews = async (
  limit: number,
  sort: "asc" | "desc"
): Promise<{ reviews: Review[] }> => {
  try {
    const response = await axiosInstance.post(`/products/reviews`, {
      limit,
      sort,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const getReview = async (id: number): Promise<{ reviews: Review }> => {
  try {
    const response = await axiosInstance.get(`/products/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const addToCart = async (id: number) => {
  try {
    await axiosInstance.post(`/products/cart/${id}`);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const incrementQuantityInCart = async (id: number) => {
  try {
    await axiosInstance.post(`/cart/increment/${id}`);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const decrementQuantityInCart = async (id: number) => {
  try {
    await axiosInstance.post(`/cart/decrement/${id}`);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const removeFromCart = async (ids: number[]) => {
  try {
    await axiosInstance.post(`/cart/remove`, { ids });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const order = async (ids: number[]) => {
  try {
    await axiosInstance.post(`/order`, { ids: ids });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const getCart = async (): Promise<{ cart: CartItem[] }> => {
  try {
    const response = await axiosInstance.get(`/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const getOrders = async (): Promise<{ orders: Order[] }> => {
  try {
    const response = await axiosInstance.get(`/order`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const getInitialData = async (): Promise<{
  cart: CartItem[];
  reviews: Review[];
  products: Product[];
  orders: Order[];
}> => {
  try {
    const response = await axiosInstance.post(`/initial`, {
      product: { count: { min: 1 }, sort: "rating-desc", limit: 8 },
      review: {
        limit: 4,
        sort: "desc",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

const cancelOrder = async (orderId: number): Promise<Order> => {
  try {
    const response = await axiosInstance.patch(`/order/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error canceling order:", error);
    throw new Error("Failed to cancel order");
  }
};

export {
  getProducts,
  getProduct,
  getReviews,
  getReview,
  addToCart,
  removeFromCart,
  order,
  getCart,
  incrementQuantityInCart,
  decrementQuantityInCart,
  getInitialData,
  getOrders,
  cancelOrder,
};
