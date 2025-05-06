import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PaymentGateway.css';
import { toast } from 'react-toastify'; 

function PaymentGateway() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber && expiry && cvc && name) {
      // Simulate a delay
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
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <div className="inl</div>ine-fields">
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCVC(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="pay-btn" >Pay Now</button>
      </form>
    </div>
  );
}

export default PaymentGateway;
