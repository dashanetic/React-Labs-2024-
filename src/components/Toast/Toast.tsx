import React from "react";
import styled from "styled-components";

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  itemName: string;
}

const Toast: React.FC<ToastProps> = ({ isVisible, onClose, itemName }) => {
  console.log("Toast render:", { isVisible, itemName });

  if (!isVisible) return null;

  const handleGoToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Go to Cart clicked - event:", e);
    console.log("Current URL:", window.location.href);

    // Закрываем Toast сначала
    onClose();

    console.log("Toast closed, navigating...");

    // Прямая навигация
    window.location.href = window.location.origin + "/order";
  };

  return (
    <ToastOverlay onClick={onClose}>
      <ToastContainer
        onClick={(e) => {
          e.stopPropagation();
          console.log("ToastContainer clicked");
        }}
      >
        <ToastHeader>
          <h3>Item Added to Cart!</h3>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ToastHeader>

        <ToastBody>
          <p>
            <strong>{itemName}</strong> has been added to your cart.
          </p>
        </ToastBody>

        <ToastActions
          onClick={(e) => {
            e.stopPropagation();
            console.log("ToastActions clicked");
          }}
        >
          <ContinueButton onClick={onClose}>Continue Shopping</ContinueButton>
          <GoToCartButton
            onClick={handleGoToCart}
            onMouseDown={(e) => {
              e.preventDefault();
              console.log("GoToCartButton mousedown");
            }}
          >
            Go to Cart
          </GoToCartButton>
        </ToastActions>
      </ToastContainer>
    </ToastOverlay>
  );
};

const ToastOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ToastContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 24px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const ToastHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    margin: 0;
    color: #35b8be;
    font-size: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const ToastBody = styled.div`
  margin-bottom: 20px;

  p {
    margin: 0;
    color: #333;
    font-size: 16px;
  }
`;

const ToastActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  position: relative;
  z-index: 5;

  button {
    pointer-events: auto;
  }
`;

const ContinueButton = styled.button`
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  color: #333;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
    border-color: #ccc;
  }
`;

const GoToCartButton = styled.button`
  background-color: #35b8be;
  border: 2px solid #35b8be;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  position: relative;
  z-index: 10;

  &:hover {
    background-color: #2a9aa0;
    border-color: #2a9aa0;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: 2px solid #35b8be;
    outline-offset: 2px;
  }
`;

export default Toast;
