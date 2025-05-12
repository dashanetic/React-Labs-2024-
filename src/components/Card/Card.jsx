import { useState } from "react";
import Button from "../Button/Button.jsx";
import styles from "./Card.module.css";
import burgerClassic from "../../assets/images/Burger_Classic.png";

function Card(props) {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { name, description, image, price } = props;
  const fallbackImage = burgerClassic;

  const handleItemQuantity = (evt) => {
    const value = parseInt(evt.target.value, 10) || 1;
    setQuantity(value);
  };

  const displayFormattedPrice = (value) => {
    return `$ ${value.toFixed(2)} USD`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  const handleAddToCart = () => {
    if (window.incrementCartCount) {
      window.incrementCartCount(quantity);
    }
    console.log(`Added ${quantity} item(s) to cart`);
  };

  const renderHeader = () => {
    return (
      <header className={styles.cardHeader}>
        <h3 className={styles.cardName}>{name}</h3>
        <div className={styles.cardPrice}>{displayFormattedPrice(price)}</div>
      </header>
    );
  };

  const renderFooter = () => (
    <footer className={styles.cardActions}>
      <input
        type="number"
        value={quantity}
        min="1"
        max="10"
        className={styles.quantityInput}
        aria-label="Quantity"
        onChange={handleItemQuantity}
      />
      <Button onClick={handleAddToCart}>Add to cart</Button>
    </footer>
  );

  const needsToggleButton = description && description.length > 100;

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={imageError ? fallbackImage : image}
          alt={`${name} dish`}
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      <div className={styles.cardContent}>
        {renderHeader()}

        <p
          className={`${styles.cardDescription} ${
            isDescriptionExpanded
              ? styles.expandedDescription
              : styles.truncatedDescription
          }`}
        >
          {description}
        </p>

        {needsToggleButton && (
          <button
            className={styles.toggleButton}
            onClick={toggleDescription}
            aria-expanded={isDescriptionExpanded}
          >
            {isDescriptionExpanded ? "See less" : "See more"}
          </button>
        )}

        {renderFooter()}
      </div>
    </article>
  );
}

export default Card;
