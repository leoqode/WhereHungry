import React, { useState } from "react";
import PizzaBack from "../assets/PizzaBack.svg";
import './LoginPage.css';
import './Loginwemail.css'
import './SignupPage.css'
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";

interface signupResponse {
  success: boolean;
  token?: string;
  message?: string;
}

interface NavigationProps {
  goBackward: () => void;
}

interface SignupwEmailProps {
  navigation?: NavigationProps;
}

const SignupwEmail: React.FC<SignupwEmailProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await signup(email, username, formData.password);
      if (response.success) {
        navigate("/dashboard");
      } else {
        setError(response.message || "Failed to create an account. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<signupResponse>;
        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 409:
              setError("Email or username already exists");
              break;
            default:
              setError("An error occurred. Please try again later.");
          }
        } else {
          setError("Probably a network error. Please check your connection");
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error while signing up', error);
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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setIsUsernameEmpty(value.trim() === "");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "confirmPassword" && value === formData.password) {
      setIsPasswordMatch(true);
    } else if (name === "password" && value === formData.confirmPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
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
        <h1 className='authen_header'>Sign Up</h1>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email' className='manual_login_input_headers'>
              Email
              {isEmailEmpty && <span className='required_signup'>*</span>}
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
            <label htmlFor='username' className='manual_login_input_headers'>
              Username
              {isUsernameEmpty && <span className='required_signup'>*</span>}
            </label>
            <input
              id='username'
              className='manual_login_input'
              type='text'
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='manual_login_input_headers'>
              Password
              {formData.password.trim() === "" && <span className='required_signup'>*</span>}
            </label>
            <input
              id='password'
              name='password'
              className='manual_login_input'
              type='password'
              value={formData.password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirmPassword' className='manual_login_input_headers'>
              Confirm Password
              {formData.confirmPassword.trim() === "" && <span className='required_signup'>*</span>}
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              className='manual_login_input'
              type='password'
              value={formData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {isPasswordMatch && formData.password && formData.confirmPassword ? (
            <span className="password-match">Passwords match!</span>
          ) : (
            <span className="password-mismatch">Please make sure passwords match.</span>
          )}
          {error && <p className='error-message'>{error}</p>}
          <button type='submit' className='login-button'>
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignupwEmail;
