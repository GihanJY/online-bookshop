import React, { useState } from 'react';
import '../../styles/Cart.css'; 

function Cart() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Orange']);

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items-section">
          <h1 className="cart-title">Shopping Cart</h1>
          <ul className="cart-items-list">
            {items.map((item, index) => (
              <li key={index} className="cart-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="cart-summary-section">
          <h3 className="summary-title">Summary</h3>
          <p className="summary-total">Total Items: {items.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
