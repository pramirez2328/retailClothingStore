import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ProductListPage from './components/ProductListPage/ProductListPage';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <main className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/category/:category' element={<ProductListPage />} />
            <Route path='/category/:category/:id' element={<ProductDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
