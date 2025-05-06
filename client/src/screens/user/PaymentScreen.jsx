import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Payment.css';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ cartTotal, onPaymentSuccess }) => {

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      postal_code: '',
      country: 'US'
    }
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(`${baseUrl}/api/payment/create-payment-intent`, {
          amount: cartTotal * 100, // Amount in cents
          currency: 'usd'
        });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError(err.message);
      }
    };

    createPaymentIntent();
  }, [cartTotal, baseUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails
      }
    });

    setProcessing(false);

    if (stripeError) {
      setError(stripeError.message);
    } else if (paymentIntent.status === 'succeeded') {
      onPaymentSuccess(paymentIntent);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setBillingDetails(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setBillingDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-section">
        <h3>Contact Information</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={billingDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={billingDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Billing Address</h3>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address.line1"
            value={billingDetails.address.line1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="address.city"
              value={billingDetails.address.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="address.postal_code"
              value={billingDetails.address.postal_code}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Country</label>
          <select
            name="address.country"
            value={billingDetails.address.country}
            onChange={handleInputChange}
            required
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
        </div>
      </div>

      <div className="form-section">
        <h3>Payment Details</h3>
        <div className="card-element-container">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="payment-error">{error}</div>}

      <button
        type="submit"
        className="pay-button"
        disabled={!stripe || processing || !clientSecret}
      >
        {processing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
      </button>
    </form>
  );
};

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    // Fetch cart items and calculate order summary
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data.items);
        
        // Calculate order summary
        const subtotal = response.data.items.reduce(
          (sum, item) => sum + (item.price * item.quantity), 0
        );
        const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
        const tax = subtotal * 0.08; // Example 8% tax
        
        setOrderSummary({
          subtotal: subtotal.toFixed(2),
          shipping: shipping.toFixed(2),
          tax: tax.toFixed(2),
          total: (subtotal + shipping + tax).toFixed(2)
        });
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Create order in your backend
      await axios.post('/api/orders', {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        items: cartItems
      });
      
      // Clear cart
      await axios.delete('/api/cart');
      
      // Navigate to success page
      navigate('/order-confirmation', { state: { paymentIntent } });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <span className="completed">Cart</span>
          <span className="completed">Information</span>
          <span className="active">Payment</span>
        </div>
      </div>

      <div className="payment-content">
        <div className="payment-main">
          <Elements stripe={stripePromise}>
            <PaymentForm 
              cartTotal={parseFloat(orderSummary.total)} 
              onPaymentSuccess={handlePaymentSuccess} 
            />
          </Elements>
        </div>

        <div className="payment-sidebar">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${orderSummary.subtotal}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>${orderSummary.shipping}</span>
            </div>
            <div className="summary-item">
              <span>Tax</span>
              <span>${orderSummary.tax}</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>${orderSummary.total}</span>
            </div>
          </div>

          <div className="order-items">
            <h4>Your Items</h4>
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-details">
                  <span className="item-title">{item.title}</span>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;