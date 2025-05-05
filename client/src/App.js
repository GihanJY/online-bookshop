import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomeScreen from './screens/user/HomeScreen';
import BookDetailsScreen from './screens/user/BookDetailsScreen';
import LoginScreen from './screens/user/LoginScreen';
import RegisterScreen from './screens/user/RegisterScreen';
import ManageBooks from './screens/admin/ManageBooks';
import ManageUsers from './screens/admin/ManageUsers';
import CartScreen from './screens/user/CartScreen';
import DashboardScreen from './screens/admin/DashboardScreen';
import AdminLogin from './components/admin/AdminLogin';
import BooksScreen from './screens/user/BooksScreen';
import AboutScreen from './screens/user/AboutScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/books' element={<BooksScreen />} />
        <Route path='/about' element={<AboutScreen />} />
        <Route path='/book/:id/:title' element={<BookDetailsScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/cart' element={<CartScreen />} />

        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<DashboardScreen />} />
        <Route path='/admin/managebooks' element={<ManageBooks />} />
        <Route path='/admin/manageusers' element={<ManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
