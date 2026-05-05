import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabaseDemo } from '../data/supabaseDemo';
import { ArrowLeft, ShoppingCart, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
  const { slug, productId } = useParams();
  const product = supabaseDemo.products.find(p => p.id === productId);
  const business = supabaseDemo.businesses.find(b => b.slug === slug);

  if (!product || !business) return <div className="container section">Product not found</div>;

  return (
    <div className="section">
      <div className="container">
        <Link to={`/${slug}`} className="btn btn-glass" style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={18} /> Back to Store
        </Link>

        <div className="grid grid-cols-2" style={{ alignItems: 'start' }}>
          <div className="glass-card" style={{ padding: '1rem' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} 
            />
          </div>

          <div style={{ padding: '1rem' }}>
            <span style={{ 
              color: 'var(--primary)', 
              fontWeight: '700', 
              fontSize: '0.9rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '3rem', margin: '0.5rem 0 1rem' }}>{product.name}</h1>
            <p style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }} className="gradient-text">${product.price}</p>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
              {product.description}
            </p>

            <div className="glass-card" style={{ marginBottom: '2rem', background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text)' }}>
                <ShieldCheck size={20} color="var(--primary)" />
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Authentic product from {business.name}</span>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}>
              <ShoppingCart size={22} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
