import "./App.css";
import React, { useEffect, useCallback } from "react";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Cart from "./components/Cart/Cart";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { initializeAuth } from "./redux/slices/authSlice";
import { selectAuthLoading } from "./redux/selectors";
import { selectCurrentPage, selectTheme } from "./redux/selectors";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const currentPage = useAppSelector(selectCurrentPage);
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`App ${theme}-theme`}>
      {renderPage()}
      <Cart />
    </div>
  );
};

export default App;
