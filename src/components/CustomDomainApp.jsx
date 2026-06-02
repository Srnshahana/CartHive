import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { StoreProvider, useStore } from '../context/StoreContext';

import StoreHome from '../pages/storefront/StoreHome';
import ProductList from '../pages/storefront/ProductList';
import ProductDetails from '../pages/storefront/ProductDetails';
import Cart from '../pages/storefront/Cart';
import Checkout from '../pages/storefront/Checkout';
import OrderTracking from '../pages/storefront/OrderTracking';
import CustomerLogin from '../pages/storefront/CustomerLogin';
import CustomerAccount from '../pages/storefront/CustomerAccount';

const DomainGate = ({ children }) => {
  const { error, loading } = useStore();
  
  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Domain...</div>;
  }

  if (error === 'Domain Inactive') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', textAlign: 'center', padding: '2rem' }}>
        <div style={{ background: '#fff', padding: '4rem', borderRadius: '32px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Store Unavailable</h1>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            The custom domain for this store is currently inactive. If you are the store owner, please upgrade your plan in the CartHive admin dashboard to activate this domain.
          </p>
          <a href="https://carthive.com/login" style={{ display: 'inline-block', background: '#0f172a', color: '#fff', padding: '0.8rem 2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '800' }}>Admin Login</a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '120px' }}>
        <h1>Store Not Found</h1>
      </div>
    );
  }

  return children;
};

const CustomDomainApp = ({ hostname }) => {
  return (
    <StoreProvider hostname={hostname}>
      <DomainGate>
        <Navbar />
        <Routes>
          <Route path="/" element={<StoreHome />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track" element={<OrderTracking />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/account" element={<CustomerAccount />} />
          <Route path="*" element={
            <div className="container section-padding" style={{ textAlign: 'center', paddingTop: '120px' }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>Oops! The page you're looking for doesn't exist.</p>
              <Link to="/" className="btn-shop-dark">Back to Store</Link>
            </div>
          } />
        </Routes>
      </DomainGate>
    </StoreProvider>
  );
};

export default CustomDomainApp;
