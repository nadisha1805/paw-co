import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Truck, Shield } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      navigate('/shop');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/shop" className="back-link flex items-center gap-1">
            <ArrowLeft size={16} /> Back to Shop
          </Link>
        </div>

        <div className="product-detail-container">
          <div className="product-gallery">
            <div className="gallery-main organic-bg-subtle">
              <img src={product.image} alt={product.name} className="gallery-image" />
              <button 
                className={`wishlist-btn-large ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <HeartIcon filled={isInWishlist(product.id)} />
              </button>
            </div>
            {/* Gallery thumbnails would go here for products with multiple images */}
          </div>

          <div className="product-info-detail">
            <div className="product-meta">
              <span className="product-category-label">{product.category}</span>
              <span className="product-pet-label">{product.petType}</span>
            </div>
            
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-price-large">${product.price.toFixed(2)}</div>
            
            <div className="product-reviews flex items-center gap-1">
              <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
              <span className="review-count">({product.reviews} reviews)</span>
            </div>

            <p className="product-description-text">{product.description}</p>

            <div className="product-features-list">
              {product.features.map((feature, i) => (
                <div key={i} className="feature-item-inline flex items-center gap-1">
                  <div className="check-wrap"><Check size={14} /></div>
                  {feature}
                </div>
              ))}
            </div>

            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <button 
                  className="qty-btn" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                >-</button>
                <span className="qty-value">{quantity}</span>
                <button 
                  className="qty-btn" 
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >+</button>
              </div>
              
              <button 
                className={`btn btn-primary add-to-cart-main-btn ${!product.inStock ? 'out-of-stock' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? `Add to Cart - $${(product.price * quantity).toFixed(2)}` : 'Sold Out'}
              </button>
            </div>

            <div className="product-trust-badges">
              <div className="trust-badge flex items-center gap-1">
                <Truck size={18} />
                <span>Free shipping over $50</span>
              </div>
              <div className="trust-badge flex items-center gap-1">
                <Shield size={18} />
                <span>Quality guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5D64A" stroke="#F5D64A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "var(--color-terracotta)" : "none"} stroke={filled ? "var(--color-terracotta)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default ProductDetail;
