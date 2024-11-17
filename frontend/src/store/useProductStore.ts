import { useCheckUser } from "@hooks/useCheckUser";
import { Product } from "@typesDir/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("products", () => {
  const checkUser = useCheckUser();

  const products = ref<Product[]>();

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

  const dellAboutCart = (id: number) => {
    cart.value = [...cart.value.filter((item) => item.id !== id)];
  };

  return {
    products,
    cart,
    promoProducts,
    addToCart,
    dellAboutCart,
    setPromoProducts,
  };
});
