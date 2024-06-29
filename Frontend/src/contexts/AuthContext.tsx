import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

interface User {
  email: string;
  username: string;
  _id: string;
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
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  signup: (
    email: string,
    username: string,
    password: string
  ) => Promise<SignupResponse>;
  logout: () => void;
  fetchUserDetails: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserDetails = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get<User>("http://localhost:3001/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const signup = async (
    email: string,
    username: string,
    password: string
  ): Promise<SignupResponse & { loginResponse?: LoginResponse }> => {
    try {
      const signupResponse = await axios.post<SignupResponse>(
        "http://localhost:3001/api/register",
        { email, username, password }
      );
      if (signupResponse.data.success) {
        try {
          const loginResponse = await login(email, password);
          return { ...signupResponse.data, loginResponse };
        } catch (loginError) {
          console.error("Auto-login after signup failed:", loginError);
          return {
            ...signupResponse.data,
            message:
              "Signup successful, but auto-login failed. Please log in manually.",
          };
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
    setIsLoading(true);
    console.log("Starting login process");
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3001/api/login",
        { email, password }
      );
      console.log("Login response:", response.data);
      if (response.data.success && response.data.user) {
        console.log("Login successful, updating states");
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.token);
        console.log("States updated, user should be redirected to dashboard");
      } else {
        console.log("Login unsuccessful");
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
      console.log("Login process completed");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        fetchUserDetails,
      }}
    >
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
