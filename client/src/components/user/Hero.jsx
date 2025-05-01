import React ,{ useEffect, useState} from "react";
import '../../styles/Hero.css'

const heroSlides = [
    {id:1, title: "Welcome to our site", subtitle: "Buy book, Read, Inspiron"},
    {id:2, title: "Reading make you fill", subtitle: "Gather knowledge to become a star amoung others"},
    {id:3, title: "Sonia Elizaboth", subtitle: "A new book releaze. Check it out"},
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-slider">
            <div className="hero-slider-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {heroSlides.map((slide) => (
                    <div className="hero-slide" key={slide.id}>
                        <h1>{slide.title}</h1>
                        <p>{slide.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;