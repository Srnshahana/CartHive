import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShoppingCart, User, LogOut, LayoutDashboard, LogIn, Search, Menu, Heart } from 'lucide-react';

const Navbar = () => {
  const [business, setBusiness] = useState(null);
  const [branding, setBranding] = useState(null);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  const slug = pathParts.length > 0 && !['admin', 'login', 'cart', 'track'].includes(pathParts[0]) ? pathParts[0] : null;

  useEffect(() => {
    const savedUser = localStorage.getItem('carthive_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    else setUser(null);

    if (slug) fetchBusinessInfo();
    else {
      setBusiness(null);
      setBranding(null);
    }
  }, [location.pathname, slug]);

  const fetchBusinessInfo = async () => {
    try {
      const { data: biz } = await supabase.from('businesses').select('*').eq('slug', slug).single();
      if (biz) {
        setBusiness(biz);
        // Only fetch columns we know exist to avoid schema cache errors
        const { data: brand } = await supabase.from('homepage_content').select('*').eq('business_id', biz.id).single();
        if (brand) setBranding(brand);
      }
    } catch (err) {
      console.error('Navbar fetch error:', err);
      setBusiness(null);
      setBranding(null);
    }
  };

  return (
    <nav className="nav-main">
      <div className="nav-container">
        
        {/* Left Side: Logo */}
        <Link to={slug ? `/${slug}` : "/"} className="nav-logo">
          <div className="nav-logo-icon">
            {branding?.logo_url ? (
              <img src={branding.logo_url} alt={business?.name} style={{ height: '24px', width: '24px', borderRadius: '6px', objectFit: 'cover' }} />
            ) : (
              <StoreIcon />
            )}
          </div>
          <span className="nav-logo-text">
            {business?.name || 'carthive'}
          </span>
        </Link>

        {/* Right Side: Actions */}
        <div className="nav-actions-group">
          {user ? (
            <Link to="/admin" className="admin-pill-link">
              dashboard
            </Link>
          ) : (
            <Link to="/login" className="nav-link-item" style={{ fontSize: '0.95rem' }}>log in</Link>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <Heart size={20} />
              <span style={{ background: '#1e293b', color: 'white', fontSize: '0.7rem', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</span>
            </div>
            
            <div className="nav-search-btn">
              <span>Search</span>
              <Search size={18} />
            </div>

            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b', display: 'flex' }}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const StoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1e293b" />
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="white" />
  </svg>
);

export default Navbar;
