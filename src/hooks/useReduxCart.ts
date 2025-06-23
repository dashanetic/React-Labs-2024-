import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartItemQuantity as updateCartItemQuantityAction,
  clearCart as clearCartAction,
  toggleCart as toggleCartAction,
  resetOrderState,
  submitOrder,
} from "../redux/slices/cartSlice";
import {
  selectCartItems,
  selectIsCartOpen,
  selectIsSubmittingOrder,
  selectOrderSubmitted,
  selectOrderError,
  selectCartTotal,
} from "../redux/selectors";
import { useCreateOrder } from "../services/ApiHookService";
import { Meal } from "../types/api/types";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { createOrder } = useCreateOrder();

  const cart = useAppSelector(selectCartItems);
  const isCartOpen = useAppSelector(selectIsCartOpen);
  const isSubmittingOrder = useAppSelector(selectIsSubmittingOrder);
  const orderSubmitted = useAppSelector(selectOrderSubmitted);
  const orderError = useAppSelector(selectOrderError);

  const addToCart = useCallback(
    (item: Meal, quantity: number = 1) => {
      console.log("Adding to cart:", { item: item.name, quantity });
      dispatch(addToCartAction({ item, quantity }));
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      dispatch(removeFromCartAction(itemId));
    },
    [dispatch]
  );

  const updateCartItemQuantity = useCallback(
    (itemId: string, newQuantity: number) => {
      dispatch(updateCartItemQuantityAction({ itemId, newQuantity }));
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  const toggleCart = useCallback(() => {
    dispatch(toggleCartAction());
  }, [dispatch]);

  const calculateTotal = useAppSelector(selectCartTotal);

  const submitOrderHandler = useCallback(
    async (customerData?: {
      name: string;
      email: string;
      phone: string;
      address: string;
    }) => {
      if (cart.length === 0) return;

      const defaultCustomerData = {
        name: customerData?.name || "Customer",
        email: customerData?.email || "customer@example.com",
        phone: customerData?.phone || "+7999999999",
        address: customerData?.address || "Address",
      };

      try {
        await dispatch(
          submitOrder({
            items: cart,
            customerData: defaultCustomerData,
            createOrderFn: createOrder,
          })
        ).unwrap();

        setTimeout(() => {
          dispatch(resetOrderState());
        }, 3000);
      } catch (error) {
        console.error("Failed to submit order:", error);
      }
    },
    [cart, dispatch, createOrder]
  );

  return {
    cart,
    isCartOpen,
    isSubmittingOrder,
    orderSubmitted,
    orderError,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    calculateTotal,
    toggleCart,
    submitOrder: submitOrderHandler,
  };
};
