import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const BookCarousel = ({ title, bookMap }) => {
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
        
        // Adjust settings based on container width
        if (containerWidth < 600) {
          // Mobile
          setItemWidth(containerWidth * 0.8);
          setGap(10);
          setItemsPerPage(1);
        } else if (containerWidth < 900) {
          // Tablet
          setItemWidth(180);
          setGap(15);
          setItemsPerPage(Math.floor((containerWidth + gap) / (itemWidth + gap)));
        } else {
          // Desktop
          setItemWidth(200);
          setGap(20);
          setItemsPerPage(Math.floor((containerWidth + gap) / (itemWidth + gap)));
        }
      }
    };

    updateResponsiveSettings();
    
    const resizeObserver = new ResizeObserver(updateResponsiveSettings);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const interval = setInterval(() => {
      setCurrentPage((prev) => {
        const maxPage = Math.ceil(bookMap.length / itemsPerPage) - 1;
        return prev >= maxPage ? 0 : prev + 1;
      });
    }, 5000);

    return () => {
      resizeObserver.disconnect();
      clearInterval(interval);
    };
  }, [bookMap.length, itemsPerPage, itemWidth, gap]);

  const translateX = `-${currentPage * (itemWidth + gap) * itemsPerPage}px`;

  const handleBookNavitation = (page) => {
    setCurrentPage(page);
    navigate('/book');
  };

  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflow: "hidden" }} ref={containerRef}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{title}</h1>
      
      <div style={{ position: "relative" }}>
        <div
          style={{
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 0.5s ease-in-out",
              transform: `translateX(${translateX})`,
              gap: `${gap}px`,
            }}
          >
            {bookMap.map((book) => (
              <div
              onClick={handleBookNavitation}
                key={book.key}
                style={{
                  minWidth: `${itemWidth}px`,
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/bookcover.jpg"
                  alt={book.title}
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    maxHeight: "200px",
                    objectFit: "contain",
                    marginBottom: "10px" 
                  }}
                />
                <h3 style={{ fontSize: "1rem", margin: "5px 0" }}>{book.title}</h3>
                <p style={{ margin: "5px 0" }}>Rs. {book.price}</p>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  gap: "10px",
                  flexWrap: "wrap"
                }}>
                  <button style={{ padding: "5px 10px" }}>Add to Cart</button>
                  <button style={{ padding: "5px 10px" }}>Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCarousel;