import React from "react";
import styles from "./Button.module.css";

function Button({
  children,
  isActive = true,
  type = "button",
  onClick,
  ...rest
}) {
  const handleButtonClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  const computedButtonStyles = `${styles.button} ${
    !isActive ? styles.inactive : ""
  }`;

  return (
    <button
      className={computedButtonStyles}
      onClick={handleButtonClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
