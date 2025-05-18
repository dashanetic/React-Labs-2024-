import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isActive = true,
  type = "button",
  onClick,
  ...rest
}) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
};

export default Button;