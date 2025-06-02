import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../hooks/useReduxAuth";

import bgShape from "../assets/background/BG_Shape.png";

interface FormContainerProps {
  isRegistration: boolean;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { login, register } = useAuth();

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
        <PageContainer>
          <FormContainer isRegistration={!isLogin}>
            <FormTitle>{isLogin ? "Log in" : "Sign up"}</FormTitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
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

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-image: url(${bgShape});
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const FormContainer = styled.div<FormContainerProps>`
  background-color: rgba(255, 255, 255, 0.85);
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
  transition: height 0.3s ease;
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

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  background-color: #fafafa;

  &:focus {
    border-color: #35b8be;
    outline: none;
    background-color: #fafafa;
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
