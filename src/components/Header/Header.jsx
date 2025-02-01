import { useState } from "react";
import styles from "./Header.module.css";
import logoIcon from "@/assets/icons/logo.svg";
import cartIcon from "@/assets/icons/cart.svg";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.appHeader}>
            {/* Логотип */}
            <a href="/" className={styles.logoLink}>
                <img src={logoIcon} alt="Logo" className={styles.logoIcon} />
            </a>

            {/* Бургер-меню для мобильных устройств */}
            <button className={styles.burgerMenu} onClick={toggleMenu}>
                ☰
            </button>

            {/* Навигация */}
            <nav className={`${styles.navContainer} ${menuOpen ? styles.showMenu : ""}`}>
                <button className={styles.closeMenuButton} onClick={toggleMenu}>
                    ✕
                </button>
                <ul className={styles.navLinks}>
                    {["Home", "Menu", "Company", "Login"].map((item) => (
                        <li key={item}>
                            <a href="/" className={styles.navItem}>
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Иконка корзины */}
            <div className={styles.cartIconContainer}>
                <img src={cartIcon} alt="Cart" className={styles.cartIcon} />
                <span className={styles.cartCounter}>0</span>
            </div>
        </header>
    );
};

export default Header;
