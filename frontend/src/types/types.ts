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
  story: StoryItem[];
  cart: Product[];
}

export type { DisplayRoute, Product, User };
