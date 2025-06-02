import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Meal } from "../../types/api/types";

export interface CartItem extends Meal {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isSubmittingOrder: boolean;
  orderSubmitted: boolean;
  orderError: string | null;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
  isSubmittingOrder: false,
  orderSubmitted: false,
  orderError: null,
};

export const submitOrder = createAsyncThunk(
  "cart/submitOrder",
  async (
    {
      items,
      customerData,
      createOrderFn,
    }: {
      items: CartItem[];
      customerData: {
        name: string;
        email: string;
        phone: string;
        address: string;
      };
      createOrderFn: (orderData: {
        items: { mealId: string; quantity: number }[];
        totalPrice: number;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        deliveryAddress: string;
      }) => Promise<unknown>;
    },
    { rejectWithValue }
  ) => {
    try {
      const orderData = {
        items: items.map((item) => ({
          mealId: item.id,
          quantity: item.quantity,
        })),
        totalPrice: items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        deliveryAddress: customerData.address,
      };

      await createOrderFn(orderData);
      return true;
    } catch (error) {
      console.error("Order submission failed:", error);
      return rejectWithValue("Failed to submit your order. Please try again.");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (
      state,
      action: PayloadAction<{ item: Meal; quantity?: number }>
    ) => {
      const { item, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ itemId: string; newQuantity: number }>
    ) => {
      const { itemId, newQuantity } = action.payload;

      if (newQuantity <= 0) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        const item = state.items.find((item) => item.id === itemId);
        if (item) {
          item.quantity = newQuantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    resetOrderState: (state) => {
      state.orderSubmitted = false;
      state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isSubmittingOrder = true;
        state.orderError = null;
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.isSubmittingOrder = false;
        state.orderSubmitted = true;
        state.items = [];
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isSubmittingOrder = false;
        state.orderError = action.payload as string;
      });
  },
});

export const {
  toggleCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  resetOrderState,
} = cartSlice.actions;

export default cartSlice.reducer;
