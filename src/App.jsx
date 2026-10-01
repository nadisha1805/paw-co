import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { DashboardProvider } from './context/DashboardContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="services" element={<Services />} />
                  <Route path="services/:id" element={<ServiceDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<Home />} />
                </Route>
              </Routes>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
