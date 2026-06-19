export const RPLScreenName = {
  Home: 'Home',
  Login: 'Login',
  Dashboard: 'Dashboard',
  Cart: 'Cart',
  ProductDetail: 'ProductDetail',
  Wishlist:"Wishlist"
} as const;

export interface loginCreds {
  email: string;
  password: string;
}

export interface Categories {
  slug: string;
  name: string;
  url: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
  quantity: number;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface PaginationRef {
  skip: number;
  total: number;
}
