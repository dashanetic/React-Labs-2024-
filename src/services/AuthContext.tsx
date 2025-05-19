import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface UserWithPassword extends User {
  password: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => AuthResult;
  register: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): AuthResult => {
    const users: UserWithPassword[] = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userWithoutPassword: User = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      setCurrentUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      return { success: true };
    } else {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }
  };

  const register = (name: string, email: string, password: string): AuthResult => {
    const users: UserWithPassword[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((user) => user.email === email)) {
      return {
        success: false,
        error: "User with this email already exists",
      };
    }

    const newUser: UserWithPassword = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return login(email, password);
  };

  const logout = (): void => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const value: AuthContextType = {
    currentUser,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};