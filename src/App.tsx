import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/Context/CartProvider';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ProductListPage from './components/ProductListPage/ProductListPage';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import Checkout from './components/Checkout/Checkout';
import Footer from './components/Footer/Footer';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import './App.css';

function App() {
  return (
    // Wrap the entire application in Router for routing functionality
    <Router>
      {/* Provide global cart context to all components */}
      <CartProvider>
        <div className='app'>
          {/* Persistent header across all pages */}
          <Header />
          <main className='content'>
            <Routes>
              {/* Define routes for each page */}
              <Route path='/' element={<Home />} />
              <Route path='/category/:category' element={<ProductListPage />} />
              <Route path='/category/:category/:id' element={<ProductDetailPage />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='*' element={<NotFoundPage />} /> {/* Catch-all route for undefined paths */}
            </Routes>
          </main>
          {/* Persistent footer across all pages */}
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
