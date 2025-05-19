import React, { createContext, useState, useContext, useCallback } from "react";
import { Meal } from "../types/api/types";
import { useCreateOrder } from "./ApiHookService";

export interface CartItem extends Meal {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  isSubmittingOrder: boolean;
  orderSubmitted: boolean;
  orderError: string | null;
  addToCart: (item: Meal, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
  toggleCart: () => void;
  submitOrder: (customerData?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
  currentUserName?: string;
  currentUserEmail?: string;
}

export const CartProvider: React.FC<CartProviderProps> = ({
  children,
  currentUserName = "Customer",
  currentUserEmail = "customer@example.com",
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const { createOrder } = useCreateOrder();

  const toggleCart = useCallback((): void => {
    setIsCartOpen((prevState) => !prevState);
  }, []);

  const addToCart = useCallback((item: Meal, quantity: number = 1): void => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  }, []);

  const updateCartItemQuantity = useCallback(
    (itemId: string, newQuantity: number): void => {
      if (newQuantity <= 0) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    },
    []
  );

  const removeFromCart = useCallback((itemId: string): void => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback((): void => {
    setCart([]);
  }, []);

  const calculateTotal = useCallback((): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const submitOrder = useCallback(
    async (customerData?: {
      name: string;
      email: string;
      phone: string;
      address: string;
    }): Promise<void> => {
      if (cart.length === 0) return;

      setIsSubmittingOrder(true);
      setOrderError(null);

      try {
        const orderData = {
          items: cart.map((item) => ({
            mealId: item.id,
            quantity: item.quantity,
          })),
          totalPrice: cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
          customerName: customerData?.name || currentUserName,
          customerEmail: customerData?.email || currentUserEmail,
          customerPhone: customerData?.phone || "+7999999999",
          deliveryAddress: customerData?.address || "Address",
        };

        await createOrder(orderData);

        setIsSubmittingOrder(false);
        setOrderSubmitted(true);
        setCart([]);

        setTimeout(() => {
          setOrderSubmitted(false);
        }, 3000);
      } catch (error) {
        console.error("Failed to submit order:", error);
        setIsSubmittingOrder(false);
        setOrderError("Failed to submit your order. Please try again.");
      }
    },
    [cart, createOrder, currentUserName, currentUserEmail]
  );

  const value: CartContextType = {
    cart,
    isCartOpen,
    isSubmittingOrder,
    orderSubmitted,
    orderError,
    toggleCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
    submitOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
