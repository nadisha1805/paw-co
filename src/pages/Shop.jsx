import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Shop.css';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePetType, setActivePetType] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (searchParams.get('search') !== null) {
      setSearchTerm(searchParams.get('search'));
    }
  }, [searchParams]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchParams(value ? { search: value } : {});
  };
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const categories = ['All', 'Treats', 'Toys', 'Grooming', 'Wellness', 'Accessories'];
  const petTypes = ['All', 'Dog', 'Cat'];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (activePetType !== 'All') {
      result = result.filter(p => p.petType === activePetType);
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchTerm, activeCategory, activePetType, sortBy]);

  return (
    <div className="shop-page">
      <div className="shop-header-section">
        <div className="container">
          <h1 className="shop-title">Thoughtful care for your best friend</h1>
          <p className="shop-subtitle">Explore our collection of premium, natural, and joy-sparking products.</p>
        </div>
      </div>

      <div className="container shop-container">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Pet Type</h3>
            <div className="filter-options">
              {petTypes.map(type => (
                <button 
                  key={type}
                  className={`filter-btn ${activePetType === type ? 'active' : ''}`}
                  onClick={() => setActivePetType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Category</h3>
            <div className="filter-options">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="shop-content">
          <div className="shop-controls flex justify-between items-center">
            <span className="results-count">Showing {filteredProducts.length} products</span>
            <div className="sort-control flex items-center gap-1">
              <SlidersHorizontal size={18} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-3 md-grid-cols-2 sm-grid-cols-1 gap-3 product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrap">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} className="product-image" />
                    </Link>
                    <button 
                      className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product)}
                    >
                      <HeartIcon filled={isInWishlist(product.id)} />
                    </button>
                    {!product.inStock && <span className="badge-out-of-stock">Sold Out</span>}
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
                        disabled={!product.inStock}
                      >
                        {product.inStock ? '+ Add' : 'Sold Out'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state text-center">
              <div className="empty-icon-wrap organic-bg">
                <img src="https://api.iconify.design/ph/magnifying-glass.svg?color=%23542719" alt="Search" />
              </div>
              <h3>No products found</h3>
              <p>We couldn't find any products matching your current filters.</p>
              <button 
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                  setActivePetType('All');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const HeartIcon = ({ filled }) => (
  <svg 
    width="20" height="20" 
    viewBox="0 0 24 24" 
    fill={filled ? "var(--color-terracotta)" : "none"} 
    stroke={filled ? "var(--color-terracotta)" : "currentColor"} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default Shop;
