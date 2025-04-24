import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import BookDetailsScreen from './screens/bookDetailsScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/book' element={<BookDetailsScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
