import { Component } from "react";
import { navItems } from "../../data/headerData.js";
import companyLogo from "../../assets/icons/logo.svg";
import cartIcon from "../../assets/icons/cart.svg";
import styles from "./Header.module.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: false,
      cartItemCount: 0,
    };
  }

  componentDidMount() {
    window.incrementCartCount = this.incrementCartCount;
  }

  componentWillUnmount() {
    delete window.incrementCartCount;
  }

  incrementCartCount = (quantity = 1) => {
    this.setState((prevState) => ({
      cartItemCount: prevState.cartItemCount + quantity,
    }));
  };

  handleMenuToggle = () => {
    this.setState((prevState) => ({
      menuExpanded: !prevState.menuExpanded,
    }));
  };

  createNavigationLinks = () => {
    const activePageName = "Menu";

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

  render() {
    const { menuExpanded, cartItemCount } = this.state;

    return (
      <header className={styles.appHeader}>
        {/* Заменяем ссылку логотипа на div с тем же стилем */}
        <div
          className={styles.logoLink}
          aria-label="Homepage"
          style={{ cursor: "default" }}
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
          onClick={this.handleMenuToggle}
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
            onClick={this.handleMenuToggle}
            aria-label="Close navigation menu"
          >
            ✖
          </button>

          <div className={styles.navLinks}>{this.createNavigationLinks()}</div>

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
}

export default Header;
