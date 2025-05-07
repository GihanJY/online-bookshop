import React from 'react';
import '../../styles/Success.css';

function Success() {
  return (
    <div className="success-container">
      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
          strokeLinecap="round"
        />
      </svg>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. A receipt has been sent to your email.</p>
      <a href="/receipt" className="receipt-link">Download Receipt</a>
    </div>
  );
}

export default Success;
