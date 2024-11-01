import Header from './components/Header/Header';
import './App.css';
import { useEffect } from 'react';

function App() {
  // https://dummyjson.com/
  const apiCall = async () => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
