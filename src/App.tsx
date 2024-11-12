import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MenCategory from './components/MenCategory/Men';
import WomenCategory from './components/WomenCategory/Women';
import Furniture from './components/Furniture/Furniture';
import HomeDecoration from './components/HomeDecoration/HomeDecoration';
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
            <Route path='/category-men' element={<MenCategory />} />
            <Route path='/category-men/:id' element={<ProductDetailPage />} />
            <Route path='/category-women' element={<WomenCategory />} />
            <Route path='/category-furniture' element={<Furniture />} />
            <Route path='/category-home_decoration' element={<HomeDecoration />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
