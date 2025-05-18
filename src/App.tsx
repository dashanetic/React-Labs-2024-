import "./App.css";
import React, { createContext, useState } from "react";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ApiService, { Meal } from "./services/ApiService";
import { AuthProvider, useAuth } from "./services/AuthContext";
import { AppContextType, AppSettings, CartItem, PageType } from "./types/appContext";

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppContent: React.FC = () => {
  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: "light",
    language: "en",
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  const { currentUser, logout } = useAuth();

  const toggleTheme = (): void => {
    setAppSettings((prevSettings) => ({
      ...prevSettings,
      theme: prevSettings.theme === "light" ? "dark" : "light",
    }));
  };

  const toggleCart = (): void => {
    setIsCartOpen((prevState) => !prevState);
  };

  const addToCart = (item: Meal, quantity: number = 1): void => {
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
  };

  const updateCartItemQuantity = (itemId: string, newQuantity: number): void => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId: string): void => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = (): void => {
    setCart([]);
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const submitOrder = async (): Promise<void> => {
    if (cart.length === 0) return;

    setIsSubmittingOrder(true);
    setOrderError(null);

    try {
      const orderData = {
        items: cart.map(item => ({
          mealId: item.id,
          quantity: item.quantity
        })),
        totalPrice: calculateTotal(),
        customerName: currentUser ? currentUser.name : "Customer",
        customerEmail: currentUser ? currentUser.email : "customer@example.com",
        customerPhone: "+7999999999",
        deliveryAddress: "Address",
      };

      await ApiService.createOrder(orderData);

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
  };

  const navigateTo = (page: PageType): void => {
    setCurrentPage(page);
  };

  const handleLogout = (): void => {
    logout();
    navigateTo("home");
  };

  const contextValue: AppContextType = {
    settings: appSettings,
    toggleTheme,
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
    currentPage,
    navigateTo,
    currentUser,
    logout: handleLogout,
  };

  const renderPage = (): JSX.Element => {
    switch (currentPage) {
      case "menu":
        return <MenuPage />;
      case "login":
        return <LoginPage />;
      case "home":
      default:
        return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`App ${appSettings.theme}-theme`}>{renderPage()}</div>
    </AppContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;