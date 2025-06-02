import React from "react";
import Button from "../Button/Button";
import { useCart } from "../../hooks/useReduxCart";
import { CartItem } from "../../redux/slices/cartSlice";
import styles from "./Cart.module.css";

const Cart: React.FC = () => {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    calculateTotal,
    submitOrder,
    isSubmittingOrder,
    orderSubmitted,
    orderError,
  } = useCart();

  if (!isCartOpen) {
    return null;
  }

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)} USD`;
  };

  const renderEmptyCart = () => (
    <div className={styles.emptyCart}>
      <p>Your cart is empty</p>
      <Button onClick={toggleCart}>Continue Shopping</Button>
    </div>
  );

  const renderOrderSubmitted = () => (
    <div className={styles.orderSubmitted}>
      <p className={styles.successMessage}>
        Your order has been submitted successfully!
      </p>
      <Button onClick={toggleCart}>Close</Button>
    </div>
  );

  const renderOrderError = () => (
    <div className={styles.orderError}>
      <p className={styles.errorMessage}>{orderError}</p>
      <Button onClick={() => submitOrder()}>Try Again</Button>
      <Button onClick={toggleCart}>Close</Button>
    </div>
  );

  const renderCartItems = () => (
    <>
      <div className={styles.cartItems}>
        {cart.map((item: CartItem) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.itemDetails}>
              <h4>{item.name}</h4>
              <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
            </div>
            <div className={styles.itemControls}>
              <button
                className={styles.quantityButton}
                onClick={() =>
                  updateCartItemQuantity(item.id, item.quantity - 1)
                }
              >
                -
              </button>
              <span className={styles.quantity}>{item.quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() =>
                  updateCartItemQuantity(item.id, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item.id)}
              >
                &times;
              </button>
            </div>
            <div className={styles.itemTotal}>
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartSummary}>
        <div className={styles.cartTotal}>
          <span>Total:</span>
          <span className={styles.totalPrice}>
            {formatPrice(calculateTotal)}
          </span>
        </div>
        <div className={styles.cartActions}>
          <Button onClick={clearCart}>Clear Cart</Button>
          <Button onClick={() => submitOrder()} disabled={isSubmittingOrder}>
            {isSubmittingOrder ? "Processing..." : "Checkout"}
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.cartOverlay}>
      <div className={styles.cartContent}>
        <div className={styles.cartHeader}>
          <h3>Your Cart</h3>
          <button className={styles.closeButton} onClick={toggleCart}>
            &times;
          </button>
        </div>

        <div className={styles.cartBody}>
          {cart.length === 0
            ? renderEmptyCart()
            : orderSubmitted
            ? renderOrderSubmitted()
            : orderError
            ? renderOrderError()
            : renderCartItems()}
        </div>
      </div>
    </div>
  );
};

export default Cart;
