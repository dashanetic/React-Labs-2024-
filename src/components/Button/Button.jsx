import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ children, onClick, isActive, type = "button", className = "" }) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${isActive ? styles.active : ""} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
    type: PropTypes.string,
    className: PropTypes.string,
};

export default Button;
