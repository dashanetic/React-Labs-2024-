import Card from "../Card/Card.jsx";
import styles from "./CardList.module.css";

function CardList({ cards = [] }) {
  const renderMenuItems = () => {
    return cards.map((menuItem, index) => (
      <Card
        key={`${menuItem.name}-${index}`}
        name={menuItem.name}
        price={menuItem.price}
        description={menuItem.description}
        image={menuItem.image}
      />
    ));
  };

  return <div className={styles.cardList}>{renderMenuItems()}</div>;
}

export default CardList;
