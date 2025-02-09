import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cart from '../../assets/cart.svg';
import logo from '../../assets/logo.png';
import loginIcon from '../../assets/login.png';
import userIcon from '../../assets/user.png';
import { useCart } from '../Context/CartProvider';

import './Header.css';

function Header() {
  const { cartItems, isAuthenticated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigateToCategory = (category: string, items?: string) => {
    setMenuOpen(false);
    navigate(`/category/${category}`, { state: { category, items } });
  };

  return (
    <header>
      <nav className='custom-navbar'>
        <div className='custom-container'>
          <a
            className='toggler'
            type='a'
            onClick={toggleMenu}
            aria-controls='navbarNav'
            aria-expanded={menuOpen}
            aria-label='Toggle navigation'
          >
            <span className='toggler-icon'></span>
            <span className='toggler-icon'></span>
            <span className='toggler-icon'></span>
          </a>
          <div className='menu-container'>
            <Link className='brand' to='/'>
              <img id='brand-logo' src={logo} alt='brand logo' />
            </Link>
            <div className={`menu ${menuOpen ? 'menu-open' : ''}`} id='navbarNav'>
              <ul className='nav-list'>
                <li className='nav-item'>
                  <a className='nav-link' onClick={() => navigateToCategory('men', 'mens-shirts, mens-shoes')}>
                    Men
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' onClick={() => navigateToCategory('women', 'womens-dresses, womens-shoes')}>
                    Women
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' onClick={() => navigateToCategory('furniture', 'furniture')}>
                    Furniture
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' onClick={() => navigateToCategory('home decoration', 'home-decoration')}>
                    Home-Decoration
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='cart-container'>
            <div className='auth-container'>
              {isAuthenticated ? (
                <>
                  <Link to='/profile' className='nav-link'>
                    <img id='user-icon' src={userIcon} alt='User Profile' />
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/login' className='nav-link'>
                    <img id='login-icon' src={loginIcon} alt='Login' />
                  </Link>
                </>
              )}
            </div>

            <Link to='/checkout' className='cart-link'>
              <img id='cart-icon' src={cart} alt='Shopping Cart' />
              <span className='cart-count'>{cartItems}</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
