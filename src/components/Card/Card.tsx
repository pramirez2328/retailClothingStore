import { Product } from '../../types';

import './Card.css';

function Card({ product }: { product: Product }) {
  return (
    <div className='card'>
      <img className='product-image' src={product.images[0]} alt={product.title} />
      <h3 className='title'>{product.title}</h3>
      <p className='product-info brand'>{product.brand}</p>
      <p className='product-info'>${product.price}</p>
      <p className='product-info'>{product.availabilityStatus}</p>
    </div>
  );
}

export default Card;
