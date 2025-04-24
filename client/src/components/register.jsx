import React from "react";
import "../styles/register.css";

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-image">
                <img src="https://th.bing.com/th/id/OIP.XHxHkV3iucoWMdUIxacQcwHaFJ?rs=1&pid=ImgDetMain" alt="Register" />
            </div>
            <div className="register-form">
                <h2>Register</h2>
                <form>
                    <input type="text" placeholder="First Name" className="register-input" />
                    <input type="text" placeholder="Last Name" className="register-input" />
                    <input type="email" placeholder="Email Id" className="register-input" />
                    <input type="password" placeholder="Password" className="register-input" />
                    
                    <div className="register-recaptcha-placeholder">
                        <div className="register-recaptcha-box">
                            <input type="checkbox" />
                            I'm not a robot
                            <div className="register-recaptcha-img">reCAPTCHA</div>
                        </div>
                    </div>

                    <button type="submit" className="register-btn">Register</button>

                    <button className="register-google-btn" type="button">
                        <img src='https://th.bing.com/th/id/OIP.XHxHkV3iucoWMdUIxacQcwHaFJ?rs=1&pid=ImgDetMain' alt="Google logo" />
                        Sign Up With Google
                    </button>

                    <div className="register-switch-text">
                        Already have an account? <a href="/login">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
