import axios from 'axios';
import React, { useState, useEffect } from 'react'

import Header from '../../components/user/Header';
import Footer from '../../components/user/Footer';
import HeroSlider from '../../components/user/Hero';
import BookCarousel from '../../components/user/BookCarousel';

function HomeScreen() {
  const [novelBooks, setNovelBooks] = useState([]);
  const [storyBooks, setStoryBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);


  useEffect(() => {
    const fetchNovelBooks = async () => {
      const novelResponse = await axios.get('https://www.googleapis.com/books/v1/volumes?q=novel&maxResults=11&country=US');
      setNovelBooks(novelResponse.data.items);
    }
    const fetchStoryBooks = async () => {
      const storyResponse = await axios.get('https://www.googleapis.com/books/v1/volumes?q=story&maxResults=11&country=US');
      setStoryBooks(storyResponse.data.items);
    }
    const fetchFictionBooks = async () => {
      const fictionResponse = await axios.get('https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=11&country=US');
      setFictionBooks(fictionResponse.data.items);
    }
    fetchNovelBooks();
    fetchStoryBooks();
    fetchFictionBooks();
  }, []);

  return (
    <div>
      <Header />
      <HeroSlider />
      <BookCarousel title={'Novel'} bookMap={novelBooks}/>
      <BookCarousel title={'Story'} bookMap={storyBooks}/>
      <BookCarousel title={'Fiction'} bookMap={fictionBooks}/>
      <Footer />
    </div>
  )
}

export default HomeScreen
