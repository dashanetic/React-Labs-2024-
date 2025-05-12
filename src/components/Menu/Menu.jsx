import { Component } from "react";
import Button from "../Button/Button.jsx";
import CardList from "../CardList/CardList.jsx";
import ApiService from "../../services/ApiService.js";
import styles from "./Menu.module.css";

import burgerClassic from "../../assets/images/Burger_Classic.png";
import burgerDreams from "../../assets/images/Burger_Dreams.png";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: [],
      selectedCategory: null,
      isLoading: true,
      error: null,
      displayLimit: 6,
    };

    this.fallbackImages = [burgerClassic, burgerDreams];
  }

  componentDidMount() {
    this.fetchMenuItems();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCategory !== this.state.selectedCategory) {
      this.setState({ displayLimit: 6 });
    }
  }

  fetchMenuItems = async () => {
    try {
      const mealsData = await ApiService.getMeals();

      const processedData = mealsData.map((meal, index) => {
        return {
          ...meal,
          name: meal.meal || `Dish ${index + 1}`, // API использует поле 'meal' для названия
          description: meal.instructions || "No description available", // API использует 'instructions' для описания
          image:
            meal.img || this.fallbackImages[index % this.fallbackImages.length], // API использует 'img' для изображения
          category: meal.category || "Other",
        };
      });

      this.setState(
        {
          menuItems: processedData,
          isLoading: false,
        },
        () => {
          const categories = this.collectUniqueCategories();
          if (categories.length > 0) {
            this.setState({ selectedCategory: categories[0] });
          }
        }
      );
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      this.setState({
        error: "Failed to load menu items. Please try again later.",
        isLoading: false,
      });
    }
  };

  collectUniqueCategories = () => {
    return [
      ...new Set(
        this.state.menuItems
          .filter((dish) => dish.category)
          .map((dish) => dish.category)
      ),
    ];
  };

  switchCategory = (newCategory) => {
    this.setState({ selectedCategory: newCategory });
  };

  loadMoreItems = () => {
    this.setState((prevState) => ({
      displayLimit: prevState.displayLimit + 6,
    }));
  };

  getDishesForCategory = () => {
    const { selectedCategory, menuItems } = this.state;
    return selectedCategory
      ? menuItems.filter((dish) => dish.category === selectedCategory)
      : [];
  };

  render() {
    const { selectedCategory, isLoading, error, displayLimit } = this.state;
    const menuCategories = this.collectUniqueCategories();
    const allCategoryDishes = this.getDishesForCategory();

    const inactiveCategories = ["Dessert", "Dinner", "Breakfast"];

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
          <Button onClick={this.fetchMenuItems}>Try Again</Button>
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
                onClick={
                  isInactive ? undefined : () => this.switchCategory(category)
                }
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

        {hasMoreItems && <Button onClick={this.loadMoreItems}>See more</Button>}
      </section>
    );
  }
}

export default Menu;
