import React, { useState } from "react";
import axios from 'axios';
import "../../styles/Register.css";

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleRegister = async (e) =>  {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}/api/users/register`, 
                {
                    firstname,
                    lastname,
                    email,
                    password
                }
            );
    
            if (response.status === 200) {
                console.log("User registration successful");
            }
            else {
                console.error("Login error: ", response.data.error);
            }
        }
        catch (error) {
            console.error("Login error: ", error);
        }
    }
    return (
        <div className="register-container">
            <div className="register-image">
                <img src="https://th.bing.com/th/id/OIP.XHxHkV3iucoWMdUIxacQcwHaFJ?rs=1&pid=ImgDetMain" alt="Register" />
            </div>
            <div className="register-form">
                <h2>Register</h2>
                <form>
                    <input 
                        type="text" 
                        onChange={(e) => {setFirstname(e.target.value)}} 
                        placeholder="First Name" 
                        className="register-input" />

                    <input 
                        type="text" 
                        onChange={(e) => {setLastname(e.target.value)}} 
                        placeholder="Last Name" 
                        className="register-input" />

                    <input 
                        type="email" 
                        onChange={(e) => {setEmail(e.target.value)}} 
                        placeholder="Email Id" 
                        className="register-input" />

                    <input 
                        onClick={(e) => {setPassword(e.target.value)}} 
                        type="password" 
                        placeholder="Password" 
                        className="register-input" />
                    
                    <div className="register-recaptcha-placeholder">
                        <div className="register-recaptcha-box">
                            <input type="checkbox" />
                            I'm not a robot
                            <div className="register-recaptcha-img">reCAPTCHA</div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        onClick={handleRegister}
                        className="register-btn">Register</button>

                    <div className="register-switch-text">
                        Already have an account? <a href="/login">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
