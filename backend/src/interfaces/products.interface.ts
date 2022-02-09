export interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[];
  mainImage: string;
  rating: number;
  ratingsTotal: number;
  besteller: boolean;
  category: string;
  price: number;
}
