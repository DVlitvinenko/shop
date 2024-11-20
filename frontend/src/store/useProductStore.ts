import { useCheckUser } from "@hooks/useCheckUser";
import { FiltersType, Product } from "@typesDir/types";
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

  const cart = ref<Product[]>([]);

  const addToCart = (product: Product) => {
    checkUser(
      () =>
        (cart.value = [
          ...cart.value.filter((item) => item.id !== product.id),
          { ...product, count: 1 },
        ])
    );
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

  const dellAboutCart = (id: number) => {
    cart.value = [...cart.value.filter((item) => item.id !== id)];
  };

  const updateFilters = (filtersData: FiltersType) => {
    filters.value = { ...filters.value, ...filtersData };
  };

  return {
    products,
    cart,
    promoProducts,
    allCountProducts,
    filters,
    addToCart,
    dellAboutCart,
    setPromoProducts,
    setProducts,
    setAllProductsCount,
    addProducts,
    updateFilters,
  };
});
