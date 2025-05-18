import React, { useState, useEffect, useContext } from "react";
import { navItems } from "../../data/headerData";
import companyLogo from "../../assets/icons/logo.svg";
import cartIcon from "../../assets/icons/cart.svg";
import styles from "./Header.module.css";
import { AppContext } from "../../App";
import { AppContextType } from "../../types/appContext";

// Расширяем глобальный Window интерфейс для поддержки incrementCartCount
declare global {
  interface Window {
    incrementCartCount?: (quantity: number) => void;
  }
}

const Header: React.FC = () => {
  const [menuExpanded, setMenuExpanded] = useState<boolean>(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const { currentPage, navigateTo, currentUser, logout } = useContext<AppContextType>(AppContext);

  const incrementCartCount = (quantity: number = 1): void => {
    setCartItemCount((prevCount) => prevCount + quantity);
  };

  const handleMenuToggle = (): void => {
    setMenuExpanded((prevState) => !prevState);
  };

  const handleLogout = (): void => {
    logout();
  };

  const createNavigationLinks = (): JSX.Element[] => {
    return navItems.map((navLink, itemIndex) => (
      <span
        key={`nav-item-${itemIndex}`}
        className={`${styles.navItem} ${
          (navLink.label === "Home" && currentPage === "home") ||
          (navLink.label === "Menu" && currentPage === "menu") ||
          (navLink.label === "Login" && currentPage === "login")
            ? styles.activeNavItem
            : ""
        }`}
        onClick={() => {
          if (navLink.label === "Home") {
            navigateTo("home");
          } else if (navLink.label === "Menu") {
            navigateTo("menu");
          } else if (navLink.label === "Login") {
            navigateTo("login");
          }
          setMenuExpanded(false); // Закрываем мобильное меню при клике
        }}
        style={{ cursor: "pointer" }}
      >
        {navLink.label}
      </span>
    ));
  };

  useEffect(() => {
    window.incrementCartCount = incrementCartCount;

    return () => {
      delete window.incrementCartCount;
    };
  }, []);

  return (
    <header className={styles.appHeader}>
      <div
        className={styles.logoLink}
        aria-label="Homepage"
        style={{ cursor: "pointer" }}
        onClick={() => navigateTo("home")}
      >
        <img
          src={companyLogo}
          alt="Company Logo"
          className={styles.logoIcon}
          loading="lazy"
        />
      </div>

      <button
        className={styles.burgerMenu}
        onClick={handleMenuToggle}
        aria-label="Toggle navigation menu"
        aria-expanded={menuExpanded}
      >
        ☰
      </button>

      <nav
        className={`${styles.navContainer} ${
          menuExpanded ? styles.showMenu : ""
        }`}
      >
        <button
          className={styles.closeMenuButton}
          onClick={handleMenuToggle}
          aria-label="Close navigation menu"
        >
          ✖
        </button>

        <div className={styles.navLinks}>{createNavigationLinks()}</div>

        {/* User Profile Section */}
        {currentUser && (
          <div className={styles.userContainer}>
            <span className={styles.userName}>{currentUser.name}</span>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
              aria-label="Logout"
            >
              Выйти
            </button>
          </div>
        )}

        <div className={styles.cartIconContainer}>
          <img
            src={cartIcon}
            alt="Shopping Cart"
            className={styles.cartIcon}
            loading="lazy"
          />
          {cartItemCount > 0 && (
            <span className={styles.cartCounter}>{cartItemCount}</span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;