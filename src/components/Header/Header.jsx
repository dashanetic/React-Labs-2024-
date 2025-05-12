import { useState, useEffect, useContext } from "react";
import { navItems } from "../../data/headerData.js";
import companyLogo from "../../assets/icons/logo.svg";
import cartIcon from "../../assets/icons/cart.svg";
import styles from "./Header.module.css";
import { AppContext } from "../../App.jsx";

function Header() {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { currentPage, navigateTo } = useContext(AppContext);

  const incrementCartCount = (quantity = 1) => {
    setCartItemCount((prevCount) => prevCount + quantity);
  };

  const handleMenuToggle = () => {
    setMenuExpanded((prevState) => !prevState);
  };

  const createNavigationLinks = () => {
    return navItems.map((navLink, itemIndex) => (
      <span
        key={`nav-item-${itemIndex}`}
        className={`${styles.navItem} ${
          (navLink.label === "Home" && currentPage === "home") ||
          (navLink.label === "Menu" && currentPage === "menu")
            ? styles.activeNavItem
            : ""
        }`}
        onClick={() => {
          if (navLink.label === "Home") {
            navigateTo("home");
          } else if (navLink.label === "Menu") {
            navigateTo("menu");
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
}

export default Header;
