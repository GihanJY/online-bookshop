import React from 'react';
import '../../styles/About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Learn more about our bookstore and what we offer.</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to connect readers with the books they love. We aim to provide a wide range of books, excellent customer service, and a seamless shopping experience for book enthusiasts everywhere.
          </p>

          <h2>What We Do</h2>
          <p>
            We specialize in offering a curated selection of books across various genres, including fiction, non-fiction, academic, and children's literature. Whether you're looking for the latest bestseller or a timeless classic, we've got you covered.
          </p>

          <h2>Why Choose Us</h2>
          <ul>
            <li>Extensive collection of books</li>
            <li>Affordable prices and great deals</li>
            <li>Fast and reliable delivery</li>
            <li>Friendly and knowledgeable staff</li>
          </ul>
        </div>

        <div className="about-image">
          <img src="/logo.png" alt="Books on a shelf" />
        </div>
      </div>
    </div>
  );
}

export default About;
