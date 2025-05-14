import "./App.css";
import { createContext, useState } from "react";
import MenuPage from "./pages/MenuPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ApiService from "./services/ApiService.js";
import { AuthProvider, useAuth } from "./services/AuthContext.jsx";

export const AppContext = createContext(null);

function AppContent() {
  const [appSettings, setAppSettings] = useState({
    theme: "light",
    language: "en",
  });
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  const { currentUser, logout } = useAuth();

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
          name: currentUser ? currentUser.name : "Customer",
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

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    logout();
    navigateTo("home");
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
    currentPage,
    navigateTo,
    currentUser,
    logout: handleLogout,
  };

  const renderPage = () => {
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
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
