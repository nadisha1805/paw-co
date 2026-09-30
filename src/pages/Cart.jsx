import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart-state">
        <div className="container text-center">
          <div className="empty-cart-icon organic-bg">
            <ShoppingBag size={48} strokeWidth={1} color="var(--color-brown)" />
          </div>
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Cart ({cartCount} items)</h1>
        
        <div className="cart-layout">
          <div className="cart-items-section">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item-image-wrap">
                  <img src={item.image} alt={item.name} />
                </Link>
                
                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="cart-item-name">{item.name}</h3>
                  </Link>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  
                  <div className="cart-item-controls">
                    <div className="quantity-selector-small">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    
                    <button 
                      className="remove-btn flex items-center gap-1"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
                
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              <button className="btn btn-primary btn-full flex justify-between items-center">
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              
              <Link to="/shop" className="continue-shopping-link">
                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
