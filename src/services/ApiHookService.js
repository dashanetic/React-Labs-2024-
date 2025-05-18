import useFetch from "../hooks/useFetch";

const BASE_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

/**
 * Custom hook to fetch all meals
 */
export const useMeals = () => {
  const { data, loading, error, fetchData } = useFetch(`${BASE_URL}/meals`);

  // Process the data to ensure prices are numbers
  let processedData = null;
  if (data) {
    try {
      processedData = data.map((meal) => ({
        ...meal,
        price: parseFloat(meal.price),
      }));
    } catch (e) {
      // При ошибке преобразования возвращаем исходные данные
      processedData = data;
    }
  }

  return {
    meals: processedData,
    loading,
    error,
    refreshMeals: fetchData,
  };
};

/**
 * Custom hook to fetch all orders
 */
export const useOrders = () => {
  const { data, loading, error, fetchData } = useFetch(`${BASE_URL}/orders`);

  return {
    orders: data,
    loading,
    error,
    refreshOrders: fetchData,
  };
};

/**
 * Custom hook to fetch a single order by ID
 */
export const useOrder = (orderId) => {
  const { data, loading, error, fetchData } = useFetch(
    `${BASE_URL}/orders/${orderId}`,
    {},
    orderId !== undefined // Only fetch if orderId is provided
  );

  return {
    order: data,
    loading,
    error,
    refreshOrder: fetchData,
  };
};

/**
 * Function to create a new order
 */
export const useCreateOrder = () => {
  // Вызываем useFetch здесь, на верхнем уровне хука
  const { fetchData } = useFetch(
    `${BASE_URL}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    false // Не выполнять запрос немедленно
  );

  // Создаем функцию, которая будет использовать fetchData
  const createOrder = async (orderData) => {
    try {
      // Передаем только тело запроса в customOptions
      return await fetchData({
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      throw error;
    }
  };

  return { createOrder };
};

// Export all hooks as a collection for convenience
const ApiHooks = {
  useMeals,
  useOrders,
  useOrder,
  useCreateOrder,
};

export default ApiHooks;
