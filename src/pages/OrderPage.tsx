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
                      <span>x</span>
                    </RemoveButton>
                  </ItemControls>
                </OrderItem>
              ))}
            </ItemsList>
            <TotalSection>
              <TotalText>Total: {formatPrice(calculateTotal)}</TotalText>
            </TotalSection>
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
            <ButtonContainer>
              <Button
                onClick={handleSubmitOrder}
                disabled={isCreating}
                wide
                rect
              >
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
  padding: 40px;
  width: 100%;
  max-width: 800px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 0; /* убраны боковые паддинги */
  /* box-shadow убран */
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
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
  min-height: 45px;
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 45px;
  flex-shrink: 0;
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
  width: 60px;
  height: 45px;
  flex-shrink: 0;
  background: #35b8be;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  border-radius: 6px;
  color: #fff !important;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.36px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  box-shadow: none;

  &:hover {
    background-color: #269ba1;
  }

  span {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: Inter, sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0.36px;
    text-align: center;
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

const AddressForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  margin-top: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  text-align: left;
`;

const Input = styled.input`
  padding: 8px 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  width: 100%;

  &::placeholder {
    color: #999;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
`;

export default OrderPage;
