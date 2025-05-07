import { useState } from "react";
import Button from "../Button/Button.jsx";
import CardList from "../CardList/CardList.jsx";
import menuItems from "../../data/menuItems.js";
import styles from "./Menu.module.css";

function Menu() {
  const collectUniqueCategories = () => {
    return [
      ...new Set(
        menuItems.filter((dish) => dish.category).map((dish) => dish.category)
      ),
    ];
  };

  const menuCategories = collectUniqueCategories();

  const [selectedCategory, setSelectedCategory] = useState(
    menuCategories.length > 0 ? menuCategories[0] : null
  );

  function switchCategory(newCategory) {
    setSelectedCategory(newCategory);
  }

  const getDishesForCategory = () => {
    return selectedCategory
      ? menuItems.filter((dish) => dish.category === selectedCategory)
      : [];
  };

  const currentDishes = getDishesForCategory();

  return (
    <section className={styles.menuSection}>
      <h1 className={styles.title}>Browse our menu</h1>
      <p className={styles.description}>
        <span>Use our menu to place an order online, or </span>
        <a href="tel:+79998084551" className={styles.phoneTooltip}>
          phone
          <span className={styles.tooltipText}>+7 (999) 808-4551</span>
        </a>
        <span> our store to place a pickup order. Fast and fresh food.</span>
      </p>

      <div className={styles.buttonRow}>
        {menuCategories.map((category) => (
          <Button
            key={category}
            onClick={() => switchCategory(category)}
            isActive={selectedCategory === category}
          >
            {category}
          </Button>
        ))}
      </div>

      {currentDishes.length > 0 ? (
        <CardList cards={currentDishes} />
      ) : (
        <p className={styles.noItemsMessage}>No items available.</p>
      )}

      <Button>See more</Button>
    </section>
  );
}

export default Menu;
