import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

import "../../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl}/api/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Login successful");
        const localCart = localStorage.getItem("guest_cart");

        if (localCart) {
          Cookies.set('cart', localCart, {expires:1 });
          localStorage.removeItem('guest_cart');
        }

        setIsLoggedIn(true);
        navigate('/');
      } else {
        console.error("Login error: ", response.data.error);
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side Image */}
      <div className="login-image">
        <img src="/book-cover-placeholder.jpg" alt="The Polaroid Book" />
      </div>

      {/* Right Side Login Form */}
      <div className="login-form">
        <h2>Login</h2>

        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email id"
          className="input-field"
        />

        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          className="input-field"
        />

        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
        </div>

        <div className="recaptcha-placeholder">
          <div className="recaptcha-box">
            <input type="checkbox" />
            <span>I'm not a robot</span>
            <div className="recaptcha-img">reCAPTCHA</div>
          </div>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="signup-text">
          Don't have an Account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
