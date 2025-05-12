import { Component } from "react";
import Button from "../Button/Button.jsx";
import styles from "./Card.module.css";
import burgerClassic from "../../assets/images/Burger_Classic.png";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageError: false,
      quantity: 1,
      isDescriptionExpanded: false,
    };
  }

  handleItemQuantity = (evt) => {
    const value = parseInt(evt.target.value, 10) || 1;
    this.setState({ quantity: value });
  };

  displayFormattedPrice = (value) => {
    return `$ ${value.toFixed(2)} USD`;
  };

  handleImageError = () => {
    this.setState({ imageError: true });
  };

  toggleDescription = () => {
    this.setState((prevState) => ({
      isDescriptionExpanded: !prevState.isDescriptionExpanded,
    }));
  };

  handleAddToCart = () => {
    const { quantity } = this.state;

    if (window.incrementCartCount) {
      window.incrementCartCount(quantity);
    }

    console.log(`Added ${quantity} item(s) to cart`);
  };

  renderHeader = () => {
    const { name, price } = this.props;

    return (
      <header className={styles.cardHeader}>
        <h3 className={styles.cardName}>{name}</h3>
        <div className={styles.cardPrice}>
          {this.displayFormattedPrice(price)}
        </div>
      </header>
    );
  };

  renderFooter = () => (
    <footer className={styles.cardActions}>
      <input
        type="number"
        value={this.state.quantity}
        min="1"
        max="10"
        className={styles.quantityInput}
        aria-label="Quantity"
        onChange={this.handleItemQuantity}
      />
      <Button onClick={this.handleAddToCart}>Add to cart</Button>
    </footer>
  );

  render() {
    const { name, description, image } = this.props;
    const { imageError, isDescriptionExpanded } = this.state;
    const fallbackImage = burgerClassic;

    const needsToggleButton = description && description.length > 100; // Примерное значение для определения длинного текста

    return (
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            src={imageError ? fallbackImage : image}
            alt={`${name} dish`}
            loading="lazy"
            onError={this.handleImageError}
          />
        </div>

        <div className={styles.cardContent}>
          {this.renderHeader()}

          {/* Описание с применением классов для ограничения текста */}
          <p
            className={`${styles.cardDescription} ${
              isDescriptionExpanded
                ? styles.expandedDescription
                : styles.truncatedDescription
            }`}
          >
            {description}
          </p>

          {/* Кнопка переключения видимости описания */}
          {needsToggleButton && (
            <button
              className={styles.toggleButton}
              onClick={this.toggleDescription}
              aria-expanded={isDescriptionExpanded}
            >
              {isDescriptionExpanded ? "See less" : "See more"}
            </button>
          )}

          {this.renderFooter()}
        </div>
      </article>
    );
  }
}

export default Card;
