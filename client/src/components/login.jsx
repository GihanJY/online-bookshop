import React from "react";
import "../styles/login.css";

function Login() {
    return (
        <div className="login-container">
            {/* Left Side Image */}
            <div className="login-image">
                <img src="/book-cover-placeholder.jpg" alt="The Polaroid Book" />
            </div>

            {/* Right Side Login Form */}
            <div className="login-form">
                <h2>Login</h2>
                
                <input type="email" placeholder="Email id" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />
                
                <div className="login-options">
                    <label>
                        <input type="checkbox" /> Remember Me
                    </label>
                    <a href="#" className="forgot-password">Forgot Password</a>
                </div>

                <div className="recaptcha-placeholder">
                    <div className="recaptcha-box">
                        <input type="checkbox" />
                        <span>I'm not a robot</span>
                        <div className="recaptcha-img">reCAPTCHA</div>
                    </div>
                </div>

                <button className="login-btn">Login</button>

                <button className="google-login-btn">
                    <img src="/google-icon.png" alt="Google" />
                    <span>Sign In With Google</span>
                </button>

                <p className="signup-text">
                    Don't have an Account? <a href="/register">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
