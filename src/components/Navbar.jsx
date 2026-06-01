import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShoppingCart, User, LogOut, LayoutDashboard, LogIn, Search, Menu, Heart, ShoppingBag, Flower, ArrowLeft, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [business, setBusiness] = useState(null);
  const [branding, setBranding] = useState(null);
  const [user, setUser] = useState(null);
  const [customerUser, setCustomerUser] = useState(null);
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathParts = location.pathname.split('/').filter(Boolean);

  const slug = pathParts.length > 0 && !['admin', 'login', 'cart', 'track'].includes(pathParts[0]) ? pathParts[0] : null;

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('carthive_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    else setUser(null);

    const checkCustomer = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setCustomerUser(session.user);
      
      supabase.auth.onAuthStateChange((_event, session) => {
        setCustomerUser(session?.user || null);
      });
    };
    checkCustomer();

    if (slug) fetchBusinessInfo();
    else {
      setBusiness(null);
      setBranding(null);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Safety check for mobile "bounce" scrolling (negative scroll)
      if (currentScrollY < 0) return;

      // Only hide if we've scrolled a decent amount down
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Show immediately on ANY scroll up
        setVisible(true);
      }
      
      setScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleLogoUpdate = (e) => {
      if (e.detail) setBranding(prev => ({ ...(prev || {}), logo_url: e.detail }));
    };
    window.addEventListener('carthive-logo-update', handleLogoUpdate);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('carthive-logo-update', handleLogoUpdate);
    };
  }, [location.pathname, slug]);

  const fetchBusinessInfo = async () => {
    try {
      const { data: biz } = await supabase.from('businesses').select('*').eq('slug', slug).single();
      if (biz) {
        setBusiness(biz);
        // Only fetch columns we know exist to avoid schema cache errors
        let brandContent = null;
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('preview') === 'true') {
          const previewData = localStorage.getItem(`carthive_preview_${slug}`);
          if (previewData) {
            try {
              brandContent = JSON.parse(previewData);
            } catch (e) { }
          }
        }

        if (!brandContent) {
          const { data: brand } = await supabase.from('homepage_content').select('*').eq('business_id', biz.id).single();
          brandContent = brand;
        }

        // Normalize logo from all possible sources
        const logo = brandContent?.logo_url || brandContent?.logo || biz.logo_url || biz.logo || biz.store_logo || biz.avatar_url;
        if (logo) {
          setBranding({ ...(brandContent || {}), logo_url: logo });
        } else {
          setBranding(brandContent);
        }
      }
    } catch (err) {
      console.error('Navbar fetch error:', err);
      setBusiness(null);
      setBranding(null);
    }
  };

  return (
    <nav className={`nav-pill ${mounted ? 'mounted' : ''} ${scrolled ? 'scrolled' : ''} ${!visible ? 'nav-hidden' : ''} ${menuOpen ? 'nav-open' : ''}`}>
      {/* Left: Back Button & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 10001 }}>
        {slug && (location.pathname !== `/${slug}` && location.pathname !== `/${slug}/`) && (
          <button
            onClick={() => navigate(-1)}
            style={{
              background: '#f1f5f9',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0f172a',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f1f5f9'}
          >
            <ArrowLeft size={18} />
          </button>
        )}

        <Link to={slug ? `/${slug}` : "/"} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#0f172a' }}>
          <div style={{ background: '#0f172a', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {(branding?.logo_url || business?.logo_url) ? (
              <img src={branding?.logo_url || business?.logo_url} style={{ width: '20px', height: '20px', objectFit: 'contain' }} alt="" />
            ) : (
              <Flower size={18} color="white" />
            )}
          </div>
          <span style={{ fontWeight: '900', fontSize: '1.2rem', letterSpacing: '-1px' }}>{business?.name || 'carthive'}</span>
        </Link>
      </div>


      {/* Right: Actions */}
      <div className="nav-icons">
        {/* Dashboard Link - ONLY show if user is the owner of THIS specific shop */}
        {user && business && user.business_id === business.id ? (
          <Link to="/admin" className="nav-icon-link" style={{ fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', color: '#0f172a' }}>
            <LayoutDashboard size={20} />
            <span className="auth-label-mobile">dashboard</span>
          </Link>
        ) : customerUser && slug ? (
          <Link to={`/${slug}/account`} className="nav-icon-link" style={{ fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', color: '#0f172a' }}>
            <User size={20} />
            <span className="auth-label-mobile">account</span>
          </Link>
        ) : (
          <Link to={slug ? `/${slug}/login` : "/login"} className="nav-icon-link" style={{ fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', color: '#0f172a' }}>
            <User size={20} />
            <span className="auth-label-mobile">login</span>
          </Link>
        )}


        {slug && (
          <Link to={`/${slug}/track`} className="nav-icon-link" style={{ fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', color: '#0f172a' }}>
            <Truck size={20} />
            <span className="auth-label-mobile">track</span>
          </Link>
        )}

        <Link to={`/${slug}/cart`} className="nav-icon-link cart-icon">
          <ShoppingBag size={20} />
          <span className="cart-badge">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

const NavbarStoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 22V12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 7L12 12L3 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12L21 17" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12L3 17" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Navbar;
