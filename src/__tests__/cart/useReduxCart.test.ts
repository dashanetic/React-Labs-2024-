import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../redux/slices/cartSlice";
import { useCart } from "../../hooks/useReduxCart";
import { Meal } from "../../types/api/types";

const getWrapper = () => {
  const store = configureStore({ reducer: { cart: cartReducer } });
  return function Wrapper(props: { children: React.ReactNode }) {
    return React.createElement(Provider, { store, children: props.children });
  };
};

describe("useCart", () => {
  const meal: Meal = {
    id: "1",
    name: "Test Meal",
    price: 10,
    description: "desc",
    category: "cat",
    image: "img.png",
  };

  it("should add item to cart", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(meal, 2);
    });
    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  it("should remove item from cart", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(meal, 1);
      result.current.removeFromCart(meal.id);
    });
    expect(result.current.cart.length).toBe(0);
  });

  it("should clear cart", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(meal, 1);
      result.current.clearCart();
    });
    expect(result.current.cart.length).toBe(0);
  });
});
