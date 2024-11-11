import { useState } from 'react';
import { Link } from 'react-router-dom';
import cart from '../../assets/cart.svg';
import logo from '../../assets/logo.png';

import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className='custom-navbar'>
        <div className='custom-container'>
          <button
            className='toggler'
            type='button'
            onClick={toggleMenu}
            aria-controls='navbarNav'
            aria-expanded={menuOpen}
            aria-label='Toggle navigation'
          >
            <span className='toggler-icon'></span>
            <span className='toggler-icon'></span>
            <span className='toggler-icon'></span>
          </button>
          <div className='menu-container'>
            <Link className='brand' to='/'>
              <img id='brand-logo' src={logo} alt='brand logo' />
            </Link>
            <div className={`menu ${menuOpen ? 'menu-open' : ''}`} id='navbarNav'>
              <ul className='nav-list'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/category-men' onClick={() => setMenuOpen(false)}>
                    Men
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/category-women' onClick={() => setMenuOpen(false)}>
                    Women
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/category-furniture' onClick={() => setMenuOpen(false)}>
                    Furniture
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/category-home_decoration' onClick={() => setMenuOpen(false)}>
                    Home-Decoration
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <img id='cart' src={cart} alt='Shopping Cart' />
        </div>
      </nav>
    </header>
  );
}

export default Header;
