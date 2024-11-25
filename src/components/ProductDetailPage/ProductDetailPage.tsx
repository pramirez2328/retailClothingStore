import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Product } from '../../types';
import './ProductDetailPage.css';
import fitaLogo from '../../assets/fit-finder.svg';

function ProductDetailPage() {
  const location = useLocation();
  const { product }: { product: Product } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return <div>Product not found!</div>;
  }

  let sizes: string[] = [];
  if (product.category === 'mens-shirts' || product.category === 'womens-dresses') {
    sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  } else if (product.category === 'mens-shoes' || product.category === 'womens-shoes') {
    sizes = ['5', '6', '7', '8', '9', '10', '11', '12'];
  } else {
    sizes = ['One Size'];
  }

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    // Add to cart logic here
    alert(`Added ${product.title} - Size: ${selectedSize} to cart!`);
  };

  console.log(product);
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
        <h1 className='title'>{product.title} </h1>
        <h5 className='sku'>SKU: {product.sku}</h5>
        <p className='description'>{product.description}</p>
        <p className='price'>${product.price}</p>
        <p className='availability'>{product.availabilityStatus}</p>
        <p className='brand'>Brand: {product.brand ? product.brand : 'Patagonia'}</p>

        <div className='size-selection'>
          <div className='select-size'>
            <p>Select Size:</p>
            <p>Size Chart</p>
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
          <div className='fita-container'>
            <img src={fitaLogo} alt='FITA' className='fita' />
          </div>
        </div>

        <button className='add-to-cart-button' onClick={handleAddToCart}>
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
    </div>
  );
}

export default ProductDetailPage;
