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

export type { DisplayRoute, Product };
