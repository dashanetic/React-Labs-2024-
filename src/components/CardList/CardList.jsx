import { Component } from "react";
import Card from "../Card/Card.jsx";
import styles from "./CardList.module.css";

class CardList extends Component {
  renderMenuItems = () => {
    const { cards = [] } = this.props;

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

  render() {
    return <div className={styles.cardList}>{this.renderMenuItems()}</div>;
  }
}

export default CardList;
