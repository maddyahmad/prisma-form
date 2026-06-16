import { Interface } from "readline/promises";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  sku: string;
  tags: string[];
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  shippingInformation: string;
  warrantyInformation: string;
  availabilityStatus: string;
  reviews: Reviews[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

export type Reviews = {
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerEmail: string;
  date: string;
};
