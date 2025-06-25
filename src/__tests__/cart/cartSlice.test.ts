import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
  toggleCart,
  resetOrderState,
  loadCartFromStorage,
  saveCartToStorage,
} from "../../redux/slices/cartSlice";
import { Meal } from "../../types/api/types";

describe("cartSlice", () => {
  const meal: Meal = {
    id: "1",
    name: "Test Meal",
    price: 10,
    description: "desc",
    category: "cat",
    image: "img.png",
  };

  const initialState = {
    items: [],
    isCartOpen: false,
    isSubmittingOrder: false,
    orderSubmitted: false,
    orderError: null,
  };

  it("should return the initial state", () => {
    expect(cartReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle addToCart", () => {
    const action = addToCart({ item: meal, quantity: 2 });
    const state = cartReducer(initialState, action);
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.items[0].id).toBe(meal.id);
  });

  it("should increment quantity if adding same item", () => {
    const startState = {
      ...initialState,
      items: [{ ...meal, quantity: 1 }],
    };
    const action = addToCart({ item: meal, quantity: 3 });
    const state = cartReducer(startState, action);
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(4);
  });

  it("should handle removeFromCart", () => {
    const startState = {
      ...initialState,
      items: [{ ...meal, quantity: 1 }],
    };
    const action = removeFromCart(meal.id);
    const state = cartReducer(startState, action);
    expect(state.items.length).toBe(0);
  });

  it("should handle updateCartItemQuantity", () => {
    const startState = {
      ...initialState,
      items: [{ ...meal, quantity: 1 }],
    };
    const action = updateCartItemQuantity({ itemId: meal.id, newQuantity: 5 });
    const state = cartReducer(startState, action);
    expect(state.items[0].quantity).toBe(5);
  });

  it("should remove item if updateCartItemQuantity sets quantity to 0", () => {
    const startState = {
      ...initialState,
      items: [{ ...meal, quantity: 1 }],
    };
    const action = updateCartItemQuantity({ itemId: meal.id, newQuantity: 0 });
    const state = cartReducer(startState, action);
    expect(state.items.length).toBe(0);
  });

  it("should handle clearCart", () => {
    const startState = {
      ...initialState,
      items: [{ ...meal, quantity: 2 }],
    };
    const state = cartReducer(startState, clearCart());
    expect(state.items.length).toBe(0);
  });

  it("should toggle cart open/close", () => {
    const state = cartReducer(initialState, toggleCart());
    expect(state.isCartOpen).toBe(true);
  });

  it("should reset order state", () => {
    const startState = {
      ...initialState,
      orderSubmitted: true,
      orderError: "err",
    };
    const state = cartReducer(startState, resetOrderState());
    expect(state.orderSubmitted).toBe(false);
    expect(state.orderError).toBe(null);
  });

  it("should clear cart after submitOrder.fulfilled", () => {
    const startState = {
      ...initialState,
      items: [{ ...meal, quantity: 2 }],
      isSubmittingOrder: true,
    };
    const action = { type: "cart/submitOrder/fulfilled" };
    const state = cartReducer(startState, action);
    expect(state.items.length).toBe(0);
    expect(state.isSubmittingOrder).toBe(false);
    expect(state.orderSubmitted).toBe(true);
  });

  it("should set orderError and isSubmittingOrder=false on submitOrder.rejected", () => {
    const startState = {
      ...initialState,
      isSubmittingOrder: true,
    };
    const action = { type: "cart/submitOrder/rejected", payload: "fail" };
    const state = cartReducer(startState, action);
    expect(state.isSubmittingOrder).toBe(false);
    expect(state.orderError).toBe("fail");
  });

  it("should not change cart if removeFromCart called with non-existent id", () => {
    const startState = {
      ...initialState,
      items: [{ ...meal, quantity: 2 }],
    };
    const action = removeFromCart("not-exist");
    const state = cartReducer(startState, action);
    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe(meal.id);
  });

  it("should not change cart if updateCartItemQuantity called with non-existent id", () => {
    const startState = {
      ...initialState,
      items: [{ ...meal, quantity: 2 }],
    };
    const action = updateCartItemQuantity({
      itemId: "not-exist",
      newQuantity: 5,
    });
    const state = cartReducer(startState, action);
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("should toggle cart open/close multiple times", () => {
    let state = cartReducer(initialState, toggleCart());
    expect(state.isCartOpen).toBe(true);
    state = cartReducer(state, toggleCart());
    expect(state.isCartOpen).toBe(false);
    state = cartReducer(state, toggleCart());
    expect(state.isCartOpen).toBe(true);
  });

  describe("localStorage error handling", () => {
    let consoleErrorSpy: jest.SpyInstance;
    beforeEach(() => {
      localStorage.clear();
      jest.restoreAllMocks();
      consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it("should handle error in loadCartFromStorage and call console.error", () => {
      jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("fail");
      });
      expect(loadCartFromStorage()).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error loading cart from localStorage:",
        expect.any(Error)
      );
    });
    it("should handle error in saveCartToStorage and call console.error", () => {
      jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("fail");
      });
      expect(() => saveCartToStorage([])).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error saving cart to localStorage:",
        expect.any(Error)
      );
    });
  });

  it("should not add item with quantity <= 0", () => {
    const action = addToCart({ item: meal, quantity: 0 });
    const state = cartReducer(initialState, action);
    expect(state.items.length).toBe(0);
  });

  it("should not add item with empty id", () => {
    const badMeal = { ...meal, id: "" };
    const action = addToCart({ item: badMeal, quantity: 1 });
    const state = cartReducer(initialState, action);
    expect(state.items.length).toBe(0);
  });

  it("should do nothing if updateCartItemQuantity called with id not in cart", () => {
    const startState = {
      ...initialState,
      items: [{ ...meal, quantity: 2 }],
    };
    const action = updateCartItemQuantity({
      itemId: "not-in-cart",
      newQuantity: 5,
    });
    const state = cartReducer(startState, action);
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });
});
