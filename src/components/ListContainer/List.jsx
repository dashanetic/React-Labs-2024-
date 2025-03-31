import PropTypes from "prop-types";
import Item from "./Item";
import { listStyles } from "./styles";

const List = ({ items }) => {
  return (
    <ul style={listStyles}>
      {items.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </ul>
  );
};

// add props for fix error
List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default List;
