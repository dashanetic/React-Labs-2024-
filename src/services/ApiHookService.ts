import useFetch from "../hooks/useFetch";
import { Meal, Order, CreateOrderData } from "./ApiService";

const BASE_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

interface RawMeal extends Omit<Meal, 'price'> {
  price: string; // Цена приходит как строка из API
}

interface UseMealsResult {
  meals: Meal[] | null;
  loading: boolean;
  error: string | null;
  refreshMeals: () => Promise<RawMeal[]>;
}

interface UseOrdersResult {
  orders: Order[] | null;
  loading: boolean;
  error: string | null;
  refreshOrders: () => Promise<Order[]>;
}

interface UseOrderResult {
  order: Order | null;
  loading: boolean;
  error: string | null;
  refreshOrder: () => Promise<Order>;
}

interface UseCreateOrderResult {
  createOrder: (orderData: CreateOrderData) => Promise<Order>;
}

export const useMeals = (): UseMealsResult => {
  const { data, loading, error, fetchData } = useFetch<RawMeal[]>(`${BASE_URL}/meals`);

  let processedData: Meal[] | null = null;
  if (data) {
    try {
      processedData = data.map((meal) => ({
        ...meal,
        price: parseFloat(meal.price),
      }));
    } catch {
      // Если не удалось преобразовать цену, используем данные как есть
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
  const { data, loading, error, fetchData } = useFetch<Order[]>(`${BASE_URL}/orders`);

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

  const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
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