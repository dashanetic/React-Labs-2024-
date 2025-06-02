import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import cartReducer from "./slices/cartSlice.js";
import appReducer from "./slices/appSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
