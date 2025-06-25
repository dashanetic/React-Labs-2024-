import React from "react";
import { useTheme } from "../../theme-context";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={styles["theme-switcher-btn"]}
      onClick={toggleTheme}
      aria-label="Switch theme"
    >
      <span
        className={styles["theme-switcher-icon"]}
        style={{
          transform: theme === "dark" ? "rotate(-20deg)" : "rotate(0deg)",
        }}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
};

export default ThemeSwitcher;
