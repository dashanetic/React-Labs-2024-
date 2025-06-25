import useFetch from "../hooks/useFetch";
import {
  BASE_URL,
  Meal,
  Order,
  RawMeal,
  CreateOrderData,
} from "../types/api/types";

interface UseMealsResult {
  meals: Meal[] | null;
  loading: boolean;
  error: string | null;
  refreshMeals: () => Promise<RawMeal[] | null>;
}

interface UseOrdersResult {
  orders: Order[] | null;
  loading: boolean;
  error: string | null;
  refreshOrders: () => Promise<Order[] | null>;
}

interface UseOrderResult {
  order: Order | null;
  loading: boolean;
  error: string | null;
  refreshOrder: () => Promise<Order | null>;
}

interface UseCreateOrderResult {
  createOrder: (orderData: CreateOrderData) => Promise<Order | null>;
}

export const useMeals = (): UseMealsResult => {
  const { data, loading, error, fetchData } = useFetch<RawMeal[]>(
    `${BASE_URL}/meals`
  );

  let processedData: Meal[] | null = null;
  if (data) {
    try {
      processedData = data.map((meal) => ({
        ...meal,
        price: parseFloat(meal.price),
      }));
    } catch {
      processedData = data as unknown as Meal[];
    }
  }

  return {
    meals: processedData,
    loading,
    error,
    refreshMeals: fetchData,
  };
};

export const useOrders = (): UseOrdersResult => {
  const { data, loading, error, fetchData } = useFetch<Order[]>(
    `${BASE_URL}/orders`
  );

  return {
    orders: data,
    loading,
    error,
    refreshOrders: fetchData,
  };
};

export const useOrder = (orderId?: string): UseOrderResult => {
  const { data, loading, error, fetchData } = useFetch<Order>(
    `${BASE_URL}/orders/${orderId}`,
    {},
    orderId !== undefined
  );

  return {
    order: data,
    loading,
    error,
    refreshOrder: fetchData,
  };
};

export const useCreateOrder = (): UseCreateOrderResult => {
  const { fetchData } = useFetch<Order>(
    `${BASE_URL}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    false
  );

  const createOrder = async (
    orderData: CreateOrderData
  ): Promise<Order | null> => {
    try {
      return await fetchData({
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      throw error;
    }
  };

  return { createOrder };
};

const ApiHooks = {
  useMeals,
  useOrders,
  useOrder,
  useCreateOrder,
};

export default ApiHooks;
