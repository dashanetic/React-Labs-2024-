export const BASE_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

export interface Meal {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface RawMeal extends Omit<Meal, "price"> {
  price: string;
}

export interface ApiMealResponse {
  id: string;
  meal?: string;
  price: string;
  instructions?: string;
  img?: string;
  category?: string;
  [key: string]: string | number | undefined;
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
