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
