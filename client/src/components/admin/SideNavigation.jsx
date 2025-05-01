import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';
import '../../styles/SideNavigation.css'

function SideNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout...');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  }

  return (
    <div className="side-nav">

      <h1 className="admin-title">Admin Dashboard</h1>
      <Link 
        className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`} 
        to='/admin/dashboard'
      >
        Dashboard
      </Link>
      <Link 
        className={`nav-link ${location.pathname === '/admin/managebooks' ? 'active' : ''}`} 
        to='/admin/managebooks'
      >
        Manage Books
      </Link>
      <Link 
        className={`nav-link ${location.pathname === '/admin/manageusers' ? 'active' : ''}`} 
        to='/admin/manageusers'
      >
        Manage Users
      </Link>

      <Link 
        className={`logout-nav-link ${location.pathname === '/admin' ? 'active' : ''}`} 
        onClick={handleLogout}
      >
        Logout
      </Link>
    </div>
  );
}

export default SideNavigation;
