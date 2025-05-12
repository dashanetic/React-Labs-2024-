const BASE_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

class ApiService {
  /**
   * Get all meals
   * @returns {Promise<Array>} - Promise with array of meals
   */
  static async getMeals() {
    try {
      const response = await fetch(`${BASE_URL}/meals`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
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
   * Get all orders
   * @returns {Promise<Array>} - Promise with array of orders
   */
  static async getOrders() {
    try {
      const response = await fetch(`${BASE_URL}/orders`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  /**
   * Create a new order
   * @param {Object} orderData - Order data
   * @returns {Promise<Object>} - Promise with created order
   */
  static async createOrder(orderData) {
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

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  /**
   * Get a specific order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} - Promise with order data
   */
  static async getOrderById(orderId) {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching order with ID ${orderId}:`, error);
      throw error;
    }
  }
}

export default ApiService;
