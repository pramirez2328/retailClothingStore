import { useEffect, useState } from 'react';
import { Product } from '../../types';
import Payment from './Payment';
import './Checkout.css';

function Checkout() {
  const [cart, setCart] = useState<Product[]>([]);
  const [counterTotal, setCounterTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cart);
    const total = cart.reduce((acc: number, item: Product) => acc + item.total, 0);
    setCounterTotal(total);
  }, []);

  const handleCounter = (increment: number, id: number) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;
    item.total += increment;
    setCart([...cart]);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCounterTotal(counterTotal + increment);
  };

  return (
    <div className='checkout-container'>
      <Payment />
      {/* Cart Items */}
      <div className='checkout-items'>
        {cart.map((item) => (
          <div key={item.id}>
            <div className='checkout-item'>
              <img className='item-img' src={item.images[0]} alt={item.title} />
              <div>
                <h3 className='item-title'>{item.title}</h3>
                <p className='item-size'>Size: {item.selectedSize}</p>
                <p className='item-price'>Price: ${item.price}</p>
              </div>
            </div>
            <div className='counter'>
              <button className='counter-button' onClick={() => handleCounter(-1, item.id)}>
                -
              </button>
              <input type='text' value={item.total} className='counter-input' readOnly />
              <button className='counter-button' onClick={() => handleCounter(1, item.id)}>
                +
              </button>
            </div>
          </div>
        ))}
        <div className='checkout-total'>
          <h3>Total: ${counterTotal}</h3>

          <button className='checkout-button'>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
