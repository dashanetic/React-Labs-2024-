import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../../components/Cart/Cart";

let mockUseCart: ReturnType<typeof getMockUseCart>;

jest.mock("../../hooks/useReduxCart", () => ({
  useCart: () => mockUseCart,
}));

const mockToggleCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockUpdateCartItemQuantity = jest.fn();
const mockClearCart = jest.fn();
const mockSubmitOrder = jest.fn();

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

interface MockCartOptions {
  cart?: CartItem[];
  isCartOpen?: boolean;
  orderError?: string | null;
  orderSubmitted?: boolean;
  isSubmittingOrder?: boolean;
}

function getCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: "1",
    name: "Burger",
    price: 10,
    image: "img.png",
    description: "desc",
    category: "cat",
    quantity: 2,
    ...overrides,
  };
}

function getMockUseCart(
  options: MockCartOptions = {}
): ReturnType<typeof buildMockUseCart> {
  const cart = options.cart ?? [getCartItem()];
  return buildMockUseCart({ ...options, cart });
}

function buildMockUseCart(options: MockCartOptions & { cart: CartItem[] }) {
  return {
    cart: options.cart,
    isCartOpen: options.isCartOpen ?? true,
    toggleCart: mockToggleCart,
    removeFromCart: mockRemoveFromCart,
    updateCartItemQuantity: mockUpdateCartItemQuantity,
    clearCart: mockClearCart,
    calculateTotal: options.cart.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    ),
    submitOrder: mockSubmitOrder,
    isSubmittingOrder: options.isSubmittingOrder ?? false,
    orderSubmitted: options.orderSubmitted ?? false,
    orderError: options.orderError ?? null,
  };
}

beforeEach(() => {
  mockUseCart = getMockUseCart();
  jest.clearAllMocks();
});

describe("Cart component", () => {
  it("renders cart overlay and header", () => {
    render(<Cart />);
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  it("renders cart items and total", () => {
    render(<Cart />);
    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("$10.00 USD")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    const allTotals = screen.getAllByText("$20.00 USD");
    expect(allTotals.length).toBe(2);
    expect(screen.getByText("Total:")).toBeInTheDocument();
  });

  it("calls updateCartItemQuantity when + or - is clicked", () => {
    render(<Cart />);
    const plusBtn = screen.getAllByRole("button", { name: "+" })[0];
    const minusBtn = screen.getAllByRole("button", { name: "-" })[0];
    fireEvent.click(plusBtn);
    fireEvent.click(minusBtn);
    expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith("1", 3);
    expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith("1", 1);
  });

  it("calls removeFromCart when × is clicked", () => {
    render(<Cart />);
    const removeBtns = screen.getAllByRole("button", { name: /×/ });
    const itemRemoveBtn =
      removeBtns.find((btn) =>
        btn.closest("div")?.className.includes("cartItem")
      ) || removeBtns[1];
    fireEvent.click(itemRemoveBtn);
    expect(mockRemoveFromCart).toHaveBeenCalledWith("1");
  });

  it("calls clearCart when Clear Cart is clicked", () => {
    render(<Cart />);
    fireEvent.click(screen.getByText("Clear Cart"));
    expect(mockClearCart).toHaveBeenCalled();
  });

  it("calls submitOrder when Checkout is clicked", () => {
    render(<Cart />);
    fireEvent.click(screen.getByText("Checkout"));
    expect(mockSubmitOrder).toHaveBeenCalled();
  });

  it("disables Checkout button when isSubmittingOrder", () => {
    mockUseCart = getMockUseCart({ isSubmittingOrder: true });
    render(<Cart />);
    expect(screen.getByText("Processing...")).toBeDisabled();
  });

  it("shows empty cart message if cart is empty", () => {
    mockUseCart = getMockUseCart({ cart: [] });
    render(<Cart />);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Continue Shopping"));
    expect(mockToggleCart).toHaveBeenCalled();
  });

  it("shows order submitted message", () => {
    mockUseCart = getMockUseCart({ orderSubmitted: true });
    render(<Cart />);
    expect(
      screen.getByText("Your order has been submitted successfully!")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close"));
    expect(mockToggleCart).toHaveBeenCalled();
  });

  it("shows order error message and allows retry", () => {
    mockUseCart = getMockUseCart({ orderError: "Error!" });
    render(<Cart />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Try Again"));
    expect(mockSubmitOrder).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Close"));
    expect(mockToggleCart).toHaveBeenCalled();
  });

  it("returns null if cart is not open", () => {
    mockUseCart = getMockUseCart({ isCartOpen: false });
    const { container } = render(<Cart />);
    expect(container.firstChild).toBeNull();
  });
});
