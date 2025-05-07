import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import '../../styles/Cart.css';

function Cart() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [items, setItems] = useState([]);
  const { loggedIn } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (loggedIn) {
        try {
          const response = await axios.get(`${baseUrl}/api/users/cart`, {
            withCredentials: true
          });
          const cartItems = response.data.cart || [];
          setItems(cartItems.map(item => ({
            ...item,
            price: item.price || (Math.random() * 30 + 10).toFixed(2) // Fallback price if missing
          })));
          Cookies.set('cart', JSON.stringify(cartItems), { expires: 1 });
        } catch (error) {
          console.error('Error fetching cart:', error);
          toast.error('Failed to load cart');
        }
      } else {
        const guestCart = localStorage.getItem('guest_cart');
        try {
          const parsedCart = guestCart ? JSON.parse(guestCart) : [];
          setItems(parsedCart.map(item => ({
            ...item,
            price: item.price || (Math.random() * 30 + 10).toFixed(2) // Fallback price if missing
          })));
        } catch (error) {
          console.error('Error parsing local cart:', error);
          setItems([]);
        }
      }
    };

    fetchCart();
  }, [baseUrl, loggedIn]);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + (item.quantity * price);
    }, 0).toFixed(2);
  };

  const handleRemoveItem = async (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    if (loggedIn) {
      try {
        await axios.post(`${baseUrl}/api/users/cart`, 
          { bookId: items[index].bookId, quantity: 0 }, // Setting quantity to 0 removes item
          { withCredentials: true }
        );
        Cookies.set('cart', JSON.stringify(updatedItems), { expires: 1 });
      } catch (error) {
        toast.error('Failed to update cart');
        console.error('Error removing item:', error);
      }
    } else {
      localStorage.setItem('guest_cart', JSON.stringify(updatedItems));
    }
  };

  const handleQuantityChange = async (index, delta) => {
    const updatedItems = [...items];
    const newQuantity = Math.max(1, updatedItems[index].quantity + delta);
    updatedItems[index].quantity = newQuantity;
    setItems(updatedItems);

    if (loggedIn) {
      try {
        await axios.post(`${baseUrl}/api/users/cart`, 
          { 
            bookId: updatedItems[index].bookId, 
            quantity: newQuantity 
          },
          { withCredentials: true }
        );
        Cookies.set('cart', JSON.stringify(updatedItems), { expires: 1 });
      } catch (error) {
        toast.error('Failed to update quantity');
        console.error('Error updating quantity:', error);
      }
    } else {
      localStorage.setItem('guest_cart', JSON.stringify(updatedItems));
    }
  };

  const makePayment = async () => {
    localStorage.setItem('checkout_cart', JSON.stringify(items));
    localStorage.setItem('checkout_total', calculateTotal());
    navigate('/payment');
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart</h1>
      </div>

      {items.length > 0 ? (
        <div className="cart-content">
          <ul className="cart-list">
            {items.map((item, index) => (
              <li key={`${item.bookId}-${index}`} className="cart-item">
                <div className="item-content">
                  
                  <div className="item-details">
                    <span className="item-title">{item.title}</span>
                    <div className="item-quantity-controls">
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleQuantityChange(index, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleQuantityChange(index, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="item-total">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      className="remove-btn" 
                      onClick={() => handleRemoveItem(index)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items):</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            <button 
              className="checkout-btn" 
              onClick={makePayment}
              disabled={items.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/books" className="continue-shopping-btn">
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
}

export default Cart;