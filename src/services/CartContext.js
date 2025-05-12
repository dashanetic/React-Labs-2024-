import { createContext } from "react";

const CartContext = createContext({
  cartItemCount: 0,
  addToCart: () => {},
});

export default CartContext;
