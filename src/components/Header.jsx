import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`desktop-nav ${isMenuOpen ? 'mobile-nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>HOME</Link>
          <div className="nav-item-dropdown">
            <Link to="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              SHOP <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </Link>
          </div>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>ABOUT US</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
        </nav>

        <Link to="/" className="logo">
          PAW <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="logo-paw"><path d="M12 4.5c-1.2 0-2.2.9-2.2 2 0 1.1 1 2 2.2 2s2.2-.9 2.2-2c0-1.1-1-2-2.2-2zm-4.3 1.2c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zm8.6 0c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zM5 9.7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5S5.8 9.7 5 9.7zm14 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM12 10.5c-2.5 0-4.5 1.8-4.5 4 0 1 .5 1.8 1.2 2.4.8.7 2 1.1 3.3 1.1s2.5-.4 3.3-1.1c.7-.6 1.2-1.4 1.2-2.4 0-2.2-2-4-4.5-4z"/></svg> & CO.
        </Link>

        <div className="header-icons">
          <button className="icon-btn search-btn">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <Link to="/wishlist" className="icon-btn">
            <Heart size={22} strokeWidth={1.5} />
          </Link>
          <button className="icon-btn" onClick={handleUserClick}>
            <User size={22} strokeWidth={1.5} />
          </button>
          <Link to="/cart" className="icon-btn cart-btn">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
