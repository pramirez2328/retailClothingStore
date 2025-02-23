// types.ts
export type Review = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  availabilityStatus: string;
  brand: string;
  category: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  discountPercentage: number;
  images: string[];
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
  };
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  warrantyInformation: string;
  weight: number;
  orderQty: number;
  selectedSize: string;
};

export type ProductsResponse = {
  products: Product[];
};

export interface Item {
  title: string;
  price: number;
  orderQty: number;
  thumbnail?: string;
}

export interface Purchase {
  purchaseId: string;
  totalAmount: number;
  createdAt: string;
  items: Item[];
}

export interface User {
  _id: string;
  username: string;
  email: string;
  purchases: Purchase[];
}

export interface PurchaseQueryResponse {
  purchase: Purchase;
}

export interface QueryResponse {
  user: User;
}
