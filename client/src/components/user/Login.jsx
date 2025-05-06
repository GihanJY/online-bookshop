import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

import Profile from "./Profile";
import "../../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const localCart = localStorage.getItem("guest_cart");

    try {
      const response = await axios.post(
        `${baseUrl}/api/users/login`,
        {
          email,
          password,
          guestCart: localCart ? JSON.parse(localCart) : null,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Clear guest cart if it existed
        if (localCart) {
          localStorage.removeItem("guest_cart");
        }

        // Set cookies
        Cookies.set("user", JSON.stringify(response.data.user), { expires: 1 });
        Cookies.set("cart", JSON.stringify(response.data.user.cart), {
          expires: 1,
        });

        setIsLoggedIn(true);
        toast.success("Login successful!");
        setTimeout(() => navigate("/profile"), 2000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Profile />;
  }

  return (
    <div className="login-container">
      {/* Left Side Image */}
      <div className="login-image">
        <img src="/loginImage.jpg" alt="The Polaroid Book" />
      </div>

      {/* Right Side Login Form */}
      <div className="login-form">
        <h2>Login</h2>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-field"
          required
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
          required
        />

        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="signup-text">
          Don't have an Account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;