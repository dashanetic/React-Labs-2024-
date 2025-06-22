import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useCart } from "../hooks/useReduxCart";
import { useOrders } from "../hooks/useReduxOrders";
import { useAuth } from "../hooks/useReduxAuth";
import { CartItem } from "../redux/slices/cartSlice";
import bgShape from "../assets/background/BG_Shape.png";

const OrderPage: React.FC = () => {
  const [street, setStreet] = useState<string>("");
  const [house, setHouse] = useState<string>("");
  const [error, setError] = useState<string>("");

  const {
    cart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    calculateTotal,
  } = useCart();
  const { createNewOrder, isCreating, error: orderError } = useOrders();
  const { currentUser } = useAuth();

  // Debug logging
  console.log("OrderPage rendered:", {
    cartItemsCount: cart.length,
    cart: cart,
    currentUser: currentUser?.email || "Not logged in",
  });

  useEffect(() => {
    if (orderError) {
      setError(orderError);
    }
  }, [orderError]);

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)} USD`;
  };

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(item.id);
    } else {
      updateCartItemQuantity(item.id, newQuantity);
    }
  };

  const handleSubmitOrder = async () => {
    setError("");

    if (!currentUser) {
      setError("Please log in to place an order");
      return;
    }

    if (!street.trim() || !house.trim()) {
      setError("Please fill in all address fields");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      const orderData = {
        items: cart.map((item) => ({
          mealId: item.id,
          quantity: item.quantity,
        })),
        totalPrice: calculateTotal,
        customerName: currentUser.name || "Unknown",
        customerEmail: currentUser.email || "",
        customerPhone: "", // User doesn't have phone field
        deliveryAddress: `${street}, ${house}`,
      };

      await createNewOrder(orderData);

      // Clear cart and form after successful order
      clearCart();
      setStreet("");
      setHouse("");

      // You might want to redirect to a success page or show a success message
      alert("Order placed successfully!");
    } catch {
      setError("Failed to place order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <PageWrapper>
        <Header />
        <MainContent>
          <PageContainer>
            <ContentContainer>
              <Title>Finish your order</Title>
              <EmptyMessage>
                Your cart is empty. Add some items to place an order!
              </EmptyMessage>
            </ContentContainer>
          </PageContainer>
        </MainContent>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <PageContainer>
          <ContentContainer>
            <Title>Finish your order</Title>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <OrderSection>
              <SectionTitle>Your Order</SectionTitle>
              <ItemsList>
                {cart.map((item) => (
                  <OrderItem key={item.id}>
                    <ItemImage src={item.image} alt={item.name} />
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                    </ItemDetails>
                    <ItemControls>
                      <QuantityInput
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item,
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                      <RemoveButton onClick={() => removeFromCart(item.id)}>
                        ❌
                      </RemoveButton>
                    </ItemControls>
                  </OrderItem>
                ))}
              </ItemsList>

              <TotalSection>
                <TotalText>Total: {formatPrice(calculateTotal)}</TotalText>
              </TotalSection>
            </OrderSection>

            <AddressSection>
              <SectionTitle>Delivery Address</SectionTitle>
              <AddressForm>
                <FormGroup>
                  <Label htmlFor="street">Street</Label>
                  <Input
                    type="text"
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Enter street name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="house">House</Label>
                  <Input
                    type="text"
                    id="house"
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
                    placeholder="Enter house number"
                    required
                  />
                </FormGroup>
              </AddressForm>
            </AddressSection>

            <ButtonContainer>
              <Button onClick={handleSubmitOrder} disabled={isCreating}>
                {isCreating ? "Placing Order..." : "Order"}
              </Button>
            </ButtonContainer>
          </ContentContainer>
        </PageContainer>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  background-image: url(${bgShape});
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  min-height: calc(100vh - 200px);
`;

const ContentContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 800px;
  min-height: 600px;
`;

const Title = styled.h1`
  color: #35b8be;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 48px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 1.65px;
  margin-bottom: 40px;
  margin-top: 0;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  color: #e53935;
  background-color: rgba(229, 57, 53, 0.1);
  border: 1px solid rgba(229, 57, 53, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const OrderSection = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  border-bottom: 2px solid #35b8be;
  padding-bottom: 8px;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const ItemPrice = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #35b8be;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #35b8be;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(231, 60, 23, 0.1);
  }
`;

const TotalSection = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  text-align: right;
`;

const TotalText = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #35b8be;
`;

const AddressSection = styled.section`
  margin-bottom: 40px;
`;

const AddressForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #35b8be;
  }

  &::placeholder {
    color: #999;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export default OrderPage;
