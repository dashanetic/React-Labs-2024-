import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../redux/slices/cartSlice";
import { useCart } from "../../hooks/useReduxCart";
import { Meal } from "../../types/api/types";

const getWrapper = () => {
  const store = configureStore({ reducer: { cart: cartReducer } });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  };
};

describe("useCart", () => {
  it("should add item to cart", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "1",
      name: "Test Meal",
      price: 10,
      description: "desc",
      category: "cat",
      image: "img.png",
    };
    act(() => {
      result.current.addToCart(meal, 2);
    });
    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  it("should remove item from cart", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "2",
      name: "Test Meal 2",
      price: 20,
      description: "desc",
      category: "cat",
      image: "img2.png",
    };
    act(() => {
      result.current.addToCart(meal, 1);
      result.current.removeFromCart(meal.id);
    });
    expect(result.current.cart.length).toBe(0);
  });

  it("should clear cart", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "3",
      name: "Test Meal 3",
      price: 30,
      description: "desc",
      category: "cat",
      image: "img3.png",
    };
    act(() => {
      result.current.addToCart(meal, 1);
      result.current.clearCart();
    });
    expect(result.current.cart.length).toBe(0);
  });

  it("should update item quantity in cart", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "4",
      name: "Test Meal 4",
      price: 40,
      description: "desc",
      category: "cat",
      image: "img4.png",
    };
    act(() => {
      result.current.addToCart(meal, 1);
      result.current.updateCartItemQuantity(meal.id, 3);
    });
    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(3);
  });

  it("should toggle cart open/close", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.isCartOpen).toBe(false);
    act(() => {
      result.current.toggleCart();
    });
    expect(result.current.isCartOpen).toBe(true);
    act(() => {
      result.current.toggleCart();
    });
    expect(result.current.isCartOpen).toBe(false);
  });

  it("should remove item if updateCartItemQuantity sets quantity to 0", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "5",
      name: "Test Meal 5",
      price: 50,
      description: "desc",
      category: "cat",
      image: "img5.png",
    };
    act(() => {
      result.current.addToCart(meal, 1);
      result.current.updateCartItemQuantity(meal.id, 0);
    });
    expect(result.current.cart.length).toBe(0);
  });

  it("should not add item with quantity 0", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "6",
      name: "Test Meal 6",
      price: 60,
      description: "desc",
      category: "cat",
      image: "img6.png",
    };
    act(() => {
      result.current.addToCart(meal, 0);
    });
    expect(result.current.cart.length).toBe(0);
  });

  it("should calculate total correctly", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal1: Meal = {
      id: "7",
      name: "Test Meal 7",
      price: 10,
      description: "desc",
      category: "cat",
      image: "img7.png",
    };
    const meal2: Meal = {
      id: "8",
      name: "Test Meal 8",
      price: 20,
      description: "desc",
      category: "cat",
      image: "img8.png",
    };
    act(() => {
      result.current.addToCart(meal1, 2);
      result.current.addToCart(meal2, 1);
    });
    expect(result.current.calculateTotal).toBe(10 * 2 + 20 * 1);
  });

  it("should return orderSubmitted, orderError, isSubmittingOrder from useCart", async () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.orderSubmitted).toBe(false);
    expect(result.current.orderError).toBeNull();
    expect(result.current.isSubmittingOrder).toBe(false);
  });

  it("should save and load cart from localStorage", () => {
    localStorage.clear();
    const wrapper = getWrapper();
    const { result, rerender } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "9",
      name: "Test Meal 9",
      price: 99,
      description: "desc",
      category: "cat",
      image: "img9.png",
    };
    act(() => {
      result.current.addToCart(meal, 2);
    });
    expect(JSON.parse(localStorage.getItem("cart")!)).toHaveLength(1);
    rerender();
    expect(result.current.cart[0].name).toBe("Test Meal 9");
  });

  it("should increase quantity if adding item with existing id", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "10",
      name: "Test Meal 10",
      price: 100,
      description: "desc",
      category: "cat",
      image: "img10.png",
    };
    act(() => {
      result.current.addToCart(meal, 1);
      result.current.addToCart(meal, 2);
    });
    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(3);
  });

  it("should not add item with empty id", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "",
      name: "Test Meal 11",
      price: 110,
      description: "desc",
      category: "cat",
      image: "img11.png",
    };
    act(() => {
      result.current.addToCart(meal, 1);
    });
    expect(result.current.cart.length).toBe(0);
  });

  it("should not update quantity for non-existent item", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.updateCartItemQuantity("not-exist", 5);
    });
    expect(result.current.cart.length).toBe(0);
  });

  it("should handle invalid localStorage data gracefully", () => {
    localStorage.setItem("cart", "not-a-json");
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(Array.isArray(result.current.cart)).toBe(true);
    expect(result.current.cart.length).toBe(0);
  });

  it("should not throw if localStorage is full or throws on setItem", () => {
    const originalSetItem = window.localStorage.setItem;
    window.localStorage.setItem = () => {
      throw new Error("QuotaExceededError");
    };
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "12",
      name: "Test Meal 12",
      price: 120,
      description: "desc",
      category: "cat",
      image: "img12.png",
    };
    expect(() => {
      act(() => {
        result.current.addToCart(meal, 1);
      });
    }).not.toThrow();
    window.localStorage.setItem = originalSetItem;
  });
});
