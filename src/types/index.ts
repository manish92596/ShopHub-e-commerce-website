export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface AppState {
  products: Product[];
  categories: string[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  cachedProducts: Record<number, Product>;
}