import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Item.module.css";
import Button from "@/components/Button/Button";

const Item = ({ name, price, image }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value > 0 ? value : 1); // Минимум 1
    };

    return (
        <div className={styles.item}>
            <img src={image} alt={name} className={styles.image} />
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.price}>${price.toFixed(2)} USD</p>
            <div className={styles.controls}>
                <input
                    type="number"
                    value={quantity}
                    min="1"
                    className={styles.quantityInput}
                    onChange={handleQuantityChange}
                />
                <Button className={styles.addToCart}>Add to Cart</Button>
            </div>
        </div>
    );
};

Item.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
};

export default Item;
