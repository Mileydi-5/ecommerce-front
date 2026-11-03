export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images?: string[];
  category: string;
  subcategory?: string;
  tags?: string[];
  stock: number;
  sizes?: string[];
  colors?: string[];
}