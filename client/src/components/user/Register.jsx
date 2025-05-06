import axios from 'axios';
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/Register.css";

const Register = () => {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.firstname.trim()) {
            setError('First name is required');
            return false;
        }
        if (!formData.lastname.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            toast.error(error);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/users/register`, {
                firstName: formData.firstname,
                lastName: formData.lastname,
                email: formData.email,
                password: formData.password
            });

            if (response.status >= 200 && response.status < 300) {
                toast.success('Registered successfully');
                setTimeout(() => navigate('/login'), 2000); // wait 2s before redirecting
            }
        } catch (e) {
            const msg = e.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container" role="main">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="register-image">
                <img 
                    src="/registerImage.jpg" 
                    alt="Registration illustration" 
                />
            </div>
            <div className="register-form">
                <h2>Register</h2>
                {error && <div className="error-message" role="alert">{error}</div>}
                <form onSubmit={handleSubmit} noValidate>
                    <input 
                        type="text" 
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="First Name" 
                        className="register-input"
                        aria-label="First Name"
                        required
                    />

                    <input 
                        type="text" 
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Last Name" 
                        className="register-input"
                        aria-label="Last Name"
                        required
                    />

                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Id" 
                        className="register-input"
                        aria-label="Email Address"
                        required
                    />

                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password" 
                        className="register-input"
                        aria-label="Password"
                        required
                    />

                    <button 
                        type="submit" 
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <div className="register-switch-text">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
