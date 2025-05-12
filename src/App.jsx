import "./App.css";
import { createContext, useState } from "react";
import MenuPage from "./pages/MenuPage.jsx";
import ApiService from "./services/ApiService.js";

export const AppContext = createContext(null);

function App() {
  const [appSettings, setAppSettings] = useState({
    theme: "light",
    language: "en",
  });
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const toggleTheme = () => {
    setAppSettings((prevSettings) => ({
      ...prevSettings,
      theme: prevSettings.theme === "light" ? "dark" : "light",
    }));
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const addToCart = (item, quantity = 1) => {
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

  const updateCartItemQuantity = (itemId, newQuantity) => {
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

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const submitOrder = async () => {
    if (cart.length === 0) return;

    setIsSubmittingOrder(true);
    setOrderError(null);

    try {
      const orderData = {
        items: cart,
        total: calculateTotal(),
        customer: {
          name: "Customer",
          phone: "+7999999999",
          address: "Address",
        },
        date: new Date().toISOString(),
        status: "pending",
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

  const contextValue = {
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
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`App ${appSettings.theme}-theme`}>
        <MenuPage />
      </div>
    </AppContext.Provider>
  );
}

export default App;
