import React from 'react';
import { Link } from 'react-router-dom';
import { supabaseDemo } from '../data/supabaseDemo';
import { ExternalLink, ShoppingBag } from 'lucide-react';

const Urls = () => {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '600px' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
            width: '60px', height: '60px', borderRadius: '16px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
            margin: '0 auto 1.5rem'
          }}>
            <ShoppingBag size={32} />
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Business <span className="gradient-text">URLs</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Select a demo business to visit their dedicated store page.</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {supabaseDemo.businesses.map(biz => (
            <Link 
              key={biz.slug} 
              to={`/${biz.slug}`} 
              className="glass-card" 
              style={{ 
                textDecoration: 'none', 
                color: 'inherit', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1.25rem 2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={biz.logo} alt={biz.name} style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{biz.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                <span>/{biz.slug}</span>
                <ExternalLink size={18} />
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/track" className="btn btn-glass" style={{ width: '100%' }}>
            Go to Global Tracking Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Urls;
