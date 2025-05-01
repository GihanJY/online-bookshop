import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Header.css";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate('/');
  };

  const handleCartButton = () => {
    navigate('/cart');
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  return (
    <header className="navbar-container">
      <div className="nav-top">
        <AiOutlineShoppingCart className="nav-top-icon" size={20} onClick={handleCartButton}/>
        <AiOutlineUser className="nav-top-icon" size={20} onClick={handleLoginButton} />
      </div>
      <div className="navbar">
        {/* Logo */}
        <div className="logo" onClick={handleHomeButton}>
          <div className="logo-circle">
            <p>
              <span>THIS IS</span>
              <br />
              <strong>MY LOGO</strong>
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="nav-menu">
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Team</a>
            </li>
          </ul>
        </nav>

        {/* Icons and Search */}
        <div className="nav-right">
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
