import React from 'react'
import Header from '../../components/user/Header'
import Footer from '../../components/user/Footer';
import Books from '../../components/user/Books';

function BooksScreen() {
  return (
    <div>
        <Header />
        <Books />
        <Footer />
    </div>
  )
}

export default BooksScreen;