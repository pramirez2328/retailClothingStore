import { Link } from 'react-router-dom';
import cart from '../../assets/cart.png';
import './Header.css';

function Header() {
  return (
    <header>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <h2 id='title'>FitStyle</h2>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to='/category-men'>
                  Men
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/category-women'>
                  Women
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/category-furniture'>
                  Furniture
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/category-home_decoration'>
                  Home Decoration
                </Link>
              </li>
            </ul>
            <img id='cart' src={cart} alt='Shopping Cart' />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
