import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../data/headerData";
import companyLogo from "../../assets/icons/logo.svg";
import cartIcon from "../../assets/icons/cart.svg";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useReduxAuth";
import { selectCartItemsCount } from "../../redux/selectors";
import { useAppSelector } from "../../redux/hooks";
import Button from "../Button/Button";
import { useCart } from "../../hooks/useReduxCart";
import ThemeSwitcher from "./ThemeSwitcher";

const Header: React.FC = () => {
  const [menuExpanded, setMenuExpanded] = useState<boolean>(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const cartItemCount = useAppSelector(selectCartItemsCount);
  const { clearCart } = useCart();

  const handleMenuToggle = (): void => {
    setMenuExpanded((prevState) => !prevState);
  };

  const handleLogout = (): void => {
    clearCart();
    logout();
  };

  const getRoutePath = (label: string): string => {
    switch (label) {
      case "Home":
        return "/";
      case "Menu":
        return "/menu";
      case "Login":
        return "/login";
      default:
        return "/";
    }
  };

  const isActiveRoute = (label: string): boolean => {
    const routePath = getRoutePath(label);
    return location.pathname === routePath;
  };

  const createNavigationLinks = (): JSX.Element[] => {
    return navItems.map((navLink, itemIndex) => (
      <Link
        key={`nav-item-${itemIndex}`}
        to={getRoutePath(navLink.label)}
        className={`${styles.navItem} ${
          isActiveRoute(navLink.label) ? styles.activeNavItem : ""
        }`}
        onClick={() => setMenuExpanded(false)}
      >
        {navLink.label}
      </Link>
    ));
  };

  return (
    <header className={styles.appHeader}>
      <Link to="/" className={styles.logoLink} aria-label="Homepage">
        <img
          src={companyLogo}
          alt="Company Logo"
          className={styles.logoIcon}
          loading="lazy"
        />
      </Link>

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

        <div style={{ margin: "1rem 0" }}>
          <ThemeSwitcher />
        </div>

        {currentUser && (
          <div className={styles.userContainer}>
            <Link
              to="/order"
              className={`${styles.navItem} ${
                location.pathname === "/order" ? styles.activeNavItem : ""
              }`}
              onClick={() => setMenuExpanded(false)}
            >
              Order
            </Link>
            <span className={styles.userName}>{currentUser.name}</span>
            <Button onClick={handleLogout} aria-label="Logout">
              Logout
            </Button>
          </div>
        )}

        <Link to="/order" className={styles.cartIconContainer}>
          <img
            src={cartIcon}
            alt="Shopping Cart"
            className={styles.cartIcon}
            loading="lazy"
          />
          {cartItemCount > 0 && (
            <span className={styles.cartCounter}>{cartItemCount}</span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
