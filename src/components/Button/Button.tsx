import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  wide?: boolean;
  rect?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isActive = true,
  wide = false,
  rect = false,
  type = "button",
  ...rest
}) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const computedButtonStyles = `${styles.button} ${
    !isActive ? styles.inactive : ""
  } ${wide ? styles.wide : ""} ${rect ? styles.rect : ""}`;

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

export default React.memo(Button);
