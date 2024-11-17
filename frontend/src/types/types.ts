interface DisplayRoute {
  name: string;
  path: string;
}

interface Product {
  title: string;
  img: string;
  price: number;
  description: string;
  count: number;
  id: number;
}

interface StoryItem extends Product {
  date: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  status?: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

type Method = "get" | "post" | "put" | "delete";

interface AxiosParam {
  method: Method;
  url: string;
  body?: object;
}

export enum ProductType {
  TShirt = "T-Shirt",
  Shirt = "Shirt",
  Pants = "Pants",
  Shorts = "Shorts",
  Dress = "Dress",
  Skirt = "Skirt",
  Jacket = "Jacket",
  Coat = "Coat",
  Hoodie = "Hoodie",
  Sweater = "Sweater",
}

export enum ProductClass {
  Luxury = "Luxury",
  Casual = "Casual",
  Formal = "Formal",
  Sportswear = "Sportswear",
  Workwear = "Workwear",
  Streetwear = "Streetwear",
  Vintage = "Vintage",
  Modern = "Modern",
  Traditional = "Traditional",
  AvantGarde = "Avant-Garde",
}

type Sort =
  | "prise-desc"
  | "prise-asc"
  | "rating-asc"
  | "rating-desc"
  | "count-asc"
  | "cont-desc"
  | "default";
interface FiltersType {
  price?: {
    min?: number; // Минимальная цена
    max?: number; // Максимальная цена
  };
  text?: string;
  class?: ProductClass[]; // Фильтрация по классам одежды (можно выбрать несколько)
  type?: ProductType[]; // Фильтрация по типам одежды (можно выбрать несколько)
  brand?: string; // Поиск по бренду
  count?: {
    min?: number; // Минимальное количество на складе
    max?: number; // Максимальное количество на складе
  };
  model?: string; // Поиск по модели
  sort?: Sort;
  limit?: number;
}

export type {
  DisplayRoute,
  Product,
  User,
  AxiosParam,
  Method,
  FiltersType,
  Sort,
};
