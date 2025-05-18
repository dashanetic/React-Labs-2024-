const BASE_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

// Типы для API
export interface Meal {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface RawMeal extends Omit<Meal, 'price'> {
  price: string; // Цена приходит как строка из API
}

// Интерфейс для сырых данных API, которые приходят с сервера
export interface ApiMealResponse {
  id: string;
  meal?: string; // Название блюда
  price: string; // Цена как строка
  instructions?: string; // Инструкции/описание
  img?: string; // URL изображения
  category?: string; // Категория блюда
  [key: string]: string | number | undefined; // Для других полей, которые могут прийти с API
}

export interface OrderItem {
  mealId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  createdAt: string;
}

export interface CreateOrderData {
  items: OrderItem[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
}

class ApiService {
  /**
   * Get all meals from API
   */
  static async getMeals(): Promise<Meal[]> {
    try {
      const response = await fetch(`${BASE_URL}/meals`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json() as RawMeal[];
      return data.map((meal) => ({
        ...meal,
        price: parseFloat(meal.price),
      }));
    } catch (error) {
      console.error("Error fetching meals:", error);
      throw error;
    }
  }

  /**
   * Get all orders from API
   */
  static async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${BASE_URL}/orders`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json() as Order[];
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  /**
   * Create a new order
   */
  static async createOrder(orderData: CreateOrderData): Promise<Order> {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json() as Order;
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  /**
   * Get a specific order by ID
   */
  static async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json() as Order;
      return data;
    } catch (error) {
      console.error(`Error fetching order with ID ${orderId}:`, error);
      throw error;
    }
  }
}

export default ApiService;