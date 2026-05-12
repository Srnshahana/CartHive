import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowRight, Store, Rocket, Globe, Shield, Lock, X, Loader2, ChevronRight, ShieldCheck } from 'lucide-react';

const InteractiveDots = () => {
  const canvasRef = React.useRef(null);
  const mouse = React.useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let dots = [];

    const spacing = 18;
    const radius = 100;
    const mouseForce = 0.2;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      initDots(rect.width, rect.height);
    };

    const initDots = (width, height) => {
      dots = [];
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          dots.push({
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            density: (Math.random() * 20) + 10
          });
        }
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      dots.forEach(dot => {
        let dx = mouse.current.x - dot.x;
        let dy = mouse.current.y - dot.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          let force = (radius - distance) / radius;
          let directionX = (dx / distance) * force * dot.density * mouseForce;
          let directionY = (dy / distance) * force * dot.density * mouseForce;

          dot.x -= directionX;
          dot.y -= directionY;
        } else {
          if (dot.x !== dot.baseX) {
            dot.x -= (dot.x - dot.baseX) / 10;
          }
          if (dot.y !== dot.baseY) {
            dot.y -= (dot.y - dot.baseY) / 10;
          }
        }

        const distToMouse = mouse.current.active ? Math.sqrt(Math.pow(mouse.current.x - dot.x, 2) + Math.pow(mouse.current.y - dot.y, 2)) : 1000;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.2, 0, Math.PI * 2);

        if (mouse.current.active && distToMouse < radius * 1.2) {
          const opacity = 1 - (distToMouse / (radius * 1.2));
          ctx.fillStyle = `rgba(29, 78, 216, ${0.5 + opacity * 0.5})`; // Bold Darker Blue (Blue-700)
        } else {
          ctx.fillStyle = 'rgba(30, 64, 175, 0.35)'; // More visible base blue-800
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    resize();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none' // Let events pass through to buttons if needed, but we track globally anyway
      }}
    />
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

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
      <section
        className="hero-platform"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Interactive Dot Grid (Inspired by Stitch) */}
        <InteractiveDots />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.75rem', letterSpacing: '-0.75px' }}>Our Trusted <span className="gradient-text">Partners</span></h2>
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
                    onChange={(e) => setFounderCreds({ ...founderCreds, username: e.target.value })}
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
                    onChange={(e) => setFounderCreds({ ...founderCreds, password: e.target.value })}
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
