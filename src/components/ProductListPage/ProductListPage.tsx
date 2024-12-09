import { useEffect, useState } from 'react';
import { fetchData } from '../../api';
import { useLocation } from 'react-router-dom';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import './ProductListPage.css';
import { Product, ProductsResponse } from '../../types';

function ProductListPage() {
  // Declare state variables for products, current category, toggle category, supported categories, and loading
  const [products, setProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [toggleCategory, setToggleCategory] = useState<boolean>(false);
  // men and women products have different categories
  const [supportedCategories, setSupportedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();
  const { category, items } = location.state || {};

  useEffect(() => {
    if (items) {
      setSupportedCategories(items.split(','));
    }
  }, [items]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (supportedCategories.length === 0) return;

      const endpoint = supportedCategories[0];
      const productResponse: ProductsResponse | null = await fetchData(endpoint);

      if (productResponse) {
        setCurrentCategory(category || '');
        setProducts(productResponse.products);
      }

      // Introduce a 1-second delay before hiding the loading screen
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, [supportedCategories, category]);

  const handleCategoryChange = async (category: string, endpoint: string) => {
    setToggleCategory(!toggleCategory);
    setCurrentCategory(category);
    const productResponse: ProductsResponse | null = await fetchData(endpoint);

    if (productResponse) {
      setProducts(productResponse.products);
    }
  };

  return (
    <div className='section'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='category'>
            <h3>{currentCategory?.toUpperCase()} PRODUCTS</h3>
            <h3>
              {supportedCategories.length > 1 ? (
                <>
                  <span
                    id='products'
                    className={toggleCategory ? 'active' : 'disabled'}
                    onClick={() => handleCategoryChange(currentCategory, supportedCategories[0])}
                  >
                    {supportedCategories[0].split('-')[1]?.toUpperCase()}
                  </span>
                  <span id='divider'>|</span>
                  <span
                    id='products'
                    className={toggleCategory ? 'disabled' : 'active'}
                    onClick={() => handleCategoryChange(currentCategory, supportedCategories[1])}
                  >
                    {supportedCategories[1].split('-')[1]?.toUpperCase()}
                  </span>
                </>
              ) : null}
            </h3>
          </div>
          <div id='man-products'>
            {products.map((product) => (
              // Render a Card component for each product
              <Card key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductListPage;
