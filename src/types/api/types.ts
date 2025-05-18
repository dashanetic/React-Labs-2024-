// Базовый URL для API
export const BASE_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

// Типы для API
export interface Meal {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface RawMeal extends Omit<Meal, "price"> {
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
