import React from "react";
import PropTypes from "prop-types";
import CardItem from "./CardItem";
import styles from "./CardList.module.css";

const CardList = ({ items }) => {
    if (!items || items.length === 0) {
        return <p className={styles.noItems}>No items available.</p>;
    }

    return (
        <div className={styles.cardList}>
            {items.map((item) => (
                <CardItem key={item.id} name={item.name} price={item.price} image={item.image} />
            ))}
        </div>
    );
};

CardList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CardList;
