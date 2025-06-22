import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Order, CreateOrderData, BASE_URL } from "../../types/api/types";

// Async thunk для получения заказов пользователя
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const orders: Order[] = await response.json();
      return orders;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch orders"
      );
    }
  }
);

// Async thunk для получения конкретного заказа
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const order: Order = await response.json();
      return order;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch order"
      );
    }
  }
);

// Async thunk для создания нового заказа
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: CreateOrderData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newOrder: Order = await response.json();
      return newOrder;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create order"
      );
    }
  }
);

// Async thunk для отмены заказа
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return orderId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to cancel order"
      );
    }
  }
);

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
  currentOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  isCreating: false,
  error: null,
  currentOrder: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch orders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isCreating = false;
        state.orders.unshift(action.payload); // Добавляем новый заказ в начало списка
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      // Cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
        if (state.currentOrder?.id === action.payload) {
          state.currentOrder = null;
        }
        state.error = null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
