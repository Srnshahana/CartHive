import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabaseDemo } from '../data/supabaseDemo';
import { ShoppingBag, ArrowRight, Star } from 'lucide-react';

const BusinessHome = () => {
  const { slug } = useParams();
  const business = supabaseDemo.businesses.find(b => b.slug === slug);
  const businessProducts = supabaseDemo.products.filter(p => p.business_id === business?.id);

  if (!business) return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <h1>Store not found</h1>
      <Link to="/urls" className="btn btn-primary" style={{ marginTop: '2rem' }}>View Store List</Link>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
        <img 
          src={business.banner} 
          alt={business.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7))',
          display: 'flex', alignItems: 'flex-end', padding: '4rem 0'
        }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }} className="fade-in">
              <img src={business.logo} alt={business.name} style={{ width: '100px', height: '100px', borderRadius: '20px', border: '4px solid var(--glass-border)' }} />
              <div>
                <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', color: 'white' }}>{business.name}</h1>
                <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px' }}>{business.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
            <div className="fade-in">
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About <span className="gradient-text">Our Store</span></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                {business.about}
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>100%</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Authentic</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>Fast</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Delivery</div>
                </div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Contact Information</h3>
              <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> {business.contact_phone}</p>
              <p><strong>Address:</strong> {business.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section" style={{ background: 'rgba(0,0,0,0.02)' }}>
        <div className="container">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem' }}>Featured <span className="gradient-text">Products</span></h2>
              <p style={{ color: 'var(--text-muted)' }}>Explore our curated collection of unique items.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '50px', background: 'var(--surface)', fontSize: '0.9rem' }}>All Products</span>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>New Arrivals</span>
            </div>
          </header>

          <div className="grid grid-cols-3">
            {businessProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/${slug}/product/${product.id}`} 
                className="glass-card fade-in"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)', height: '250px', marginBottom: '1.5rem' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="product-img"
                  />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.8)', color: '#000', padding: '0.25rem 0.5rem', borderRadius: '8px', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: '700' }}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" /> 4.9
                  </div>
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', height: '2.7rem', overflow: 'hidden' }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>${product.price}</span>
                  <div className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    View Details <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <Link 
        to={`/${slug}/cart`} 
        className="btn btn-primary" 
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', padding: '1rem 2rem', borderRadius: '50px', zIndex: 100 }}
      >
        <ShoppingBag size={20} /> View Cart
      </Link>
    </div>
  );
};

export default BusinessHome;
