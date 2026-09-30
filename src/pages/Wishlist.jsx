import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page empty-wishlist-state">
        <div className="container text-center">
          <div className="empty-icon organic-bg">
            <Heart size={48} strokeWidth={1} color="var(--color-terracotta)" />
          </div>
          <h1>Your wishlist is empty</h1>
          <p>Save your favorite items here to view them later.</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Discover Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="page-title">Your Wishlist ({wishlist.length})</h1>
        
        <div className="grid grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-3 wishlist-grid">
          {wishlist.map(product => (
            <div key={product.id} className="product-card wishlist-card">
              <div className="product-image-wrap">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} className="product-image" />
                </Link>
                <button 
                  className="wishlist-remove-btn"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Remove from wishlist"
                >
                  <Trash2 size={16} />
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
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
