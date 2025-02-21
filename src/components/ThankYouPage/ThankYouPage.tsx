import { useEffect, useState } from 'react';
import './ThankYouPage.css';
import { useCart } from '../Context/CartProvider';

function ThankYouPage() {
  const { clearCart, currentCart } = useCart();
  const [orderId, setOrderId] = useState('');

  const sendPurchaseToBackend = async () => {
    try {
      const token = localStorage.getItem('token'); // Get JWT token
      if (!token) {
        console.error('🚨 No authentication token found. User must be logged in.');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/purchases/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ items: currentCart })
      });

      const data = await response.json();
      if (response.ok) {
        console.log('✅ Purchase sent successfully:', data);
        setOrderId(data.purchaseId);
        clearCart();
      } else {
        console.error('🚨 Failed to send purchase:', data.error);
      }
    } catch (err) {
      console.error('🚨 Error sending purchase:', err);
    }
  };

  useEffect(() => {
    if (currentCart && currentCart.length) {
      sendPurchaseToBackend();
    }
    // eslint-disable-next-line
  }, [currentCart]);

  return (
    <div className='thank-you-page'>
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been placed successfully.</p>
      <p>
        <strong>Order ID:</strong>{' '}
      </p>
      <p>{orderId}</p>
      <p>We appreciate your business and hope to serve you again soon.</p>
    </div>
  );
}

export default ThankYouPage;
