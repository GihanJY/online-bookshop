import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/BookCarousel.css";

const BookCarousel = ({ title, bookMap = [] }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [gap, setGap] = useState(20);
  const [itemWidth, setItemWidth] = useState(200);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const updateResponsiveSettings = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        let newItemWidth, newGap, newItemsPerPage;

        if (containerWidth < 600) {
          newItemWidth = containerWidth * 0.8;
          newGap = 10;
          newItemsPerPage = 1;
        } else if (containerWidth < 900) {
          newItemWidth = 180;
          newGap = 15;
          newItemsPerPage = Math.floor((containerWidth + newGap) / (newItemWidth + newGap));
        } else {
          newItemWidth = 200;
          newGap = 20;
          newItemsPerPage = Math.floor((containerWidth + newGap) / (newItemWidth + newGap));
        }

        setItemWidth(newItemWidth);
        setGap(newGap);
        setItemsPerPage(newItemsPerPage);
      }
    };

    updateResponsiveSettings();

    const resizeObserver = new ResizeObserver(updateResponsiveSettings);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // Only start auto-scrolling if there are books to display
    const interval =
      bookMap.length > 0
        ? setInterval(() => {
            setCurrentPage((prev) => {
              const maxPage = Math.ceil(bookMap.length / itemsPerPage) - 1;
              return prev >= maxPage ? 0 : prev + 1;
            });
          }, 5000)
        : null;

    return () => {
      resizeObserver.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [bookMap.length, itemsPerPage, itemWidth, gap]);

  const translateX = `-${currentPage * (itemWidth + gap) * itemsPerPage}px`;

  const handleBookNavigation = (id, title) => {
    navigate(`/book/${id}/${title}`);
  };

  if (!bookMap || bookMap.length === 0) {
    return (
      <div className="book-carousel-container" ref={containerRef}>
        <h1 className="book-carousel-title">{title}</h1>
        <p style={{ textAlign: "center" }}>
          No books available in this category
        </p>
      </div>
    );
  }

  const handleLocalBookStore = (bookId, quantity) => {
    try {
      // Validate inputs
      if (!bookId || typeof quantity !== 'number' || quantity <= 0) {
        console.error('Invalid input parameters for handleLocalBookStore:', { bookId, quantity });
        return;
      }

      const existingCart = JSON.parse(localStorage.getItem('guest_cart')) || [];

      const updatedCart = [...existingCart];
      const index = updatedCart.findIndex(item => item.BookID === bookId);

      if (index >= 0) {
        updatedCart[index].Quantity += quantity;
        console.log('Updated cart:', updatedCart);
      } else {
        updatedCart.push({ BookID: bookId, Quantity: quantity });
        console.log('Added new item to cart:', { BookID: bookId, Quantity: quantity });
      }

      localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className="book-carousel-container" ref={containerRef}>
      <h1 className="book-carousel-title">{title}</h1>

      <div className="book-carousel-wrapper">
        <div className="book-carousel-content">
          <div
            className="book-carousel-items"
            style={{
              "--book-carousel-gap": `${gap}px`,
              "--book-carousel-item-width": `${itemWidth}px`,
              transform: `translateX(${translateX})`,
            }}
          >
            {bookMap.map((book, index) => {
              const volumeInfo = book.volumeInfo || {};
              const id =
                volumeInfo.industryIdentifiers?.[0]?.identifier || "N/A";
              const title = volumeInfo.title || "Untitled";
              const authors = volumeInfo.authors?.join(", ") || "Unknown";
              const price = book.saleInfo?.retailPrice?.amount
                ? book.saleInfo.retailPrice.amount * 290
                : "N/A";
              const image =
                volumeInfo.imageLinks?.thumbnail || "/bookcover.jpg";
              const bookId = book.id || `book-${index}`;

              return (
                <div
                  key={bookId}
                  onClick={() => handleBookNavigation(id, title)}
                  className="book-carousel-item"
                >
                  <img
                    src={image}
                    alt={title}
                    className="book-carousel-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/bookcover.jpg";
                    }}
                  />
                  <h3 className="book-carousel-item-title">{title}</h3>
                  <p className="book-carousel-item-authors">{authors}</p>
                  <p className="book-carousel-item-price">Rs. {price}</p>
                  <div className="book-carousel-buttons">
                    <button
                      className="book-carousel-addcart-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLocalBookStore(id, 1);
                      }}
                    >
                      Add to Cart
                    </button>
                    <button className="book-carousel-buynow-button">
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCarousel;
