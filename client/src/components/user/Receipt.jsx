import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Receipt.css';

function Receipt() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('checkout_cart');
    const savedTotal = localStorage.getItem('checkout_total');
  
    try {
      const parsedCart = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) {
        setCartItems(parsedCart);
      } else {
        setCartItems([]); // fallback
      }
    } catch (error) {
      setCartItems([]); // if JSON.parse fails
    }
  
    setTotal(parseFloat(savedTotal) || 0); // ensure total is a number
  }, []);
  

  const handleDownload = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(14);
    doc.text('Receipt', 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text('-----------------------', 10, y);
    y += 10;
    doc.text('Thank you for your order!', 10, y);
    y += 10;
    doc.text(`Order ID: #${Date.now()}`, 10, y);
    y += 10;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, y);
    y += 10;

    doc.text('Items:', 10, y);
    y += 8;

    cartItems.forEach((item, index) => {
      const line = `${index + 1}. ${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      doc.text(line, 10, y);
      y += 8;
    });

    y += 5;
    doc.text(`Total: $${total}`, 10, y);

    doc.save('receipt.pdf');
    localStorage.removeItem('checkout_cart');
    localStorage.removeItem('checkout_total');
    localStorage.removeItem('guest_cart');
    Cookies.remove('bookstore_token');
    Cookies.remove('cart');

    setTimeout(() => navigate('/'), 5000);
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
