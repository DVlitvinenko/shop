import client from "@client/client";
import { useCheckUser } from "@hooks/useCheckUser";
import { CartItem, FiltersType, Product } from "@typesDir/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("products", () => {
  const checkUser = useCheckUser();

  const products = ref<Product[]>();
  const allCountProducts = ref(0);

  const defaultFilters: FiltersType = {
    count: { min: 1 },
    limit: 18,
    offset: 0,
    sort: "rating-desc",
  };

  const filters = ref<FiltersType>(defaultFilters);

  const promoProducts = ref<Product[]>();

  const cart = ref<CartItem[]>();

  const addToCart = async (product: Product) => {
    await checkUser(async () => {
      try {
        await client.addToCart(product.id);
        if (cart.value) {
          cart.value = [
            ...cart.value.filter((item) => item.id !== product.id),
            { ...product, quantity: 1 },
          ];
        } else {
          cart.value = [{ ...product, quantity: 1 }];
        }
      } catch (error) {}
    });
  };

  const setPromoProducts = (products: Product[]) => {
    promoProducts.value = [...products];
  };

  const setProducts = (productsData: Product[]) => {
    products.value = [...productsData];
  };

  const addProducts = (productsData: Product[]) => {
    products.value = products.value
      ? [...products.value, ...productsData]
      : [...productsData];
  };

  const setAllProductsCount = (value: number) => {
    allCountProducts.value = value;
  };

  const removeFromCart = async (id: number) => {
    try {
      await client.removeFromCart([id]);
      cart.value &&
        (cart.value = [...cart.value.filter((item) => item.id !== id)]);
    } catch (error) {}
  };

  const clearCart = () => {
    cart.value = [];
  };

  const setCart = (cartData: CartItem[]) => {
    cart.value = [...cartData];
  };

  const updateFilters = (filtersData: FiltersType) => {
    filters.value = { ...filters.value, ...filtersData };
  };

  const getPromoProducts = async () => {
    const data = await client.getProducts({
      count: { min: 1 },
      sort: "rating-desc",
      limit: 8,
    });
    setPromoProducts(data.products);
  };

  const getCart = async () => {
    const data = await client.getCart();
    setCart(data.cart);
  };

  return {
    products,
    cart,
    promoProducts,
    allCountProducts,
    filters,
    addToCart,
    removeFromCart,
    setPromoProducts,
    setProducts,
    setAllProductsCount,
    addProducts,
    updateFilters,
    clearCart,
    setCart,
    getPromoProducts,
    getCart,
  };
});
