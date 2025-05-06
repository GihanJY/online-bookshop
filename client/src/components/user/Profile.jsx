import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../../styles/Profile.css";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user cookie", err);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/logout`);

      if (response.status === 200) {
        Cookies.remove("bookstore_token");
        Cookies.remove("user");
        console.log("Logout successful");
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.message || "An error occurred while logging out.";
      setError(errorMessage);
      console.error("Error occurred while logging out:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <table className="profile-table">
        <tbody>
          <tr>
            <th>First Name:</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>Last Name:</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
      <div className="profile-button-container">
        <button onClick={handleLogout}>Logout</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Profile;
