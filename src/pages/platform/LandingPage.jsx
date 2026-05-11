import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowRight, Store, Rocket, Globe, Shield, Lock, X, Loader2, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Founder Login State
  const [isFounderLoginOpen, setIsFounderLoginOpen] = useState(false);
  const [founderCreds, setFounderCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('is_active', true);
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
            <Link to="/launch" className="btn-shop-dark" style={{ padding: '1.2rem 3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              Launch your store <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container" id="explore">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-0.75px' }}>Explore <span className="gradient-text">featured stores</span></h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto' }}>Discover unique brands and products from our thriving community of businesses.</p>
          </div>

          <div className="featured-stores-grid">
            {businesses.map(biz => (
              <Link key={biz.id} to={`/${biz.slug}`} className="store-card">
                <div className="store-card-icon">
                  {biz.logo_url ? (
                    <img src={biz.logo_url} alt={biz.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    biz.name.charAt(0).toUpperCase()
                  )}
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
                <Link to="/launch" className="btn-shop-dark">Start Building Your Empire</Link>
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
              <div style={{ color: '#3b82f6', marginBottom: '1.2rem', background: 'white', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.04)' }}><Globe size={24} /></div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-0.4px' }}>Global Reach</h4>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>Sell to customers anywhere in the world with our globally distributed, lightning-fast storefronts.</p>
            </div>
            <div className="feature-item">
              <div style={{ color: '#3b82f6', marginBottom: '1.2rem', background: 'white', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.04)' }}><ShieldCheck size={24} /></div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-0.4px' }}>Secure & Trusted</h4>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>Enterprise-grade security and real-time inventory management for your peace of mind.</p>
            </div>
            <div className="feature-item">
              <div style={{ color: '#3b82f6', marginBottom: '1.2rem', background: 'white', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.04)' }}><Store size={24} /></div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-0.4px' }}>Zero Code</h4>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>Customize your entire store branding, banners, and social galleries without touching a single line of code.</p>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '4rem 5%', textAlign: 'center', background: 'white', borderTop: '1px solid #f1f5f9' }}>
        <button 
          onClick={() => setIsFounderLoginOpen(true)}
          style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          © 2026 CartHive Platform. Powered by Advanced Agentic Coding.
        </button>
      </footer>

      {/* Founder Login Modal */}
      {isFounderLoginOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '32px', padding: '3rem', maxWidth: '450px', width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
            <button 
              onClick={() => setIsFounderLoginOpen(false)}
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Shield size={32} />
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>Founder Portal</h2>
              <p style={{ color: '#64748b' }}>Enter your administrative credentials.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setLoginError('');
              setIsLoggingIn(true);
              
              setTimeout(() => {
                if (founderCreds.username === 'founder' && founderCreds.password === '111111') {
                  navigate('/founder');
                } else {
                  setLoginError('Invalid administrative credentials.');
                  setIsLoggingIn(false);
                }
              }, 800);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {loginError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '1rem', borderRadius: '16px', color: '#ef4444', fontSize: '0.9rem', fontWeight: '600' }}>
                  {loginError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '700', color: '#334155', fontSize: '0.9rem' }}>Username</label>
                <div style={{ position: 'relative' }}>
                  <Shield size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    required
                    type="text" 
                    placeholder="Admin username"
                    value={founderCreds.username}
                    onChange={(e) => setFounderCreds({...founderCreds, username: e.target.value})}
                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '14px', border: '2px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '700', color: '#334155', fontSize: '0.9rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    value={founderCreds.password}
                    onChange={(e) => setFounderCreds({...founderCreds, password: e.target.value})}
                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '14px', border: '2px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoggingIn}
                style={{ 
                  marginTop: '1rem',
                  padding: '1.2rem', 
                  borderRadius: '14px', 
                  border: 'none', 
                  background: '#0f172a', 
                  color: 'white', 
                  fontWeight: '800', 
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem'
                }}
              >
                {isLoggingIn ? <Loader2 size={20} className="animate-spin" /> : 'Enter Portal'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
