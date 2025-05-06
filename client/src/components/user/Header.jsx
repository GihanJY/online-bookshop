import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { getCartItemCount } from "../../utils/cartUtils";
import "../../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkIsUserLoggedIn = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (token) {
        setIsLoggedIn(true);
        try {
          const userInfo = JSON.parse(atob(token.split(".")[1]));
          setUser(userInfo);
        } catch (error) {
          console.error("Error parsing user info:", error);
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    setCartCount(getCartItemCount(isLoggedIn));
    checkIsUserLoggedIn();
}, [isLoggedIn]);

  const handleHomeButton = () => {
    navigate("/");
  };

  const handleCartButton = () => {
    navigate("/cart");
  };

  const handleLoginButton = () => {
    navigate("/login");
  };


  return (
    <header className="navbar-container">
      <div className="nav-top">
        {isLoggedIn ? <h3>Welcome, {user.firstName}</h3> : <></>}
        <AiOutlineUser
          className="nav-top-icon"
          size={20}
          onClick={handleLoginButton}
        />
        <div className="cart-icon-wrapper" onClick={handleCartButton}>
          <AiOutlineShoppingCart className="nav-top-icon" size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
      <div className="navbar">
        {/* Logo */}
        <div className="logo" onClick={handleHomeButton}>
          <img src="/logo.png" alt="Book store logo" />
        </div>

        {/* Menu */}
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/about">About</Link>
        </nav>

        
      </div>
    </header>
  );
};

export default Header;
