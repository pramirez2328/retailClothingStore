import { useState } from 'react';
import ThankYouPage from '../ThankYouPage/ThankYouPage';
import Validation from './Validation';
import CartList from './CartList';
import './Checkout.css';

function Checkout() {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  if (isOrderPlaced) {
    localStorage.removeItem('cart');

    return (
      <div className='checkout-container'>
        <ThankYouPage />
        <CartList isOrderPlaced={isOrderPlaced} />
      </div>
    );
  }

  return (
    <div className='checkout-container'>
      <Validation setIsOrderPlaced={setIsOrderPlaced} />
      <CartList isOrderPlaced={isOrderPlaced} />
    </div>
  );
}

export default Checkout;
