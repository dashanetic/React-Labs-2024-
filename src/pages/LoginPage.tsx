import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../hooks/useReduxAuth";
import { useTheme } from "../theme-context";

import bgShape from "../assets/background/BG_Shape.png";

interface FormContainerProps {
  isRegistration: boolean;
  isDark?: boolean;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login, register, currentUser } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      let result;

      if (isLogin) {
        result = login(email, password);
      } else {
        if (!name.trim()) {
          setError("Name cannot be empty");
          return;
        }

        result = register(name, email, password);
      }

      if (!result.success) {
        setError(result.error || "Authentication error");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred during request processing");
      console.error(err);
    }
  };

  const toggleForm = (): void => {
    setError("");
    setIsLogin(!isLogin);
  };

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <PageContainer isDark={isDark}>
          <FormContainer isRegistration={!isLogin} isDark={isDark}>
            <FormTitle>{isLogin ? "Log in" : "Sign up"}</FormTitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    isDark={isDark}
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </FormGroup>
              )}

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  isDark={isDark}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  isDark={isDark}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </FormGroup>

              <ButtonContainer>
                <Button type="submit">{isLogin ? "Log in" : "Sign up"}</Button>
              </ButtonContainer>
            </Form>

            <ToggleText>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <ToggleLink onClick={toggleForm}>
                {isLogin ? " Sign up" : " Log in"}
              </ToggleLink>
            </ToggleText>
          </FormContainer>
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

const PageContainer = styled.div<{ isDark?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-image: url(${bgShape});
  background-size: cover;
  background-position: center;
  padding: 20px;
  position: relative;

  &::before {
    content: "";
    display: ${({ isDark }) => (isDark ? "block" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #121212;
    opacity: 0.8;
    z-index: 0;
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const FormContainer = styled.div<FormContainerProps>`
  background-color: ${({ isDark }) =>
    isDark ? "rgba(18, 18, 18, 0.92)" : "rgba(255, 255, 255, 0.85)"};
  color: ${({ isDark }) => (isDark ? "#f5f5f5" : "inherit")};
  backdrop-filter: blur(5px);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 25px 40px;
  width: 695px;
  height: ${(props) => (props.isRegistration ? "400px" : "350px")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  overflow: auto;
  transition: height 0.3s ease, background-color 0.3s;
`;

const FormTitle = styled.h1`
  color: #35b8be;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 45px;
  letter-spacing: 1.65px;
  margin-bottom: 15px;
  margin-top: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  flex: 0 0 100px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-right: 10px;
`;

const Input = styled.input<{ isDark?: boolean }>`
  flex: 1;
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s, background-color 0.3s;
  background-color: ${({ isDark }) => (isDark ? "#232323" : "#fafafa")};
  color: ${({ isDark }) => (isDark ? "#f5f5f5" : "inherit")};

  &:focus {
    border-color: #35b8be;
    outline: none;
    background-color: ${({ isDark }) => (isDark ? "#232323" : "#fafafa")};
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: #e53935;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: rgba(229, 57, 53, 0.1);
  border-radius: 4px;
  font-size: 12px;
`;

const ToggleText = styled.p`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #333;
`;

const ToggleLink = styled.span`
  color: #35b8be;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export default LoginPage;
