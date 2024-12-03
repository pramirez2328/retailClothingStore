import { useState } from 'react';
import './Checkout.css';

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Order placed successfully!');
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <form className='checkout-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='first-name'>First Name</label>
          <input type='text' id='first-name' name='first-name' required />
        </div>
        <div className='form-group'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' name='last-name' required />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' required />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <input type='text' id='address' name='address' required />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' name='city' required />
        </div>
        <div className='form-group'>
          <label htmlFor='state'>State</label>
          <input type='text' id='state' name='state' required />
        </div>
        <div className='form-group'>
          <label htmlFor='zip'>Zip Code</label>
          <input type='text' id='zip' name='zip' required />
        </div>

        {/* Payment Method */}
        <div className='form-group'>
          <label htmlFor='payment-method'>Payment Method</label>
          <select
            id='payment-method'
            name='payment-method'
            value={paymentMethod}
            onChange={handlePaymentChange}
            required
          >
            <option value='' disabled>
              Credit Card
            </option>
            <option value='visa'>Visa</option>
            <option value='mastercard'>Mastercard</option>
            <option value='discover'>Discover</option>
            <option value='american-express'>American Express</option>
          </select>
        </div>

        {/* Credit Card Fields */}
        {paymentMethod && (
          <div id='credit-card-fields'>
            <div className='form-group'>
              <label htmlFor='card-number'>Card Number</label>
              <input
                type='text'
                id='card-number'
                name='card-number'
                maxLength={16}
                placeholder='1234 5678 9012 3456'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='expiration-date'>Expiration Date</label>
              <input type='month' id='expiration-date' name='expiration-date' required />
            </div>
            <div className='form-group'>
              <label htmlFor='cvv'>CVV</label>
              <input type='text' id='cvv' name='cvv' maxLength={3} placeholder='123' required />
            </div>
          </div>
        )}

        <button type='submit' className='checkout-button'>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Payment;