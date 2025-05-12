import "./App.css";
import { Component, createContext } from "react";
import MenuPage from "./pages/MenuPage.jsx";
import ApiService from "./services/ApiService.js";

export const AppContext = createContext(null);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appSettings: {
        theme: "light",
        language: "en",
      },
      cart: [],
      isCartOpen: false,
      isSubmittingOrder: false,
      orderSubmitted: false,
      orderError: null,
    };
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      appSettings: {
        ...prevState.appSettings,
        theme: prevState.appSettings.theme === "light" ? "dark" : "light",
      },
    }));
  };

  toggleCart = () => {
    this.setState((prevState) => ({
      isCartOpen: !prevState.isCartOpen,
    }));
  };

  addToCart = (item, quantity = 1) => {
    this.setState((prevState) => {
      const existingItemIndex = prevState.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedCart;

      if (existingItemIndex !== -1) {
        updatedCart = [...prevState.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
      } else {
        updatedCart = [...prevState.cart, { ...item, quantity }];
      }

      return { cart: updatedCart };
    });
  };

  updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    this.setState((prevState) => ({
      cart: prevState.cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    }));
  };

  removeFromCart = (itemId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((item) => item.id !== itemId),
    }));
  };

  clearCart = () => {
    this.setState({ cart: [] });
  };

  calculateTotal = () => {
    return this.state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  submitOrder = async () => {
    if (this.state.cart.length === 0) return;

    this.setState({ isSubmittingOrder: true, orderError: null });

    try {
      const orderData = {
        items: this.state.cart,
        total: this.calculateTotal(),
        customer: {
          name: "Customer",
          phone: "+7999999999",
          address: "Address",
        },
        date: new Date().toISOString(),
        status: "pending",
      };

      await ApiService.createOrder(orderData);

      this.setState({
        isSubmittingOrder: false,
        orderSubmitted: true,
        cart: [],
      });

      setTimeout(() => {
        this.setState({ orderSubmitted: false });
      }, 3000);
    } catch (error) {
      console.error("Failed to submit order:", error);
      this.setState({
        isSubmittingOrder: false,
        orderError: "Failed to submit your order. Please try again.",
      });
    }
  };

  render() {
    const {
      appSettings,
      cart,
      isCartOpen,
      isSubmittingOrder,
      orderSubmitted,
      orderError,
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          settings: appSettings,
          toggleTheme: this.toggleTheme,
          cart,
          isCartOpen,
          isSubmittingOrder,
          orderSubmitted,
          orderError,
          toggleCart: this.toggleCart,
          addToCart: this.addToCart,
          updateCartItemQuantity: this.updateCartItemQuantity,
          removeFromCart: this.removeFromCart,
          clearCart: this.clearCart,
          calculateTotal: this.calculateTotal,
          submitOrder: this.submitOrder,
        }}
      >
        <div className={`App ${appSettings.theme}-theme`}>
          <MenuPage />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
