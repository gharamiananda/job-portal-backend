// src/modules/category/category.interface.ts

export interface ICategory {
  name: string;
  slug: string;
  description?: string;
  isActive?: boolean;
}