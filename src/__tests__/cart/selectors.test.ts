import {
  selectCartItems,
  selectIsCartOpen,
  selectIsSubmittingOrder,
  selectOrderSubmitted,
  selectOrderError,
  selectCartTotal,
  selectCartItemsCount,
} from "../../redux/selectors";
import { RootState } from "../../redux/store";

describe("cart selectors", () => {
  const state: RootState = {
    cart: {
      items: [
        {
          id: "1",
          name: "A",
          price: 2,
          description: "",
          category: "",
          image: "",
          quantity: 3,
        },
        {
          id: "2",
          name: "B",
          price: 5,
          description: "",
          category: "",
          image: "",
          quantity: 1,
        },
      ],
      isCartOpen: true,
      isSubmittingOrder: false,
      orderSubmitted: false,
      orderError: null,
    },
    auth: { currentUser: null, loading: false },
    app: { settings: { theme: "light", language: "en" }, currentPage: "home" },
    orders: {
      orders: [],
      isLoading: false,
      isCreating: false,
      error: null,
      currentOrder: null,
    },
  };

  it("selectCartItems", () => {
    expect(selectCartItems(state)).toHaveLength(2);
  });
  it("selectIsCartOpen", () => {
    expect(selectIsCartOpen(state)).toBe(true);
  });
  it("selectIsSubmittingOrder", () => {
    expect(selectIsSubmittingOrder(state)).toBe(false);
  });
  it("selectOrderSubmitted", () => {
    expect(selectOrderSubmitted(state)).toBe(false);
  });
  it("selectOrderError", () => {
    expect(selectOrderError(state)).toBeNull();
  });
  it("selectCartTotal", () => {
    expect(selectCartTotal(state)).toBe(2 * 3 + 5 * 1);
  });
  it("selectCartItemsCount", () => {
    expect(selectCartItemsCount(state)).toBe(4);
  });
});
