import React from "react";
import PropTypes from "prop-types";
import Item from "@/components/ListContainer/Item/Item";
import menuItems from "@/data/menuItems";
import styles from "./List.module.css";

const List = () => {
    if (!menuItems || menuItems.length === 0) {
        return <p className={styles.noItems}>No items available.</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {menuItems.map((item) => (
                    <Item key={item.id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    );
};

List.propTypes = {
    selectedCategory: PropTypes.string,
};

export default List;
