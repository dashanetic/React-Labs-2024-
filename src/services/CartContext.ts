import { createContext } from "react";
import { Meal } from './ApiService';

export interface CartItem {
  item: Meal;
  quantity: number;
}

export interface CartContextType {
  cartItemCount: number;
  cartItems?: CartItem[];
  addToCart: (item: Meal, quantity?: number) => void;
  removeFromCart?: (itemId: string) => void;
  clearCart?: () => void;
  updateQuantity?: (itemId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartItemCount: 0,
  addToCart: () => {},
});

export default CartContext;