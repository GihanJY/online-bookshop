import axios from 'axios';
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
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
    const [isRobot, setIsRobot] = useState(false);

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
        if (!isRobot) {
            setError('Please verify that you are not a robot');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
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
    
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (e) {
            setError(e.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container" role="main">
            <div className="register-image">
                <img 
                    src="https://th.bing.com/th/id/OIP.XHxHkV3iucoWMdUIxacQcwHaFJ?rs=1&pid=ImgDetMain" 
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
                    
                    <div className="register-recaptcha-placeholder">
                        <div className="register-recaptcha-box">
                            <label>
                                <input 
                                    type="checkbox"
                                    checked={isRobot}
                                    onChange={(e) => setIsRobot(e.target.checked)}
                                    aria-label="I'm not a robot"
                                />
                                I'm not a robot
                            </label>
                            <div className="register-recaptcha-img">reCAPTCHA</div>
                        </div>
                    </div>

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

Register.propTypes = {
    // Add any props if needed in the future
};

export default Register;
