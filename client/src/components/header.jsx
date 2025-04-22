import React from 'react';
import '../styles/header.css';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';

const Header = () => {
  return (
    <header className="navbar-container">
        <div className='nav-top'>
          <AiOutlineShoppingCart />
          <AiOutlineUser />
        </div>
      <div className='navbar'>
        {/* Logo */}
      <div className="logo">
        <div className="logo-circle">
          <p><span>THIS IS</span><br /><strong>MY LOGO</strong></p>
        </div>
      </div>

      {/* Menu */}
      <nav className="nav-menu">
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Team</a></li>
        </ul>
      </nav>

      {/* Icons and Search */}
      <div className="nav-right">
        <div className="icons">
          <i className="fas fa-shopping-bag"></i>
          <i className="fas fa-user"></i>
        </div>
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
