import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowRight, Store, Rocket, Globe, ShieldCheck, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data, error } = await supabase.from('businesses').select('*');
        if (error) throw error;
        setBusinesses(data || []);
      } catch (err) {
        console.error('Error fetching businesses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="platform-landing">
      {/* Hero Section */}
      <section className="hero-platform">
        <div className="container">
          <div className="hero-tagline">
            <Rocket size={16} /> Welcome to the future of retail
          </div>
          <h1 className="hero-h1-platform">
            Build your <span className="gradient-text">dream store</span> in seconds.
          </h1>
          <p className="hero-p-platform">
            CartHive empowers creators and small businesses to launch stunning, high-performance online stores with zero friction.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/admin" className="btn-shop-dark" style={{ padding: '1.2rem 3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              Launch your store <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container" id="explore">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-1px' }}>Explore <span className="gradient-text">featured stores</span></h2>
            <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Discover unique brands and products from our thriving community of businesses.</p>
          </div>

          <div className="featured-stores-grid">
            {businesses.map(biz => (
              <Link key={biz.id} to={`/${biz.slug}`} className="store-card">
                <div className="store-card-icon">
                  {biz.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="store-card-title">{biz.name}</h3>
                  <p className="store-card-text">
                    Experience the finest collection of products curated by {biz.name}. Explore their exclusive catalog and shop unique finds.
                  </p>
                </div>
                <div className="store-card-link">
                  Visit Store <ChevronRight size={18} />
                </div>
              </Link>
            ))}

            {businesses.length === 0 && (
              <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '6rem', background: '#f8fafc', borderRadius: '40px', border: '2px dashed #e2e8f0' }}>
                <Store size={48} color="#94a3b8" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.75rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.5rem' }}>No stores live yet</h3>
                <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Be the first to launch your brand on CartHive!</p>
                <Link to="/admin" className="btn-shop-dark">Start Building Your Empire</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding" style={{ background: '#f8fafc' }} id="features">
        <div className="container">
          <div className="grid grid-cols-3" style={{ gap: '4rem' }}>
            <div className="feature-item">
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem', background: 'white', width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}><Globe size={32} /></div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.5px' }}>Global Reach</h4>
              <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '1.05rem' }}>Sell to customers anywhere in the world with our globally distributed, lightning-fast storefronts.</p>
            </div>
            <div className="feature-item">
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem', background: 'white', width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}><ShieldCheck size={32} /></div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.5px' }}>Secure & Trusted</h4>
              <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '1.05rem' }}>Enterprise-grade security and real-time inventory management for your peace of mind.</p>
            </div>
            <div className="feature-item">
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem', background: 'white', width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}><Store size={32} /></div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.5px' }}>Zero Code</h4>
              <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '1.05rem' }}>Customize your entire store branding, banners, and social galleries without touching a single line of code.</p>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '4rem 5%', textAlign: 'center', background: 'white', borderTop: '1px solid #f1f5f9' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>© 2026 CartHive Platform. Powered by Advanced Agentic Coding.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
