import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Books.css';

function Books() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState([]);

  const fetchBooks = React.useCallback(async () => {
    try {
      const queries = filters.length > 0 ? filters : ['novel', 'fiction', 'mystery', 'science', 'history'];
      const responses = await Promise.all(
        queries.map(query =>
          axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&country=US&maxResults=20`)
        )
      );
      
      const allBooks = responses.flatMap(response => 
        response.data.items ? response.data.items : []
      );
      
      // Remove duplicates
      const uniqueBooks = allBooks.filter(
        (book, index, self) => index === self.findIndex(b => b.id === book.id)
      );
      
      setBooks(uniqueBooks);
    } catch (error) {
      setError(error);
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${keyword}&country=US&maxResults=40`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      setError(error);
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

  const handleBookSelect = (id, title) => {
    navigate(`/book/${id}/${title}`);
  }

  return (
    <div>
      <h1>Books</h1>
    <div className="books-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error loading books. Please try again later.</p>}
      {!loading && !error && books.length === 0 && <p>No books found!</p>}
      
      <div className='side-filter-bar'>
        <form onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            value={keyword}
            onChange={handleSearchKeyword} 
            placeholder="Search books..."
          />
          <button type="submit">Search</button>
        </form>
        
        <div className="filter-options">
          <label>
            <input 
              type="checkbox" 
              checked={filters.includes('novel')}
              onChange={() => handleFilterChange('novel')} 
            />
            Novel
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={filters.includes('fiction')}
              onChange={() => handleFilterChange('fiction')} 
            />
            Fiction
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={filters.includes('science')}
              onChange={() => handleFilterChange('science')} 
            />
            Science
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={filters.includes('fairy')}
              onChange={() => handleFilterChange('fairy')} 
            />
            Fairy Tales
          </label>
        </div>
      </div>
      
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card" onClick={() => handleBookSelect(book.id, book.volumeInfo.title)}>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || '/bookcover.jpg'}
              alt={book.volumeInfo.title}
              className="book-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/128x193?text=No+Image';
              }}
            />
            <h3 className="book-carousel-item-title">{book.volumeInfo.title}</h3>
                  <p className="book-carousel-item-authors">{book.volumeInfo.authors}</p>
                  <p className="book-carousel-item-price">Rs. {book.volumeInfo.price}</p>
                  <div className="book-carousel-buttons">
                    <button
                      className="book-carousel-addcart-button"
                    >
                      Add to Cart
                    </button>
                    <button className="book-carousel-buynow-button">
                      Buy Now
                    </button>
                  </div>
          </div>
        ))}
      </div>
    </div></div>
  );
}

export default Books;