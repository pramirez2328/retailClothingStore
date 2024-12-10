import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../Context/CartProvider';
import './ProductDetailPage.css';
import fitaLogo from '../../assets/fit-finder.svg';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function ProductDetailPage() {
  // context hook to access the cart state and functions
  const { addItemToCart } = useCart();
  const location = useLocation();
  const { product }: { product: Product } = location.state || {};
  // Declare state variables for selected image, selected size, and modal visibility
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  // Redirect to 404 page if product is not found
  if (!product) {
    return <NotFoundPage />;
  }

  let sizes: string[] = [];
  if (product.category === 'mens-shirts' || product.category === 'womens-dresses') {
    sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  } else if (product.category === 'mens-shoes' || product.category === 'womens-shoes') {
    sizes = ['6', '7', '8', '9', '10', '11'];
  } else {
    sizes = ['Standard'];
  }

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    document.querySelector('.warning-message')?.classList.remove('show');
  };

  const handleAddToCart = (currentProduct: Product) => {
    if (!selectedSize) {
      document.querySelector('.warning-message')?.classList.add('show');
      return;
    }
    addItemToCart();
    if (!localStorage.getItem('cart')) {
      // if the cart does not exist in the local storage, create it
      localStorage.setItem('cart', JSON.stringify([{ ...currentProduct, selectedSize, orderQty: 1 }]));
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProduct = cart.find(
        (item: Product) => item.id === currentProduct.id && item.selectedSize === selectedSize,
      );
      const restOfTheProducts = cart.filter(
        (item: Product) => item.id !== currentProduct.id || item.selectedSize !== selectedSize,
      );
      if (existingProduct) {
        existingProduct.orderQty += 1;
        localStorage.setItem('cart', JSON.stringify([...restOfTheProducts, existingProduct]));
      } else {
        localStorage.setItem('cart', JSON.stringify([...cart, { ...currentProduct, selectedSize, orderQty: 1 }]));
      }
    }

    // Show the modal and hide it after 3 seconds
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);

    //close the modal if the user clicks outside of it
    window.onclick = (event) => {
      if (event.target === document.querySelector('.modal-overlay')) {
        setShowModal(false);
      }
    };

    return () => {
      window.onclick = null;
    };
  };

  return (
    <div className='product-detail'>
      <div className='carousel'>
        <div className='carousel-main'>
          <img src={product.images[selectedImage]} alt={product.title} className='main-image' />
        </div>
        <div className='carousel-thumbnails'>
          {product.images.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} ${index + 1}`}
              className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      <div className='product-info'>
        <h1 className='title'>{product.title}</h1>
        <h5 className='sku'>SKU: {product.sku}</h5>
        <p className='description'>{product.description}</p>
        <p className='price'>${product.price}</p>
        <p className='availability'>{product.availabilityStatus}</p>
        <p className='brand'>Brand: {product.brand ? product.brand : 'Patagonia'}</p>

        <div className='size-selection'>
          <div className='select-size'>
            <p>Select Size:</p>
            {sizes.length > 1 && <p>Size Chart</p>}
          </div>

          <div className='sizes'>
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <h4 className='warning-message'>Please select a size first!</h4>
          {sizes.length > 1 && (
            <div className='fita-container'>
              <img src={fitaLogo} alt='FITA' className='fita' />
            </div>
          )}
        </div>

        <button className='add-to-cart-button' onClick={() => handleAddToCart(product)}>
          Add to Cart
        </button>

        <div className='reviews'>
          <h3>Customer Reviews</h3>
          {product.reviews.map((review, index) => (
            <div key={index} className='review'>
              <p className='reviewer-name'>
                <strong>{review.reviewerName}</strong>
              </p>
              <p className='review-comment'>"{review.comment}"</p>
              <p className='review-rating'>Rating: {review.rating} / 5</p>
              <p className='review-date'>Date: {new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3>{product.title}</h3>
            <hr />
            <p>
              Size: <span>{selectedSize}</span>
            </p>
            <p>
              Price: <span>${product.price}</span>
            </p>
            <p>
              sku: <span>{product.sku}</span>
            </p>
            <p>{product.title} was added to the cart!</p>
            <div>
              <img src={product.thumbnail} alt='thumbnail' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
