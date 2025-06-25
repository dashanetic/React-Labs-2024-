interface OrderData {
  items: { mealId: string; quantity: number }[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
}

jest.mock("../../services/ApiHookService", () => ({
  useCreateOrder: () => ({
    createOrder: jest.fn(async (data: OrderData) => {
      if (data.customerName === "B") throw new Error("fail");
      return {};
    }),
  }),
}));

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

describe("useCart async submitOrder", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should set isSubmittingOrder and orderSubmitted on success", async () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "1",
      name: "Test",
      price: 10,
      description: "",
      category: "",
      image: "",
    };
    act(() => {
      result.current.addToCart(meal, 1);
    });
    await act(async () => {
      await result.current.submitOrder({
        name: "A",
        email: "a@a.a",
        phone: "1",
        address: "2",
      });
    });
    expect(result.current.isSubmittingOrder).toBe(false);
    expect(result.current.orderSubmitted).toBe(true);
    expect(result.current.cart.length).toBe(0);
  });

  it("should set orderError on failure", async () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "2",
      name: "Fail",
      price: 10,
      description: "",
      category: "",
      image: "",
    };
    act(() => {
      result.current.addToCart(meal, 1);
    });
    await act(async () => {
      await result.current.submitOrder({
        name: "B",
        email: "b@b.b",
        phone: "2",
        address: "3",
      });
    });
    expect(result.current.isSubmittingOrder).toBe(false);
    expect(result.current.orderError).toBeDefined();
  });
});

describe("localStorage integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should save and load cart from localStorage", () => {
    const wrapper = getWrapper();
    const { result, rerender } = renderHook(() => useCart(), { wrapper });
    const meal: Meal = {
      id: "3",
      name: "LS",
      price: 5,
      description: "",
      category: "",
      image: "",
    };
    act(() => {
      result.current.addToCart(meal, 2);
    });
    expect(JSON.parse(localStorage.getItem("cart")!)).toHaveLength(1);
    rerender();
    expect(result.current.cart[0].name).toBe("LS");
  });
});

describe("edge-cases", () => {
  it("should not fail when removing non-existent item", () => {
    const wrapper = getWrapper();
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.removeFromCart("not-exist");
    });
    expect(result.current.cart.length).toBe(0);
  });
});
