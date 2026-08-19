// this defines the types for the products module

// this is the payload shape for creating a product
export interface CreateProductInput {
  name: string;
  sku?: string;
  description?: string;
  unit?: string;
}

// this is the payload shape for updating a product
export interface UpdateProductInput {
  name?: string;
  sku?: string;
  description?: string;
  unit?: string;
  isActive?: boolean;
}
