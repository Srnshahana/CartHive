import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabaseDemo } from '../data/supabaseDemo';

const BusinessHome = () => {
  const { slug } = useParams();
  const business = supabaseDemo.businesses.find(b => b.slug === slug);

  if (!business) return (
    <div className="container section-padding" style={{ textAlign: 'center' }}>
      <h1>Store not found</h1>
    </div>
  );

  return (
    <div className="wix-layout">
      {/* 1. Hero Section (Inspiration: Wix Beauty Store) */}
      <section className="hero-container">
        <img 
          src={business.banner} 
          alt={business.name} 
          className="hero-image"
        />
        <div className="hero-content">
          <h1 className="hero-h1">shine on</h1>
          <p className="hero-p">beauty that reflects your spirit</p>
          <Link to={`/${slug}/cart`} className="btn-shop">
            shop now
          </Link>
        </div>
      </section>

      {/* 2. Best Sellers Section */}
      <section className="section-best-sellers">
        <div className="section-header">
          <h2 className="section-title">best sellers</h2>
          <Link to={`/${slug}/products`} className="btn-view-more">view more</Link>
        </div>

        <div className="best-sellers-grid">
          {businessProducts.map(product => (
            <Link 
              key={product.id} 
              to={`/${slug}/product/${product.id}`} 
              className="product-item"
            >
              <div className="product-item-image">
                <span className="badge-best-seller">best seller</span>
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-item-info">
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BusinessHome;
