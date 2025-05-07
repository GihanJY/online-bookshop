import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { handleAddToCart } from "../../utils/cartUtils";
import { useAuth } from "../../context/AuthContext";
import "../../styles/BookDetails.css";

function BookDetails({ id, title, price }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        let response;
        try {
          response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${id}`
          );
          if (!response.data.items || response.data.items.length === 0) {
            response = await axios.get(
              `https://www.googleapis.com/books/v1/volumes?q=${title}`
            );
          }
        } catch (err) {
          response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${title}`
          );
        }
        if (response.data.items && response.data.items.length > 0) {
          setBook(response.data.items[0]);
        } else {
          setError("Book not found");
        }
      } catch (err) {
        setError("Error fetching book details");
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, title, price]);

  if (loading) {
    return <div className="book-details-container">Loading...</div>;
  }

  if (error) {
    return <div className="book-details-container">{error}</div>;
  }

  if (!book) {
    return (
      <div className="book-details-container">No book details available</div>
    );
  }

  const { volumeInfo, saleInfo } = book;

  return (
    <div className="book-details-container">
      <div className="book-container">
        {/* Book Cover Section */}
        <div className="book-cover-container">
          <img
            src={book.volumeInfo?.imageLinks?.thumbnail || "/bookcover.jpg"}
            alt={volumeInfo?.title || "book cover"}
            className="book-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/bookcover.jpg";
            }}
          />
        </div>

        {/* Book Info Section */}
        <div className="book-info">
          <h1 className="book-title">{volumeInfo?.title || "Untitled"}</h1>
          <p>
            <strong>Book Publisher:</strong>{" "}
            {volumeInfo?.publisher || "Unknown"}
          </p>
          <p>
            <strong>Book Author:</strong>{" "}
            {volumeInfo?.authors?.join(", ") || "Unknown"}
          </p>
          <p>
            <strong>Page Count:</strong> {volumeInfo?.pageCount || "N/A"}
          </p>
          <p>
            <strong>ISBN:</strong>{" "}
            {volumeInfo?.industryIdentifiers?.[1]?.identifier || "N/A"}
          </p>

          <div className="price-section">
            <span className="original-price">
              $.{parseFloat(price).toFixed(2)}
            </span>
          </div>

          <div className="stock-status">In Stock</div>

          <div className="button-group">
            <button
              className="book-request-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(id, title, 1);
              }}
            >
              Add To Cart
            </button>
            <button className="wishlist-btn" onClick={(e) => {
              e.stopPropagation();
              if (isLoggedIn) {
                localStorage.setItem('checkout_cart', JSON.stringify(book));
                localStorage.setItem('checkout_total', price);
                navigate("/payment");
              }
              else {
                navigate("/login");
                alert("Please login to buy the book.");
              }
            }}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className="book-description">
        <h2>Description</h2>
        <p>{volumeInfo?.description || "No description available"}</p>
      </div>
    </div>
  );
}

export default BookDetails;
