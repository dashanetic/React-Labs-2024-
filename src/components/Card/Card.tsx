import React, { useState, useCallback } from "react";
import Button from "../Button/Button";
import styles from "./Card.module.css";
import burgerClassic from "../../assets/images/Burger_Classic.png";
import { useCart } from "../../services/CartContext";
import { Meal } from "../../types/api/types";

interface CardProps {
  name: string;
  description: string;
  image: string;
  price: number;
  id: string; // Добавляем id для возможности работы с корзиной
  category: string; // Добавляем category, необходимую для интерфейса Meal
}

const Card: React.FC<CardProps> = (props) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);

  const { name, description, image, price, id, category } = props;
  const fallbackImage = burgerClassic;

  // Используем хук useCart для доступа к функциям корзины
  const { addToCart } = useCart();

  // Оптимизируем функции с помощью useCallback
  const handleItemQuantity = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(evt.target.value, 10) || 1;
      setQuantity(value);
    },
    []
  );

  const displayFormattedPrice = useCallback((value: number): string => {
    return `$ ${value.toFixed(2)} USD`;
  }, []);

  const handleImageError = useCallback((): void => {
    setImageError(true);
  }, []);

  const toggleDescription = useCallback((): void => {
    setIsDescriptionExpanded((prev) => !prev);
  }, []);

  const handleAddToCart = useCallback((): void => {
    // Создаем объект товара соответствующий интерфейсу Meal
    const item: Meal = {
      id,
      name,
      description,
      image,
      price,
      category,
    };

    // Используем функцию addToCart из контекста корзины
    addToCart(item, quantity);
    console.log(`Added ${quantity} ${name} to cart`);
  }, [id, name, description, image, price, category, quantity, addToCart]);

  // Оптимизируем функции рендеринга с помощью useCallback
  const renderHeader = useCallback((): JSX.Element => {
    return (
      <header className={styles.cardHeader}>
        <h3 className={styles.cardName}>{name}</h3>
        <div className={styles.cardPrice}>{displayFormattedPrice(price)}</div>
      </header>
    );
  }, [name, price, displayFormattedPrice]);

  const renderFooter = useCallback(
    (): JSX.Element => (
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
    ),
    [quantity, handleItemQuantity, handleAddToCart]
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
