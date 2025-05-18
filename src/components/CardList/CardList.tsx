import React from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import { Meal } from "../../types/api/types";

interface CardListProps {
  cards: Meal[];
}

const CardList: React.FC<CardListProps> = ({ cards = [] }) => {
  // Отрисовка элементов меню
  const renderMenuItems = (): JSX.Element[] => {
    return cards.map((menuItem, index) => (
      <Card
        key={`${menuItem.name}-${index}`}
        id={menuItem.id}
        name={menuItem.name}
        price={menuItem.price}
        description={menuItem.description}
        image={menuItem.image}
        category={menuItem.category}
      />
    ));
  };

  return <div className={styles.cardList}>{renderMenuItems()}</div>;
};

export default CardList;
