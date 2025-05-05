import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import "../../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const checkIsUserLoggedIn = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='));
      if (token) {
        setIsLoggedIn(true);
        try {
          const userInfo = JSON.parse(atob(token.split('.')[1]));
          setUser(userInfo);
        } catch (error) {
          console.error('Error parsing user info:', error);
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkIsUserLoggedIn();
  }, []);

  const handleHomeButton = () => {
    navigate('/');
  };

  const handleCartButton = () => {
    navigate('/cart');
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  const handleSearchButton = async () => {
    if (!searchText) {
      return;
    }

    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`);

      if (response.data.items && response.data.items.length > 0) {
        const book = response.data.items[0];
        const id = book.id;
        const title = book.volumeInfo.title.replace(/\s+/g, '-');
        navigate(`/book/${id}/${title}`);
      } else {
        alert("No books found!");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="navbar-container">
      <div className="nav-top"> 
        {isLoggedIn ? (
          <h3>Welcome, {user.firstName}</h3>
        ) : (
          <></>
        )}
          <AiOutlineUser className="nav-top-icon" size={20} onClick={handleLoginButton} />
          <AiOutlineShoppingCart className="nav-top-icon" size={20} onClick={handleCartButton}/>
      </div>
      <div className="navbar">
        {/* Logo */}
        <div className="logo" onClick={handleHomeButton}>
          <img src="/logo.png" alt="Book store logo" />
        </div>

        {/* Menu */}
        <nav className="nav-menu">
          <Link to='/'>Home</Link>
          <Link to='/books'>Books</Link>
          <Link to='/about'>About</Link>
        </nav>

        {/* Icons and Search */}
      <div className="nav-right">
          <div className="search-bar">
            <input type="text" placeholder="Search" onChange={(e) => {setSearchText(e.target.value.trim())}} />
            <input type='button' className="fas fa-search" onClick={handleSearchButton} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
