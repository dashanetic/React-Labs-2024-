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

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  READY = "ready",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface OrderWithStatus extends Order {
  status: OrderStatus;
  estimatedDeliveryTime?: string;
  notes?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
  customerId?: string;
}

export interface OrderSummary {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  popularItems: {
    mealId: string;
    mealName: string;
    totalQuantity: number;
  }[];
}

export interface UpdateOrderData {
  status?: OrderStatus;
  estimatedDeliveryTime?: string;
  notes?: string;
}

export interface OrderState {
  orders: Order[];
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
  currentOrder: Order | null;
  filters: OrderFilters;
}

export interface UseOrdersResult {
  orders: Order[] | null;
  loading: boolean;
  error: string | null;
  refreshOrders: () => Promise<Order[] | null>;
  createOrder: (orderData: CreateOrderData) => Promise<Order | null>;
  cancelOrder: (orderId: string) => Promise<boolean>;
}

export interface UseOrderResult {
  order: Order | null;
  loading: boolean;
  error: string | null;
  updateOrder: (
    orderId: string,
    updateData: UpdateOrderData
  ) => Promise<Order | null>;
}
