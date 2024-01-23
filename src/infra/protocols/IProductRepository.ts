import { Product } from "@prisma/client";

export interface ProductPayload {
  name: string;
  category: string;
  price: number;
  description: string;
  quantity: number;
}

export interface IProductRepository {
  update: (product: ProductPayload, id: number) => Promise<Product | null>;
  create: (product: ProductPayload) => Promise<Product | null>;
  remove: (id: number) => Promise<boolean>;
  getById: (id: number) => Promise<Product | null>;
  getAll: () => Promise<Product[] | null>;
}