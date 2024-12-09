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
    <Router>
      <CartProvider>
        <div className='app'>
          <Header />
          <main className='content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/category/:category' element={<ProductListPage />} />
              <Route path='/category/:category/:id' element={<ProductDetailPage />} />
              <Route path='/checkout' element={<Checkout />} />
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
