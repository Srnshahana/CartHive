import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, ShoppingCart, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
  const { slug, id } = useParams(); // URL pattern is /:slug/product/:id
  const [product, setProduct] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Business
        const { data: biz } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', slug)
          .single();
        setBusiness(biz);

        // 2. Fetch Product
        if (biz) {
          const { data: prod } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
          setProduct(prod);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug, id]);

  if (loading) return <div className="container section">Loading details...</div>;
  if (!product || !business) return <div className="container section">Product not found</div>;

  return (
    <div className="section">
      <div className="container">
        <Link to={`/${slug}`} className="btn btn-glass" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
          <ArrowLeft size={18} /> Back to Store
        </Link>

        <div className="grid grid-cols-2" style={{ alignItems: 'start', gap: '4rem' }}>
          <div className="glass-card" style={{ padding: '1rem', borderRadius: '30px', overflow: 'hidden' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', borderRadius: '20px', objectFit: 'cover', display: 'block' }} 
            />
          </div>

          <div style={{ padding: '1rem' }}>
            <span style={{ 
              color: '#3b82f6', 
              fontWeight: '800', 
              fontSize: '0.9rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>
              {product.category || 'Product'}
            </span>
            <h1 style={{ fontSize: '3.5rem', margin: '0.5rem 0 1rem', fontWeight: '800', letterSpacing: '-1px' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
              <p style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1a1a1a' }}>${Number(product.offer_price || product.price).toFixed(2)}</p>
              {product.offer_price && (
                <p style={{ fontSize: '1.2rem', color: '#999', textDecoration: 'line-through' }}>${Number(product.price).toFixed(2)}</p>
              )}
            </div>
            
            <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
              {product.description}
            </p>

            <div style={{ background: '#f0f9ff', border: '1px solid #e0f2fe', padding: '1.5rem', borderRadius: '20px', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ShieldCheck size={24} color="#0ea5e9" />
              <div>
                <span style={{ display: 'block', fontSize: '1rem', fontWeight: '700', color: '#0369a1' }}>Authentic product</span>
                <span style={{ fontSize: '0.85rem', color: '#0ea5e9' }}>Sold and fulfilled by {business.name}</span>
              </div>
            </div>

            <button className="btn-shop-dark" style={{ width: '100%', padding: '1.5rem', fontSize: '1.2rem', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <ShoppingCart size={24} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
