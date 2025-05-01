import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../styles/AdminLogin.css';

function AdminLogin() {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!username.trim() || !password.trim()) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        const formData = {
            username,
            password
        };

        try {
            const response = await axios.post(`${baseUrl}/api/admin/login`, formData);
            
            if (response.status === 200) {
                localStorage.setItem('adminToken', response.data.token);
                if (response.data.admin) {
                    localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
                }
                navigate('/admin/dashboard');
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Login failed');
            } else if (error.request) {
                setError('No response from server');
            } else {
                setError('An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h1>Admin Login</h1>
                {error && <div className="error-message">{error}</div>}
                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            className="admin-login-input" 
                            type="text" 
                            name="username"
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            className="admin-login-input" 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <button 
                        className="admin-login-button" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;