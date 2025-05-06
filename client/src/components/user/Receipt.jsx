// src/pages/Receipt.js
import React from 'react';

function Receipt() {
  const handleDownload = () => {
    const element = document.createElement('a');
    const receiptContent = `
      Receipt
      -----------------------
      Thank you for your order!

      Order ID: #1234567890
      Items: 3
      Total: $49.97
      Date: ${new Date().toLocaleDateString()}
    `;
    const file = new Blob([receiptContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'receipt.txt';
    element.click();
  };

  return (
    <div className="receipt-page">
      <h2>Your Receipt</h2>
      <p>You can download your receipt below:</p>
      <button className="download-btn" onClick={handleDownload}>
        Download Receipt
      </button>
    </div>
  );
}

export default Receipt;
