import { Component } from "react";
import styles from "./Button.module.css";

class Button extends Component {
  handleButtonClick = (event) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const { children, isActive = true, type = "button" } = this.props;

    const computedButtonStyles = `${styles.button} ${
      !isActive ? styles.inactive : ""
    }`;

    return (
      <button
        className={computedButtonStyles}
        onClick={this.handleButtonClick}
        type={type}
      >
        {children}
      </button>
    );
  }
}

export default Button;
