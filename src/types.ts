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
};

export type ProductsResponse = {
  products: Product[];
};
