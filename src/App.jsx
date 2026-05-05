import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Urls from './pages/Urls';
import BusinessHome from './pages/BusinessHome';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import TrackOrder from './pages/TrackOrder';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <Routes>
          {/* Dev landing page to list business URLs */}
          <Route path="/" element={<Urls />} />
          <Route path="/urls" element={<Navigate to="/" replace />} />
          
          {/* Global Tracking and Admin */}
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Business specific routes */}
          <Route path="/:slug" element={<BusinessHome />} />
          <Route path="/:slug/product/:productId" element={<ProductDetails />} />
          <Route path="/:slug/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
