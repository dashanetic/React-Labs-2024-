import React, { useMemo } from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import { Meal } from "../../types/api/types";

interface CardListProps {
  cards: Meal[];
}

const CardList: React.FC<CardListProps> = ({ cards = [] }) => {
  // Мемоизация элементов меню для предотвращения ненужных перерендеров
  const menuItems = useMemo(() => {
    return cards.map((menuItem) => (
      <Card
        key={menuItem.id || `${menuItem.name}-${menuItem.price}`}
        id={menuItem.id}
        name={menuItem.name}
        price={menuItem.price}
        description={menuItem.description}
        image={menuItem.image}
        category={menuItem.category}
      />
    ));
  }, [cards]);

  return <div className={styles.cardList}>{menuItems}</div>;
};

// Оптимизируем весь компонент с помощью React.memo
export default React.memo(CardList);
