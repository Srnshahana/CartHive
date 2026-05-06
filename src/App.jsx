import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

// Platform Pages
import LandingPage from './pages/platform/LandingPage';

// Storefront Pages
import StoreHome from './pages/storefront/StoreHome';
import ProductList from './pages/storefront/ProductList';
import ProductDetails from './pages/storefront/ProductDetails';
import Cart from './pages/storefront/Cart';
import OrderTracking from './pages/storefront/OrderTracking';

// Admin Pages
import Login from './pages/admin/Login';
import AdminPortal from './pages/admin/AdminPortal';

import './index.css';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  return (
    <div className="app-shell">
      {!isAdminPage && <Navbar />}
      <Routes>
        {/* Main Landing Page (Platform) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Flow */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPortal />} />
        
        {/* Customer Storefront Flow */}
        <Route path="/:slug" element={<StoreHome />} />
        <Route path="/:slug/products" element={<ProductList />} />
        <Route path="/:slug/product/:id" element={<ProductDetails />} />
        <Route path="/:slug/cart" element={<Cart />} />
        <Route path="/:slug/track" element={<OrderTracking />} />
        
        {/* Fallback */}
        <Route path="*" element={
          <div className="container section-padding" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn-shop-dark">Back to Home</Link>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
