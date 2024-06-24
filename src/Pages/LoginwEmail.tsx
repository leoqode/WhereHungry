import React, { useState } from "react";
import PizzaBack from "../assets/PizzaBack.svg";
import "./Loginwemail.css";

interface NavigationProps {
  goBackward: () => void;
}

interface LoginwEmailProps {
  navigation?: NavigationProps;
}

const LoginwEmail: React.FC<LoginwEmailProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(true)
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", { email, password });
  };

  const handleBackClick = () => {
    if (navigation && navigation.goBackward) {
      navigation.goBackward();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailEmpty(value.trim() === '')
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setPassword(value);
    setIsPasswordEmpty(value.trim() === '')
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
              Email or username{isEmailEmpty && <span className="required_login">*</span>}
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
              Password{isPasswordEmpty && <span className="required_login">*</span>}
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
          <button type='submit' className='login-button'>
            Log In
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginwEmail;
