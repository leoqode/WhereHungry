import React, { useState, useEffect } from "react";
import PizzaBack from "../assets/PizzaBack.svg";
import "./Loginwemail.css";
import { useAuth } from "../contexts/AuthContext";
import { AxiosError } from "axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: {
    email: string;
    username: string;
    _id: string;
  };
}

interface NavigationProps {
  goBackward: () => void;
}

interface LoginwEmailProps {
  navigation?: NavigationProps;
}

const LoginwEmail: React.FC<LoginwEmailProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      console.log("Attempting login...");
      const response = await login(email, password);
      console.log("Login response:", response);
      if (response.success) {
        console.log("Login successful, navigation should occur via useEffect");
      } else {
        console.log("Login failed:", response.message);
        setError(response.message || "Invalid email or password please try again");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LoginResponse>;
        if (axiosError.response) {
          console.log("Axios error response:", axiosError.response);
          switch (axiosError.response.status) {
            case 401:
              setError("Invalid email or password");
              break;
            case 404:
              setError("User does not exist. Please create an account");
              break;
            default:
              setError("An error occurred. Please try again later.");
          }
        } else {
          setError("Probably a network error. Please check your connection");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    if (navigation && navigation.goBackward) {
      navigation.goBackward();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailEmpty(value.trim() === "");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordEmpty(value.trim() === "");
  };

  return (
    <div>
      <header id='loginwemail-header'>
        <button onClick={handleBackClick} className='transparent-button'>
          <img
            src={PizzaBack}
            alt='Pizza Back'
            width={33}
            height={30}
            id='go-back-login'
          />
        </button>
        <h1 className='authen_header'>Login</h1>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email' className='manual_login_input_headers'>
              Email or username
              {isEmailEmpty && <span className='required_login'>*</span>}
            </label>
            <input
              id='email'
              className='manual_login_input'
              type='email'
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='manual_login_input_headers'>
              Password
              {isPasswordEmpty && <span className='required_login'>*</span>}
            </label>
            <input
              id='password'
              className='manual_login_input'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {error && <p className='error-message'>{error}</p>}
          <button type='submit' className='login-button' disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginwEmail;
