import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  
  const [dashboardData, setDashboardData] = useState({
    totalBooks: 0,
    lowStockBooks: 0,
    outOfStockBooks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin');
          return;
        }

        const response = await axios.get(`${baseUrl}/api/books/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          const books = response.data;
          const lowStockBooks = books.filter(book => book.stock < 5).length;
          const outOfStockBooks = books.filter(book => book.stock === 0).length;

          setDashboardData({
            totalBooks: books.length,
            lowStockBooks,
            outOfStockBooks
          });
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.response?.data?.message || 'Failed to fetch dashboard data');
        
        if (error.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, navigate]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      <div className="card-container">
        <div className="dashboard-card">
          <h3>Total Books</h3>
          <p className="card-value">{dashboardData.totalBooks}</p>
          <p className="card-description">Books in inventory</p>
        </div>
        <div className="dashboard-card warning">
          <h3>Low Stock Books</h3>
          <p className="card-value">{dashboardData.lowStockBooks}</p>
          <p className="card-description">Books with less than 5 in stock</p>
        </div>
        <div className="dashboard-card danger">
          <h3>Out of Stock Books</h3>
          <p className="card-value">{dashboardData.outOfStockBooks}</p>
          <p className="card-description">Books that need restocking</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
