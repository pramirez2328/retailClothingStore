import { useEffect, useState } from 'react';
import { manShirts, manShoes } from '../../api';
import { useLocation } from 'react-router-dom';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import './ProductListPage.css';
import { Product, ProductsResponse } from '../../types';

function ProductListPage() {
  const [shirts, setShirts] = useState<Product[]>([]);
  const [shoes, setShoes] = useState<Product[]>([]);
  const [toggleCategory, setToggleCategory] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();
  const { items } = location.state || {};
  console.log(items);

  useEffect(() => {
    const fetchData = async () => {
      const shirtsResponse: ProductsResponse = await manShirts();
      setShirts(shirtsResponse.products);
      const shoesResponse: ProductsResponse = await manShoes();
      setShoes(shoesResponse.products);

      // Introduce a 1-second delay before hiding the loading screen
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category: string) => {
    setToggleCategory(category === 'shirts');
  };

  return (
    <div className='section'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='category'>
            <h2>Men Products</h2>
            <h3>
              <span
                id='shirts'
                className={toggleCategory ? 'disabled' : 'active'}
                onClick={() => handleCategoryChange('shirts')}
              >
                Shirts
              </span>
              <span id='separator'>|</span>
              <span
                id='shoes'
                className={toggleCategory ? 'active' : 'disabled'}
                onClick={() => handleCategoryChange('shoes')}
              >
                Shoes
              </span>
            </h3>
          </div>
          <div id='man-products'>
            {toggleCategory
              ? shirts.map((product) => <Card key={product.id} product={product} category='category-men' />)
              : shoes.map((product) => <Card key={product.id} product={product} category='category-men' />)}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductListPage;
