import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiFilter, FiX, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import '../../styles/Books.css';

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');

  const defaultFilters = ['fiction', 'science', 'history', 'biography', 'fantasy'];

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queries = filters.length > 0 ? filters : defaultFilters;
      const responses = await Promise.all(
        queries.map(query =>
          axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&country=US&maxResults=20`)
        )
      );

      const allBooks = responses.flatMap(response =>
        response.data.items ? response.data.items : []
      );

      const uniqueBooks = allBooks.filter(
        (book, index, self) =>
          index === self.findIndex(b => b.id === book.id) &&
          book.volumeInfo?.title &&
          book.volumeInfo?.authors
      );

      const sortedBooks = sortBooks(uniqueBooks, sortOption);
      setBooks(sortedBooks);
    } catch (error) {
      setError(error.message || "Failed to fetch books");
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortOption]);

  const sortBooks = (books, option) => {
    const sorted = [...books];
    switch (option) {
      case 'title':
        return sorted.sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
      case 'newest':
        return sorted.sort((a, b) =>
          new Date(b.volumeInfo.publishedDate || 0) - new Date(a.volumeInfo.publishedDate || 0)
        );
      case 'rating':
        return sorted.sort((a, b) =>
          (b.volumeInfo.averageRating || 0) - (a.volumeInfo.averageRating || 0)
        );
      default:
        return sorted;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${keyword}&country=US&maxResults=40`
      );
      const filteredBooks = (response.data.items || []).filter(
        book => book.volumeInfo?.title && book.volumeInfo?.authors
      );
      setBooks(sortBooks(filteredBooks, sortOption));
    } catch (error) {
      setError(error.message || "Search failed");
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getBookPrice = (book) => {
    if (book.saleInfo?.saleability === "30") {
      return 0;
    }

    return (
      book.saleInfo?.retailPrice?.amount ||
      book.saleInfo?.listPrice?.amount ||
      Math.floor(Math.random() * 20) + 5
    );
  };

  const renderBookPrice = (book) => {
    const price = getBookPrice(book);
    return (
      <span className={`price ${price === 0 ? 'free' : ''}`}>
        {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
      </span>
    );
  };

  const handleBookSelect = (id, title, price) => {
    navigate(`/book/${id}/${encodeURIComponent(title)}/${price}`);
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }

    return (
      <div className="rating">
        {stars}
        <span className="rating-count">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="books-page">
      <div className="books-header">
        <h1>Discover Your Next Read</h1>
        <p className="subtitle">Browse our curated collection of books</p>

        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <div className="search-input-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by title"
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </div>
        </form>
      </div>

      <div className="books-content">
        <div className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button
              className="close-filters"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
            >
              <FiX />
            </button>
          </div>

          <div className="filter-section">
            <h4>Sort By</h4>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="relevance">Relevance</option>
              <option value="title">Title (A-Z)</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

          <div className="filter-section">
            <h4>Categories</h4>
            <div className="filter-options">
              {defaultFilters.map(filter => (
                <label key={filter} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.includes(filter)}
                    onChange={() => handleFilterChange(filter)}
                  />
                  <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            className="apply-filters"
            onClick={() => setIsFilterOpen(false)}
          >
            Apply Filters
          </button>
        </div>

        <div className="books-main">
          <div className="books-toolbar">
            <button
              className="mobile-filter-button"
              onClick={() => setIsFilterOpen(true)}
            >
              <FiFilter /> Filters
            </button>
            <div className="results-count">
              {books.length} {books.length === 1 ? 'book' : 'books'} found
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <FiLoader className="spinner" />
              <p>Loading books...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <FiAlertCircle className="error-icon" />
              <p>{error}</p>
              <button onClick={fetchBooks} className="retry-button">
                Try Again
              </button>
            </div>
          ) : books.length === 0 ? (
            <div className="empty-state">
              <p>No books found matching your criteria</p>
              <button
                onClick={() => {
                  setKeyword('');
                  setFilters([]);
                  fetchBooks();
                }}
                className="reset-button"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="books-grid">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="book-card"
                  onClick={() =>
                    handleBookSelect(book.id, book.volumeInfo.title, getBookPrice(book))
                  }
                >
                  <div className="book-image-container">
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail || '/book-cover-placeholder.png'}
                      alt={book.volumeInfo.title}
                      className="book-image"
                      onError={(e) => {
                        e.target.src = '/book-cover-placeholder.png';
                      }}
                    />
                    {book.volumeInfo.averageRating && (
                      <div className="book-rating-badge">
                        {renderRatingStars(book.volumeInfo.averageRating)}
                      </div>
                    )}
                  </div>

                  <div className="book-details">
                    <h3 className="book-title">{book.volumeInfo.title}</h3>
                    <p className="book-author">
                      {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                    </p>
                    {renderBookPrice(book)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Books;
