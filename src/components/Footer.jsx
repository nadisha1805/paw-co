import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo">PAW & CO.</h2>
            <p>Thoughtfully chosen products made to bring more joy, comfort and care into every pet's day.</p>
            <div className="social-links">
              <a href="#" className="social-icon">IG</a>
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">TW</a>
            </div>
          </div>
          
          <div className="footer-links-col">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?pet=Dog">Dog</Link></li>
              <li><Link to="/shop?pet=Cat">Cat</Link></li>
              <li><Link to="/shop?category=Treats">Treats</Link></li>
              <li><Link to="/shop?category=Toys">Toys</Link></li>
              <li><Link to="/shop?category=Grooming">Grooming</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h3>About</h3>
            <ul>
              <li><Link to="/about">About Paw & Co.</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h3>Customer Care</h3>
            <ul>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h3>Join the Paw & Co. pack</h3>
            <p>Get pet-care tips, new product drops and special offers delivered straight to your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email address" className="newsletter-input" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Paw & Co. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
