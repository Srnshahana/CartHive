import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, ShoppingBag, ShieldCheck, Minus, Plus, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductDetails = () => {
  const { slug, id } = useParams();
  const [product, setProduct] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const { data: biz } = await supabase.from('businesses').select('*').eq('slug', slug).single();
        setBusiness(biz);
        if (biz) {
          const { data: prod } = await supabase.from('products').select('*, categories(*)').eq('id', id).single();
          setProduct(prod);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [slug, id]);

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loading-spinner"></div>
    </div>
  );
  if (!product || !business) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}><h1>Product not found</h1><Link to={`/${slug}`}>Return to store</Link></div>;

  return (
    <div className="product-details-page" style={{ padding: '140px 5% 8rem', background: '#fcfcfc', minHeight: '100vh' }}>
      <div className="container">
        {/* Navigation */}
        <Link to={`/${slug}/products`} className="back-link-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontWeight: '600', marginBottom: '3rem', textTransform: 'lowercase', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> back to collection
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '6rem', alignItems: 'start' }}>
          {/* Image Side */}
          <div style={{ position: 'sticky', top: '140px' }}>
            <div className="product-image-container" style={{ borderRadius: '48px', overflow: 'hidden', background: '#f8fafc', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
              {product.is_bestseller && (
                <div style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 10, background: '#000', color: 'white', padding: '8px 18px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.1em' }}>BEST SELLER</div>
              )}
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
              <button className="heart-btn" style={{ position: 'absolute', top: '30px', right: '30px', background: '#fff', border: 'none', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
                <Heart size={20} color="#94a3b8" />
              </button>
            </div>
          </div>

          {/* Info Side */}
          <div style={{ padding: '1rem 0' }}>
            <div style={{ marginBottom: '3rem' }}>
              <p style={{ color: '#3b82f6', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                {product.categories?.name || 'exclusive collection'}
              </p>
              <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '900', letterSpacing: '-3px', lineHeight: 0.9, marginBottom: '2rem', textTransform: 'lowercase' }}>
                {product.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <p style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a' }}>${Number(product.price).toFixed(2)}</p>
                {product.offer_price && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <p style={{ fontSize: '1.4rem', color: '#94a3b8', textDecoration: 'line-through' }}>${Number(product.offer_price).toFixed(2)}</p>
                    <span style={{ background: '#fef2f2', color: '#ef4444', padding: '4px 12px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '800' }}>SALE</span>
                  </div>
                )}
              </div>

              <p style={{ color: '#64748b', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '3rem' }}>
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', background: '#fff',
                border: '1px solid #e2e8f0', borderRadius: '24px', padding: '0.5rem'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '50px', height: '50px', borderRadius: '20px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Minus size={18} />
                </button>
                <span style={{ width: '40px', textAlign: 'center', fontWeight: '800', fontSize: '1.2rem' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '50px', height: '50px', borderRadius: '20px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={() => addToCart(product, quantity)}
                className="btn-shop-dark"
                style={{ flex: 1, borderRadius: '24px', fontSize: '1.1rem', padding: '0 2rem', height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
              >
                <ShoppingBag size={20} /> add to cart
              </button>
            </div>

            {/* Trust Badge */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '32px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
                <ShieldCheck size={28} color="#10b981" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>secure purchase</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>fully authenticated and fulfilled by {business.name}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .heart-btn:hover {
          transform: scale(1.1);
          background: #ef4444 !important;
        }
        .heart-btn:hover svg {
          color: #fff !important;
        }
        .back-link-hover:hover {
          color: #0f172a !important;
          transform: translateX(-5px);
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;

