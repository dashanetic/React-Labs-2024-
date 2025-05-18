import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./Card.module.css";
import burgerClassic from "../../assets/images/Burger_Classic.png";

// Расширяем глобальный Window интерфейс для поддержки incrementCartCount
declare global {
  interface Window {
    incrementCartCount?: (quantity: number) => void;
  }
}

interface CardProps {
  name: string;
  description: string;
  image: string;
  price: number;
}

const Card: React.FC<CardProps> = (props) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);

  const { name, description, image, price } = props;
  const fallbackImage = burgerClassic;

  const handleItemQuantity = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.target.value, 10) || 1;
    setQuantity(value);
  };

  const displayFormattedPrice = (value: number): string => {
    return `$ ${value.toFixed(2)} USD`;
  };

  const handleImageError = (): void => {
    setImageError(true);
  };

  const toggleDescription = (): void => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  const handleAddToCart = (): void => {
    if (window.incrementCartCount) {
      window.incrementCartCount(quantity);
    }
    console.log(`Added ${quantity} item(s) to cart`);
  };

  const renderHeader = (): JSX.Element => {
    return (
      <header className={styles.cardHeader}>
        <h3 className={styles.cardName}>{name}</h3>
        <div className={styles.cardPrice}>{displayFormattedPrice(price)}</div>
      </header>
    );
  };

  const renderFooter = (): JSX.Element => (
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
};

export default Card;