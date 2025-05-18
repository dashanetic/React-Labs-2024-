import React, { useState, useEffect, useMemo, useCallback } from "react";
import Button from "../Button/Button";
import CardList from "../CardList/CardList";
import { useMeals } from "../../services/ApiHookService";
import styles from "./Menu.module.css";
import { Meal, ApiMealResponse } from "../../services/ApiService";

import burgerClassic from "../../assets/images/Burger_Classic.png";
import burgerDreams from "../../assets/images/Burger_Dreams.png";

interface ProcessedMeal extends Meal {
  name: string;
  description: string;
  image: string;
  category: string;
}

const Menu: React.FC = () => {
  // Используем useMemo для создания массива fallbackImages, чтобы избежать пересоздания на каждом рендере
  const fallbackImages = useMemo(() => [burgerClassic, burgerDreams], []);
  const inactiveCategories: string[] = [];

  const {
    meals: mealsData,
    loading: isLoading,
    error: fetchError,
    refreshMeals,
  } = useMeals();

  const [menuItems, setMenuItems] = useState<ProcessedMeal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState<number>(6);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  const switchCategory = useCallback((category: string): void => {
    setSelectedCategory(category);
    setDisplayLimit(6);
  }, []);

  const loadMoreItems = useCallback((): void => {
    setDisplayLimit((prev) => prev + 6);
  }, []);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to load menu items. Please try again later.");
      return;
    }

    if (!mealsData) return;

    // Корректно типизированные данные, используем ApiMealResponse
    const processedData: ProcessedMeal[] = mealsData.map((meal, index) => {
      const apiMeal = meal as unknown as ApiMealResponse;
      return {
        ...meal,
        name: apiMeal.meal || `Dish ${index + 1}`,
        description: apiMeal.instructions || "No description available",
        image: apiMeal.img || fallbackImages[index % fallbackImages.length],
        category: apiMeal.category || "Other",
      };
    });

    setMenuItems(processedData);

    const categories: string[] = [
      ...new Set(
        processedData
          .filter((dish) => dish.category)
          .map((dish) => dish.category)
      ),
    ];

    setUniqueCategories(categories);
  }, [mealsData, fetchError, fallbackImages]);

  useEffect(() => {
    if (uniqueCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(uniqueCategories[0]);
    }
  }, [uniqueCategories, selectedCategory]);

  const filteredDishes = useMemo((): ProcessedMeal[] => {
    if (!selectedCategory) return [];
    return menuItems.filter((dish) => dish.category === selectedCategory);
  }, [menuItems, selectedCategory]);

  const dishesToDisplay = useMemo((): ProcessedMeal[] => {
    return filteredDishes.slice(0, displayLimit);
  }, [filteredDishes, displayLimit]);

  const hasMoreDishes = filteredDishes.length > displayLimit;

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
        <Button onClick={refreshMeals}>Try Again</Button>
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
        {uniqueCategories.map((category) => {
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

      {dishesToDisplay.length > 0 ? (
        <CardList cards={dishesToDisplay} />
      ) : (
        <p className={styles.noItemsMessage}>
          No items available for this category.
        </p>
      )}

      {hasMoreDishes && <Button onClick={loadMoreItems}>See more</Button>}
    </section>
  );
};

export default Menu;