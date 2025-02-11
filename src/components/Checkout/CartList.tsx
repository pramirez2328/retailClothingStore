import { useEffect, useState } from 'react';
import { useCart } from '../Context/CartProvider';
import { Product } from '../../types';
import './Checkout.css';

function CartList({ isOrderPlaced }: { isOrderPlaced: boolean }) {
  const { addItemToCart, removeItemFromCart, removeAllItemsFromOneGarment } = useCart();
  const [cart, setCart] = useState<Product[]>([]);
  const [purchaseTotal, setPurchaseTotal] = useState(0);

  // Calculate and update the total
  const calculateTotal = (updatedCart: Product[]) => {
    const total = updatedCart.reduce((acc: number, item: Product) => acc + item.price * item.orderQty, 0).toFixed(2);
    setPurchaseTotal(parseFloat(total));
  };

  // Load the cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Handle increment/decrement of item quantity
  const handleCounter = (increment: number, id: number, selectedSize: string) => {
    //if increment is -1 and orderQty is 1, remove the item from local storage and call either addItemToCart or removeItemFromCart
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.selectedSize === selectedSize) {
        if (increment === -1 && item.orderQty > 1) {
          removeItemFromCart();
          return { ...item, orderQty: item.orderQty - 1 };
        } else if (increment === 1 && item.selectedSize === selectedSize) {
          addItemToCart();
          return { ...item, orderQty: item.orderQty + 1 };
        }
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleRemove = (item: Product) => {
    const updatedCart = cart.filter(
      (cartItem) => cartItem.id !== item.id || cartItem.selectedSize !== item.selectedSize
    );

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    removeAllItemsFromOneGarment(item.orderQty);
  };

  return (
    <div className='checkout-items'>
      {cart.map((item) => (
        <div key={`${item.id}-${item.selectedSize}`} className='single-item'>
          <div className='checkout-item'>
            <img className='item-img' src={item.images[0]} alt={item.title} />
            <div>
              <h3 className='item-title'>{item.title}</h3>
              <p className='item-size'>Size: {item.selectedSize}</p>
              <p className='item-price'>Price: ${item.price}</p>
            </div>
          </div>
          {isOrderPlaced ? null : (
            <div className='checkout-updates'>
              <div className='counter'>
                <button
                  className='counter-button'
                  onClick={() => handleCounter(-1, item.id, item.selectedSize)}
                  aria-label='Decrease quantity'
                  {...(item.orderQty === 1 ? { disabled: true } : {})}
                >
                  -
                </button>
                <input
                  type='text'
                  value={item.orderQty}
                  className='counter-input'
                  readOnly
                  aria-label={`Quantity of ${item.title}`}
                />
                <button
                  className='counter-button'
                  onClick={() => handleCounter(1, item.id, item.selectedSize)}
                  aria-label='Increase quantity'
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className='remove-button'
                  onClick={() => handleRemove(item)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className='checkout-total'>
        <h3>Total: ${purchaseTotal}</h3>
      </div>
    </div>
  );
}

export default CartList;
