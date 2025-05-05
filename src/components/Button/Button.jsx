import styles from "./Button.module.css";

function Button({ children, isActive = true, onClick, type = "button" }) {
  const computedButtonStyles = `${styles.button} ${
    !isActive ? styles.inactive : ""
  }`;

  const handleButtonClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={computedButtonStyles}
      onClick={handleButtonClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
