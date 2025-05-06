import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaApple, FaGooglePlay } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import "../../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-area">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-widget">
              <h3 className="footer-title">Chapters</h3>
              <p className="footer-text">
                Your premier destination for discovering and purchasing books across all genres. 
                We're committed to fostering a love for reading in our community.
              </p>
              
              <div className="footer-contact">
                <div className="contact-item">
                  <MdEmail className="contact-icon" />
                  <span>info@Chapters.com</span>
                </div>
                <div className="contact-item">
                  <MdPhone className="contact-icon" />
                  <span>+94 (76) 123-4567</span>
                </div>
                <div className="contact-item">
                  <MdLocationOn className="contact-icon" />
                  <span>123 Book Street, Literary City, Colombo</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-widget">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/books">All Books</Link></li>
                <li><Link to="/new-releases">New Releases</Link></li>
                <li><Link to="/bestsellers">Bestsellers</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-widget">
              <h3 className="footer-title">Categories</h3>
              <ul className="footer-links">
                <li><Link to="/category/fiction">Fiction</Link></li>
                <li><Link to="/category/non-fiction">Non-Fiction</Link></li>
                <li><Link to="/category/science-fiction">Science Fiction</Link></li>
                <li><Link to="/category/biography">Biography</Link></li>
                <li><Link to="/category/children">Children's Books</Link></li>
                <li><Link to="/category/educational">Educational</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-widget">
              <h3 className="footer-title">Newsletter</h3>
              <p className="footer-text">
                Subscribe to our newsletter for the latest book releases and exclusive offers.
              </p>
              
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
              
              <div className="app-download">
                <h4>Get Our App</h4>
                <div className="app-buttons">
                  <a href="#" className="app-btn">
                    <FaApple className="app-icon" />
                    <span>App Store</span>
                  </a>
                  <a href="#" className="app-btn">
                    <FaGooglePlay className="app-icon" />
                    <span>Google Play</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              &copy; {currentYear} Chapters. All rights reserved.
            </div>
            
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
            
            <div className="footer-legal">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;