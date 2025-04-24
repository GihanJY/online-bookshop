import React from "react";
import "../styles/bookdetails.css";

function BookDetails() {
    return (
        <div className="book-details-container">
            {/* Book Cover Section */}
            <div className="book-cover-container">
                <img src="/bookcover.jpg" alt="Red Flags and Rishtas" className="book-cover" />
                <span className="discount-badge">20%</span>
            </div>

            {/* Book Info Section */}
            <div className="book-info">
                <h1 className="book-title">Red Flags and Rishtas : A Desi Rom Com</h1>
                <p><strong>Book Publisher:</strong> Bloomsbury</p>
                <p><strong>Book Author:</strong> Radhika Agrawal</p>
                <p><strong>SKU:</strong> 9789361319280</p>

                <div className="price-section">
                    <span className="discounted-price">₹399</span>
                    <span className="original-price">₹499.00</span>
                </div>

                <div className="stock-status">Out of Stock</div>

                <div className="button-group">
                    <button className="book-request-btn">Add To Cart</button>
                    <button className="wishlist-btn">Buy Now</button>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;
