import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { initializeAuth } from "./redux/slices/authSlice";
import { selectAuthLoading, selectTheme } from "./redux/selectors";

// Компонент для защищенных маршрутов
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (!currentUser) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`App ${theme}-theme`}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
