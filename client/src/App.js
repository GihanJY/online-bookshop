import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomeScreen from './screens/user/HomeScreen';
import BookDetailsScreen from './screens/user/BookDetailsScreen';
import LoginScreen from './screens/user/LoginScreen';
import RegisterScreen from './screens/user/RegisterScreen';
import CartScreen from './screens/user/CartScreen';
import BooksScreen from './screens/user/BooksScreen';
import AboutScreen from './screens/user/AboutScreen';
import PaymentGateway from './components/user/PaymentGateway';
import Success from './components/user/PaymentSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/books' element={<BooksScreen />} />
        <Route path='/about' element={<AboutScreen />} />
        <Route path='/book/:id/:title' element={<BookDetailsScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/profile' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/cart' element={<CartScreen />} />
        <Route path='/payment' element={<PaymentGateway />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
