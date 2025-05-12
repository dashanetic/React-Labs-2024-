import { useState, useEffect, useCallback } from "react";
import Button from "../Button/Button.jsx";
import CardList from "../CardList/CardList.jsx";
import ApiService from "../../services/ApiService.js";
import styles from "./Menu.module.css";

import burgerClassic from "../../assets/images/Burger_Classic.png";
import burgerDreams from "../../assets/images/Burger_Dreams.png";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(6);

  const fallbackImages = [burgerClassic, burgerDreams];
  const inactiveCategories = [];

  const fetchMenuItems = useCallback(async () => {
    try {
      const mealsData = await ApiService.getMeals();

      const processedData = mealsData.map((meal, index) => {
        return {
          ...meal,
          name: meal.meal || `Dish ${index + 1}`,
          description: meal.instructions || "No description available",
          image: meal.img || fallbackImages[index % fallbackImages.length],
          category: meal.category || "Other",
        };
      });

      setMenuItems(processedData);
      setIsLoading(false);

      const categories = collectUniqueCategories(processedData);
      if (categories.length > 0) {
        setSelectedCategory(categories[0]);
      }
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      setError("Failed to load menu items. Please try again later.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  useEffect(() => {
    if (selectedCategory) {
      setDisplayLimit(6);
    }
  }, [selectedCategory]);

  const collectUniqueCategories = (items = menuItems) => {
    return [
      ...new Set(
        items.filter((dish) => dish.category).map((dish) => dish.category)
      ),
    ];
  };

  const switchCategory = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const loadMoreItems = () => {
    setDisplayLimit((prevLimit) => prevLimit + 6);
  };

  const getDishesForCategory = () => {
    return selectedCategory
      ? menuItems.filter((dish) => dish.category === selectedCategory)
      : [];
  };

  const menuCategories = collectUniqueCategories();
  const allCategoryDishes = getDishesForCategory();
  const currentDishes = allCategoryDishes.slice(0, displayLimit);
  const hasMoreItems = allCategoryDishes.length > displayLimit;

  if (isLoading) {
    return (
      <section className={styles.menuSection}>
        <h1 className={styles.title}>Loading menu...</h1>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.menuSection}>
        <h1 className={styles.title}>Error</h1>
        <p className={styles.error}>{error}</p>
        <Button onClick={fetchMenuItems}>Try Again</Button>
      </section>
    );
  }

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
        {menuCategories.map((category) => {
          const isInactive = inactiveCategories.includes(category);

          return (
            <Button
              key={category}
              onClick={isInactive ? undefined : () => switchCategory(category)}
              isActive={selectedCategory === category}
              disabled={isInactive}
              style={
                isInactive ? { cursor: "not-allowed", opacity: "0.7" } : {}
              }
            >
              {category} {isInactive && "(Coming soon)"}
            </Button>
          );
        })}
      </div>

      {currentDishes.length > 0 ? (
        <CardList cards={currentDishes} />
      ) : (
        <p className={styles.noItemsMessage}>
          No items available for this category.
        </p>
      )}

      {hasMoreItems && <Button onClick={loadMoreItems}>See more</Button>}
    </section>
  );
}

export default Menu;
