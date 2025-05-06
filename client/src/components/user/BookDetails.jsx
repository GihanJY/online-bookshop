import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/BookDetails.css";
import { handleAddToCart } from "../../utils/cartUtils";

function BookDetails({ id, title }) {
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
  }, [id, title]);

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

  const handleAddToCard = () => {
    console.log("Add to cart clicked");
  };

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
              Rs.{" "}
              {saleInfo?.retailPrice?.amount
                ? Math.round(saleInfo.retailPrice.amount * 150)
                : "N/A"}
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
            <button className="wishlist-btn">Buy Now</button>
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
