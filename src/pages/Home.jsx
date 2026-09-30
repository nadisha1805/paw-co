import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart as HeartIcon, Bone, Sprout } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page">
      {/* Exact Match Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-decor shape-peach-left"></div>
        <div className="hero-bg-decor shape-green-right"></div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-supertitle">NATURAL PRODUCTS. BRIGHTER DAYS.</span>
            <h1 className="hero-title">
              Premium care<br/>
              for happier,<br/>
              healthier pets
            </h1>
            <p className="hero-text">
              Thoughtfully chosen products made to bring more<br/>
              joy, comfort and care into every pet's day.
            </p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-primary btn-arrow">
                SHOP NOW <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <Link to="/about" className="btn btn-outline-hero">
                OUR STORY
              </Link>
            </div>
            
            <div className="hero-trust-badges">
              <div className="trust-badge">
                <Leaf size={20} strokeWidth={1.5} className="trust-icon" />
                <span>Natural<br/>ingredients</span>
              </div>
              <div className="trust-badge">
                <HeartIcon size={20} strokeWidth={1.5} className="trust-icon" />
                <span>Pet parent<br/>approved</span>
              </div>
              <div className="trust-badge">
                <Bone size={20} strokeWidth={1.5} className="trust-icon" />
                <span>Healthy<br/>and tasty</span>
              </div>
              <div className="trust-badge">
                <Sprout size={20} strokeWidth={1.5} className="trust-icon" />
                <span>For happier<br/>everyday tails</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image-side">
            {/* Decorative Floating Graphics */}
            <div className="floating-graphic leaf-1">
              <Leaf size={32} color="var(--color-olive)" strokeWidth={1.5} />
            </div>
            <div className="floating-graphic leaf-2">
              <Leaf size={40} color="var(--color-olive)" strokeWidth={1.5} />
            </div>
            <div className="floating-graphic sparkle-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>
            </div>
            <div className="floating-graphic paw-1">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--color-brown)" opacity="0.15" stroke="none"><path d="M12 4.5c-1.2 0-2.2.9-2.2 2 0 1.1 1 2 2.2 2s2.2-.9 2.2-2c0-1.1-1-2-2.2-2zm-4.3 1.2c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zm8.6 0c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zM5 9.7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5S5.8 9.7 5 9.7zm14 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM12 10.5c-2.5 0-4.5 1.8-4.5 4 0 1 .5 1.8 1.2 2.4.8.7 2 1.1 3.3 1.1s2.5-.4 3.3-1.1c.7-.6 1.2-1.4 1.2-2.4 0-2.2-2-4-4.5-4z"/></svg>
            </div>

            <div className="hero-floating-element text-script">
              Good pets<br/>happier days! <HeartIcon size={24} className="inline-heart" color="var(--color-terracotta)" />
              <svg className="curved-arrow" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-brown)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5a9 9 0 0 0-7 9c0 4.5 4.5 7 9 7"/><path d="M8 21h4v-4"/></svg>
            </div>
            
            <div className="hero-floating-blob">
              <span>Made<br/>with love</span>
            </div>

            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop" 
                alt="Happy dog" 
                className="hero-main-dog"
              />
              <div className="decorative-bowl">
                <span className="bowl-logo"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 4.5c-1.2 0-2.2.9-2.2 2 0 1.1 1 2 2.2 2s2.2-.9 2.2-2c0-1.1-1-2-2.2-2zm-4.3 1.2c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zm8.6 0c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zM5 9.7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5S5.8 9.7 5 9.7zm14 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM12 10.5c-2.5 0-4.5 1.8-4.5 4 0 1 .5 1.8 1.2 2.4.8.7 2 1.1 3.3 1.1s2.5-.4 3.3-1.1c.7-.6 1.2-1.4 1.2-2.4 0-2.2-2-4-4.5-4z"/></svg> PAW & CO.</span>
                <div className="bowl-treats"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-center">Favourites for every furry friend</h2>
          </div>
          
          <div className="grid grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-3">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrap">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} className="product-image" />
                  </Link>
                  <button 
                    className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product)}
                  >
                    <HeartIcon filled={isInWishlist(product.id)} size={20} />
                  </button>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                  </Link>
                  <div className="product-bottom flex justify-between items-center">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button 
                      className="btn-add-cart"
                      onClick={() => addToCart(product)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
