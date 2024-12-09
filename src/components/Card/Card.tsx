import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import './Card.css';

function Card({ product }: { product: Product }) {
  const navigate = useNavigate();

  // Navigate to the product detail page
  const goToProductDetail = () => {
    navigate(`././${product.id}`, { state: { product } });
  };

  return (
    <div className='card' onClick={goToProductDetail} style={{ cursor: 'pointer' }}>
      <img className='product-image' src={product.images[0]} alt={product.title} />
      <h3 className='title'>{product.title}</h3>
      <p className='product-info brand'>{product.brand ? product.brand : 'Armany'}</p>
      <p className='product-info'>${product.price}</p>
      <p className='product-info'>{product.availabilityStatus}</p>
    </div>
  );
}

export default Card;
