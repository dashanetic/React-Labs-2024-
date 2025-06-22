// Типы для UI компонентов, связанных с заказами
import { Order, CreateOrderData, OrderStatus, OrderSummary } from "./api/types";

export interface OrderCardProps {
  order: Order;
  onViewDetails: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
}

export interface OrderDetailsProps {
  orderId: string;
  onClose: () => void;
  onCancel?: (orderId: string) => void;
}

export interface OrderFormProps {
  onSubmit: (orderData: CreateOrderData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<CreateOrderData>;
}

export interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  onOrderClick: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  onRefresh: () => void;
}

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: "small" | "medium" | "large";
}

export interface OrderSummaryProps {
  summary: OrderSummary;
  isLoading: boolean;
}

// Типы для форм
export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface OrderFormData extends CustomerFormData {
  items: Array<{
    mealId: string;
    quantity: number;
    mealName: string;
    price: number;
  }>;
  totalPrice: number;
  notes?: string;
}

// Типы для фильтров и сортировки
export interface OrderFilterFormData {
  status: string;
  dateFrom: string;
  dateTo: string;
}

export type OrderSortField =
  | "createdAt"
  | "totalPrice"
  | "customerName"
  | "status";
export type SortDirection = "asc" | "desc";

export interface OrderSortConfig {
  field: OrderSortField;
  direction: SortDirection;
}

// Типы для модальных окон
export interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  mode: "view" | "edit" | "create";
}

// Типы для контекста заказов (если понадобится)
export interface OrderContextValue {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: (orderData: CreateOrderData) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  setCurrentOrder: (order: Order | null) => void;
  clearError: () => void;
}
