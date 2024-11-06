import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MenCategory from './components/MenCategory/Men';
import WomenCategory from './components/WomenCategory/Women';
import Furniture from './components/Furniture/Furniture';
import HomeDecoration from './components/HomeDecoration/HomeDecoration';
import './App.css';
// import { useEffect } from 'react';

function App() {
  // https://dummyjson.com/
  // const apiCall = async () => {
  //   fetch('https://dummyjson.com/products/categories')
  //     .then((res) => res.json())
  //     .then((json) => console.log(json));
  // };

  // useEffect(() => {
  //   apiCall();
  // }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category-men' element={<MenCategory />} />
        <Route path='/category-women' element={<WomenCategory />} />
        <Route path='/category-furniture' element={<Furniture />} />
        <Route path='/category-home_decoration' element={<HomeDecoration />} />
      </Routes>
    </Router>
  );
}

export default App;
