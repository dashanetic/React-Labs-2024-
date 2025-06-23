import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store.js";
import type { CartItem } from "./slices/cartSlice.js";

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectIsCartOpen = (state: RootState) => state.cart.isCartOpen;
export const selectIsSubmittingOrder = (state: RootState) =>
  state.cart.isSubmittingOrder;
export const selectOrderSubmitted = (state: RootState) =>
  state.cart.orderSubmitted;
export const selectOrderError = (state: RootState) => state.cart.orderError;

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  )
);

export const selectCartItemsCount = createSelector([selectCartItems], (items) =>
  items.reduce((total: number, item: CartItem) => total + item.quantity, 0)
);

export const selectAppSettings = (state: RootState) => state.app.settings;
export const selectCurrentPage = (state: RootState) => state.app.currentPage;
export const selectTheme = (state: RootState) => state.app.settings.theme;
export const selectLanguage = (state: RootState) => state.app.settings.language;

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
export const selectOrdersLoading = (state: RootState) => state.orders.isLoading;
export const selectOrdersCreating = (state: RootState) =>
  state.orders.isCreating;
export const selectOrdersError = (state: RootState) => state.orders.error;

export const selectOrdersCount = createSelector(
  [selectOrders],
  (orders) => orders.length
);

export const selectOrdersTotalValue = createSelector([selectOrders], (orders) =>
  orders.reduce((total, order) => total + order.totalPrice, 0)
);

export const selectOrderById = createSelector(
  [selectOrders, (_state: RootState, orderId: string) => orderId],
  (orders, orderId) => orders.find((order) => order.id === orderId)
);

export const selectRecentOrders = createSelector([selectOrders], (orders) =>
  [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5)
);
