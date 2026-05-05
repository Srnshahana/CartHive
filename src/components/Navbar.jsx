import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import { supabaseDemo } from '../data/supabaseDemo';

const Navbar = () => {
  const location = useLocation();
  const { slug } = useParams();
  const isAdmin = location.pathname.startsWith('/admin');
  
  const business = slug ? supabaseDemo.businesses.find(b => b.slug === slug) : null;

  if (isAdmin) return null;

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
            width: '40px', height: '40px', borderRadius: '12px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' 
          }}>
            <ShoppingBag size={24} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Cart<span className="gradient-text">Hive</span>
            {business && (
              <span style={{ color: 'var(--text-muted)', fontWeight: '400', fontSize: '1.1rem', marginLeft: '0.5rem' }}>
                | {business.name}
              </span>
            )}
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" className="btn btn-glass" style={{ border: 'none' }}>Stores</Link>
          <Link to="/track" className="btn btn-glass" style={{ border: 'none' }}>
            <Search size={18} /> Track
          </Link>
          <Link to="/admin" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
            <User size={18} /> Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
