import { useState } from 'react';

function Validation({ setIsOrderPlaced }: { setIsOrderPlaced: (isOrderPlaced: boolean) => void }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formErrors: Record<string, string> = {};

    // Basic validation
    const requiredFields = ['first-name', 'last-name', 'email', 'address', 'city', 'state', 'zip'];
    requiredFields.forEach((field) => {
      if (!formData.get(field)?.toString().trim()) {
        formErrors[field] = `${field.replace('-', ' ')} is required`;
      }
    });

    // Email validation
    const email = formData.get('email')?.toString() || '';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    // Credit card validation
    if (paymentMethod) {
      const cardNumber = formData.get('card-number')?.toString() || '';
      const expirationDate = formData.get('expiration-date')?.toString() || '';
      const cvv = formData.get('cvv')?.toString() || '';

      if (!/^\d{16}$/.test(cardNumber)) {
        formErrors['card-number'] = 'Card number must be 16 digits';
      }

      if (!expirationDate) {
        formErrors['expiration-date'] = 'Expiration date is required';
      }

      if (!/^\d{3}$/.test(cvv)) {
        formErrors['cvv'] = 'CVV must be 3 digits';
      }
    } else {
      formErrors['payment-method'] = 'Please select a payment method';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0 && paymentMethod) {
      setIsOrderPlaced(true);
    }
  };
  return (
    <div>
      <h1>Checkout Page</h1>
      <form className='checkout-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='first-name'>First Name</label>
          <input type='text' id='first-name' name='first-name' />
          {errors['first-name'] && <p className='error'>{errors['first-name']}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' name='last-name' />
          {errors['last-name'] && <p className='error'>{errors['last-name']}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' />
          {errors['email'] && <p className='error'>{errors['email']}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <input type='text' id='address' name='address' />
          {errors['address'] && <p className='error'>{errors['address']}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' name='city' />
          {errors['city'] && <p className='error'>{errors['city']}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='state'>State</label>
          <input type='text' id='state' name='state' />
          {errors['state'] && <p className='error'>{errors['state']}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='zip'>Zip Code</label>
          <input type='text' id='zip' name='zip' />
          {errors['zip'] && <p className='error'>{errors['zip']}</p>}
        </div>

        {/* Payment Method */}
        <div className='form-group'>
          <label htmlFor='payment-method'>Payment Method</label>
          <select id='payment-method' name='payment-method' value={paymentMethod} onChange={handlePaymentChange}>
            <option value=''>Select a payment method</option>
            <option value='visa'>Visa</option>
            <option value='mastercard'>Mastercard</option>
            <option value='discover'>Discover</option>
            <option value='american-express'>American Express</option>
          </select>
          {errors['payment-method'] && <p className='error'>{errors['payment-method']}</p>}
        </div>

        {/* Credit Card Fields */}
        {paymentMethod && (
          <div id='credit-card-fields'>
            <div className='form-group'>
              <label htmlFor='card-number'>Card Number</label>
              <input type='text' id='card-number' name='card-number' maxLength={16} placeholder='1234 5678 9012 3456' />
              {errors['card-number'] && <p className='error'>{errors['card-number']}</p>}
            </div>
            <div className='form-group'>
              <label htmlFor='expiration-date'>Expiration Date</label>
              <input type='date' id='expiration-date' name='expiration-date' />
              {errors['expiration-date'] && <p className='error'>{errors['expiration-date']}</p>}
            </div>
            <div className='form-group'>
              <label htmlFor='cvv'>CVV</label>
              <input type='text' id='cvv' name='cvv' maxLength={3} placeholder='123' />
              {errors['cvv'] && <p className='error'>{errors['cvv']}</p>}
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

export default Validation;
