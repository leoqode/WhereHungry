import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

interface User {
  email: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
  token?: string;
  loginResponse?: LoginResponse;
}

interface LoginResponse {
  success: boolean;
  token: string;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  signup: (
    email: string,
    username: string,
    password: string
  ) => Promise<SignupResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = async (
    email: string,
    username: string,
    password: string
  ): Promise<SignupResponse & {loginResponse ?: LoginResponse}> => {
    try {
      const signupResponse = await axios.post<SignupResponse>(
        "http://localhost:3001/api/register",
        { email, username, password }
      );
      if (signupResponse.data.success) {
        try {
          const loginResponse = await login(email, password);
          return { ...signupResponse.data, loginResponse};
        } catch (loginError) {
          console.error("Auto-login after signup failed:", loginError);
          return { ...signupResponse.data, message: "Signup successful, but auto-login failed. Please log in manually." };
        }
      }
      return signupResponse.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3001/api/login",
        { email, password }
      );
      if (response.data.success) {
        setUser({ email });
        localStorage.setItem("token", response.data.token || "");
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
