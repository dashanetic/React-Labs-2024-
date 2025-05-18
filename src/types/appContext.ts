import { User } from "../services/AuthContext";
import { Meal } from "../services/ApiService";

export type PageType = 'home' | 'menu' | 'login';

export interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
}

export interface CartItem extends Meal {
  quantity: number;
}

export interface AppContextType {
  settings: AppSettings;
  toggleTheme: () => void;
  cart: CartItem[];
  isCartOpen: boolean;
  isSubmittingOrder: boolean;
  orderSubmitted: boolean;
  orderError: string | null;
  toggleCart: () => void;
  addToCart: (item: Meal, quantity?: number) => void;
  updateCartItemQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  calculateTotal: () => number;
  submitOrder: () => Promise<void>;
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
  currentUser: User | null;
  logout: () => void;
}