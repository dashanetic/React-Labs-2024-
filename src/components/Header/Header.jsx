import { useState } from "react";
import { navItems } from "../../data/headerData.js";
import companyLogo from "../../assets/icons/logo.svg";
import cartIcon from "../../assets/icons/cart.svg";
import styles from "./Header.module.css";

function Header() {
  const [menuExpanded, setMenuExpanded] = useState(false);

  const handleMenuToggle = () => {
    setMenuExpanded(!menuExpanded);
  };

  const activePageName = "Menu";

  const createNavigationLinks = () => {
    return navItems.map((navLink, itemIndex) => (
      <span
        key={`nav-item-${itemIndex}`}
        className={`${styles.navItem} ${
          navLink.label === activePageName ? styles.activeNavItem : ""
        }`}
      >
        {navLink.label}
      </span>
    ));
  };

  return (
    <header className={styles.appHeader}>
      <a href="/" className={styles.logoLink} aria-label="Homepage">
        <img
          src={companyLogo}
          alt="Company Logo"
          className={styles.logoIcon}
          loading="lazy"
        />
      </a>

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
          <span className={styles.cartCounter}>1</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
