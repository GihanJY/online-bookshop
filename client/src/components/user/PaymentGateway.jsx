import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PaymentGateway.css';

function PaymentGateway() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    value = value.replace(/(.{4})/g, '$1 ').trim(); // Format into groups of 4
    setCardNumber(value);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
  };

  const handleCVCChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCVC(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber && expiry && cvc && name) {
      setTimeout(() => {
        navigate('/success');
      }, 1000);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="payment-gateway">
      <h2>Payment Gateway</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <input
          type="text"
          placeholder="Cardholder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Card Number (e.g. 4111 1111 1111 1111)"
          value={cardNumber}
          onChange={handleCardNumberChange}
          inputMode="numeric"
          maxLength="19"
          required
        />
        <div className="inline-fields">
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={handleExpiryChange}
            inputMode="numeric"
            maxLength="5"
            required
          />
          <input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={handleCVCChange}
            inputMode="numeric"
            maxLength="4"
            required
          />
        </div>

        <div className="total-amount">
          <p>Total Amount:</p>
          <h3>${parseFloat(localStorage.getItem('checkout_total') || '0.00').toFixed(2)}</h3>
        </div>
        <button type="submit" className="pay-btn">Pay Now</button>
      </form>
    </div>
  );
}

export default PaymentGateway;
