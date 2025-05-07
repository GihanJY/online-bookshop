import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/user/Header';
import Footer from '../../components/user/Footer';
import BookDetails from '../../components/user/BookDetails';

function BookDetailsScreen() {
  const { id, title, price } = useParams();

  return (
    <div>
      <Header />
      <BookDetails id={id} title={title} price={price} />
      <Footer />
    </div>
  )
}

export default BookDetailsScreen
