import "./App.css";
import React, { createContext, useState, useCallback } from "react";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./services/AuthContext";
import { CartProvider } from "./services/CartContext";
import Cart from "./components/Cart/Cart";
import { AppContextType, AppSettings, PageType } from "./types/appContext";

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppContent: React.FC = () => {
  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: "light",
    language: "en",
  });
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  const { currentUser, logout } = useAuth();

  const toggleTheme = useCallback((): void => {
    setAppSettings((prevSettings) => ({
      ...prevSettings,
      theme: prevSettings.theme === "light" ? "dark" : "light",
    }));
  }, []);

  const navigateTo = useCallback((page: PageType): void => {
    setCurrentPage(page);
  }, []);

  const handleLogout = useCallback((): void => {
    logout();
    navigateTo("home");
  }, [logout, navigateTo]);

  const renderPage = useCallback((): JSX.Element => {
    switch (currentPage) {
      case "menu":
        return <MenuPage />;
      case "login":
        return <LoginPage />;
      case "home":
      default:
        return <HomePage />;
    }
  }, [currentPage]);

  const contextValue: AppContextType = {
    settings: appSettings,
    toggleTheme,
    currentPage,
    navigateTo,
    currentUser,
    logout: handleLogout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`App ${appSettings.theme}-theme`}>
        {renderPage()}
        <Cart />
      </div>
    </AppContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider
        currentUserName="Customer"
        currentUserEmail="customer@example.com"
      >
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
