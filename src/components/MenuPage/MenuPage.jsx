import { useState } from "react";
import Button from "@/components/Button/Button";
import List from "@/components/ListContainer/List/List";
import styles from "./MenuPage.module.css";

const categories = ["Desert", "Dinner", "Breakfast"];

const MenuPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className={styles.menuPage}>
            <h1 className={styles.title}>Browse our menu</h1>
            <p className={styles.description}>
                Use our menu to place an order online, or{" "}
                <a href="tel:+37063288628" className={styles.phoneTooltip}>
                    phone
                    <span className={styles.tooltipText}>+370 632 88628</span>
                </a>{" "}
                our store to place a pickup order. Fast and fresh food.
            </p>

            <div className={styles.buttonRow}>
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => selectCategory(category)}
                        className={selectedCategory === category ? "active" : ""}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <List selectedCategory={selectedCategory} />
            <Button className={styles.seeMore}>See more</Button>
        </div>
    );
};

export default MenuPage;
