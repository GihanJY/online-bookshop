import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Hero.css';

const heroSlides = [
    {
        id: 1,
        title: "Welcome to Our Bookstore",
        subtitle: "Discover your next favorite read from our curated collection",
        cta: "Browse Collection",
        bgColor: "linear-gradient(135deg,rgb(0, 16, 87) 0%,rgb(190, 183, 199) 100%)"
    },
    {
        id: 2,
        title: "Expand Your Horizons",
        subtitle: "Knowledge is power - fuel your mind with our bestsellers",
        cta: "View Bestsellers",
        bgColor: "linear-gradient(135deg,rgb(255, 209, 217) 0%,rgb(86, 0, 37) 100%)"
    },
    {
        id: 3,
        title: "New Release: Sonia Elizabeth",
        subtitle: "The acclaimed author's latest masterpiece is now available",
        cta: "Learn More",
        bgColor: "linear-gradient(135deg,rgb(0, 48, 88) 0%,rgb(112, 244, 251) 100%)"
    },
];

const HeroSlider = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        
        return () => clearInterval(interval);
    }, [nextSlide, isPaused]);

    return (
        <section className="hero-slider">
            <div 
                className="hero-slider-inner" 
                style={{ 
                    transform: `translateX(-${currentSlide * 100}%)`,
                    transition: 'transform 800ms cubic-bezier(0.645, 0.045, 0.355, 1)'
                }}
            >
                {heroSlides.map((slide) => (
                    <div 
                        className="hero-slide" 
                        key={slide.id}
                        style={{ background: slide.bgColor }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="hero-content">
                            <h1 className="hero-title">{slide.title}</h1>
                            <p className="hero-subtitle">{slide.subtitle}</p>
                            <button className="hero-cta" onClick={(e) => {
                                e.preventDefault();
                                navigate('/books')}}
                                >{slide.cta}</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button 
                className="hero-nav hero-nav-prev" 
                onClick={prevSlide}
                aria-label="Previous slide"
            >
                &lt;
            </button>
            <button 
                className="hero-nav hero-nav-next" 
                onClick={nextSlide}
                aria-label="Next slide"
            >
                &gt;
            </button>

            {/* Pagination Dots */}
            <div className="hero-pagination">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;