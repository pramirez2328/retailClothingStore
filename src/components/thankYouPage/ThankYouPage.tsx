import { useEffect } from 'react';
import './ThankYouPage.css';
import { useCart } from '../Context/CartProvider';

function ThankYou() {
  const { clearCart, currentCart } = useCart();
  // Generate a random order ID
  const generateOrderId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
    for (let i = 0; i < 10; i++) {
      orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderId;
  };

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line
  }, []);

  console.log(currentCart);

  return (
    <div className='thank-you-page'>
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been placed successfully.</p>
      <p>
        <strong>Order ID:</strong> {generateOrderId()}
      </p>
      <p>We appreciate your business and hope to serve you again soon.</p>
    </div>
  );
}

export default ThankYou;
