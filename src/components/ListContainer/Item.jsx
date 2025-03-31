import PropTypes from "prop-types";
import { itemStyles } from "./styles";

const Item = ({ item }) => {
  return <li style={itemStyles}>{item}</li>;
};

// add props for fix error
Item.propTypes = {
  item: PropTypes.string.isRequired,
};

export default Item;
