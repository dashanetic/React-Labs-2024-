import PropTypes from "prop-types";
import styles from "./CardItem.module.css";
import Button from "@/components/Button/Button";

const CardItem = ({ name, price, image }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} className={styles.image} />
            <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{name}</h3>
                <p className={styles.cardPrice}>${price.toFixed(2)} USD</p>
                <div className={styles.cardActions}>
                    <input type="number" defaultValue={1} className={styles.quantityInput} />
                    <Button className="addToCart">Add to Cart</Button>
                </div>
            </div>
        </div>
    );
};

CardItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
};

export default CardItem;
