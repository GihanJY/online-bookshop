import React from 'react'

import Header from '../components/header';
import Footer from '../components/footer';
import HeroSlider from '../components/hero';
import BookCarousel from '../components/bookCarousel';

const books = [
    { key: 1, title: "The Great Gatsby", price: "799" },
    { key: 2, title: "1984", price: "999" },
    { key: 3, title: "To Kill a Mockingbird", price: "689" },
    { key: 4, title: "Pride and Prejudice", price: "749" },
    { key: 5, title: "The Catcher in the Rye", price: "820" },
    { key: 6, title: "Brave New World", price: "930" },
    { key: 7, title: "The Hobbit", price: "1050" },
    { key: 8, title: "Fahrenheit 451", price: "799" },
    { key: 9, title: "Jane Eyre", price: "890" },
    { key: 10, title: "Moby-Dick", price: "950" }
  ];

function HomeScreen() {
  return (
    <div>
      <Header />
      <HeroSlider />
      <BookCarousel title={'Novel'} bookMap={books}/>
      <BookCarousel title={'Story'} bookMap={books}/>
      <BookCarousel title={'Fiction'} bookMap={books}/>
      <Footer />
    </div>
  )
}

export default HomeScreen
