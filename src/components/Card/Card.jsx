import Button from "../Button/Button.jsx";
import styles from "./Card.module.css";

const Card = (props) => {
  const { name, price, description, image } = props;

  const handleItemQuantity = (_evt) => {};

  const displayFormattedPrice = (value) => {
    return `$ ${value.toFixed(2)} USD`;
  };

  const renderHeader = () => (
    <header className={styles.cardHeader}>
      <h3 className={styles.cardName}>{name}</h3>
      <div className={styles.cardPrice}>{displayFormattedPrice(price)}</div>
    </header>
  );

  const renderFooter = () => (
    <footer className={styles.cardActions}>
      <input
        type="number"
        defaultValue="1"
        min="1"
        max="10"
        className={styles.quantityInput}
        aria-label="Quantity"
        onChange={handleItemQuantity}
      />
      <Button>Add to cart</Button>
    </footer>
  );

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={`${name} dish`} loading="lazy" />
      </div>

      <div className={styles.cardContent}>
        {renderHeader()}
        <p className={styles.cardDescription}>{description}</p>
        {renderFooter()}
      </div>
    </article>
  );
};

export default Card;
