import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchOrders,
  fetchOrderById,
  createOrder,
  cancelOrder,
  clearError,
  setCurrentOrder,
  clearOrders,
} from "../redux/slices/orderSlice";
import {
  selectOrders,
  selectCurrentOrder,
  selectOrdersLoading,
  selectOrdersCreating,
  selectOrdersError,
  selectOrdersCount,
  selectOrdersTotalValue,
  selectRecentOrders,
} from "../redux/selectors";
import { CreateOrderData } from "../types/api/types";

export const useOrders = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);
  const currentOrder = useAppSelector(selectCurrentOrder);
  const isLoading = useAppSelector(selectOrdersLoading);
  const isCreating = useAppSelector(selectOrdersCreating);
  const error = useAppSelector(selectOrdersError);
  const ordersCount = useAppSelector(selectOrdersCount);
  const totalValue = useAppSelector(selectOrdersTotalValue);
  const recentOrders = useAppSelector(selectRecentOrders);

  const fetchUserOrders = useCallback(
    (userId: string) => {
      return dispatch(fetchOrders(userId));
    },
    [dispatch]
  );

  const fetchOrderDetails = useCallback(
    (orderId: string) => {
      return dispatch(fetchOrderById(orderId));
    },
    [dispatch]
  );

  const createNewOrder = useCallback(
    (orderData: CreateOrderData) => {
      return dispatch(createOrder(orderData));
    },
    [dispatch]
  );

  const cancelExistingOrder = useCallback(
    (orderId: string) => {
      return dispatch(cancelOrder(orderId));
    },
    [dispatch]
  );

  const clearOrderError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const selectOrder = useCallback(
    (order: typeof currentOrder) => {
      dispatch(setCurrentOrder(order));
    },
    [dispatch]
  );

  const clearAllOrders = useCallback(() => {
    dispatch(clearOrders());
  }, [dispatch]);

  return {
    // State
    orders,
    currentOrder,
    isLoading,
    isCreating,
    error,
    ordersCount,
    totalValue,
    recentOrders,

    // Actions
    fetchUserOrders,
    fetchOrderDetails,
    createNewOrder,
    cancelExistingOrder,
    clearOrderError,
    selectOrder,
    clearAllOrders,
  };
};

// Хук для работы с конкретным заказом
export const useOrder = (orderId?: string) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const isLoading = useAppSelector(selectOrdersLoading);
  const error = useAppSelector(selectOrdersError);

  const order = orderId ? orders.find((o) => o.id === orderId) : null;

  const fetchOrder = useCallback(() => {
    if (orderId) {
      return dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const cancelOrderById = useCallback(() => {
    if (orderId) {
      return dispatch(cancelOrder(orderId));
    }
  }, [dispatch, orderId]);

  return {
    order,
    isLoading,
    error,
    fetchOrder,
    cancelOrder: cancelOrderById,
  };
};
