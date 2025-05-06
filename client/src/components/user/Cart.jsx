import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function Cart() {
  const [items, setItems] = useState([]);
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (loggedIn) {
      const cookieCart = Cookies.get('cart');
      try {
        const parsedCart = cookieCart ? JSON.parse(cookieCart) : [];
        setItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cookie cart:", error);
        setItems([]);
      }
    } else {
      const guestCart = localStorage.getItem('guest_cart');
      try {
        const parsedCart = guestCart ? JSON.parse(guestCart) : [];
        setItems(parsedCart);
      } catch (error) {
        console.error("Error parsing local cart:", error);
        setItems([]);
      }
    }
  }, [loggedIn]);

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.title} — {item.quantity}</li>
        ))}
      </ul>
      <p>Total Items: {items.length}</p>
    </div>
  );
}

export default Cart;
