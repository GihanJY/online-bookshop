import React from 'react';
import '../../styles/About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Get to know who we are and what we do.</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver high-quality digital solutions that empower businesses and individuals to achieve their goals.
            We are passionate about innovation, excellence, and building lasting relationships with our clients.
          </p>

          <h2>What We Do</h2>
          <p>
            We specialize in software development, UI/UX design, and cloud-based services. Our team consists of dedicated professionals
            with years of experience in the industry, ready to tackle complex problems with creative solutions.
          </p>

          <h2>Why Choose Us</h2>
          <ul>
            <li>Customer-first approach</li>
            <li>Experienced and certified team</li>
            <li>Transparent process and communication</li>
            <li>End-to-end project delivery</li>
          </ul>
        </div>

        <div className="about-image">
          <img src="/logo.png" alt="Team working" />
        </div>
      </div>
    </div>
  );
}

export default About;
