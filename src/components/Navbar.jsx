import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Search, Menu, ShoppingBag } from 'lucide-react';
import { supabaseDemo } from '../data/supabaseDemo';

const Navbar = () => {
  const { slug } = useParams();
  const business = slug ? supabaseDemo.businesses.find(b => b.slug === slug) : null;

  return (
    <nav className="nav-floating">
      {/* Left: Logo */}
      <Link to="/" className="nav-logo">
        <div style={{ width: '24px', height: '24px', background: 'black', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '12px', height: '12px', border: '2px solid white', borderRadius: '50%' }}></div>
        </div>
        <span>{business ? business.name.toLowerCase().split(' ')[0] : 'carthive'}</span>
      </Link>

      {/* Right: Links & Icons */}
      <div className="nav-links">
        <span style={{ cursor: 'pointer' }}>log in</span>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
          <Heart size={20} />
          <span style={{ background: '#000', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginLeft: '1rem' }}>
          <span>Search</span>
          <Search size={20} />
        </div>

        <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '1rem' }}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
