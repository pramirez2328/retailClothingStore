import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/Context/CartProvider';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ProductListPage from './components/ProductListPage/ProductListPage';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import Checkout from './components/Checkout/Checkout';
import Footer from './components/Footer/Footer';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Auth/Profile';

import './App.css';

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Converts to boolean (true/false)
};

// Protected Route Component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to='/login' replace />;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className='app'>
          <Header />
          <main className='content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/category/:category' element={<ProductListPage />} />
              <Route path='/category/:category/:id' element={<ProductDetailPage />} />
              <Route path='/checkout' element={<ProtectedRoute element={<Checkout />} />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<ProtectedRoute element={<Profile />} />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
