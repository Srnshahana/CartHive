import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ShoppingBag, ArrowLeft, Trash2, ShieldCheck, ChevronRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { slug } = useParams();
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const { data } = await supabase.from('businesses').select('*').eq('slug', slug).single();
        setBusiness(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [slug]);

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="cart-page" style={{ padding: '140px 5% 8rem', background: '#fcfcfc', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <Link to={`/${slug}/products`} className="back-link-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontWeight: '600', textTransform: 'lowercase', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> back to collection
          </Link>
        </div>

        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '900', letterSpacing: '-3px', marginBottom: '4rem', lineHeight: 0.9, textTransform: 'lowercase' }}>
          your <span style={{ color: '#3b82f6' }}>shopping bag</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'start' }}>
          {/* Cart Items List */}
          <div>
            {cart.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex', gap: '2.5rem', alignItems: 'center',
                    padding: '2rem', background: '#fff', borderRadius: '32px',
                    border: '1px solid #f1f5f9', boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ width: '140px', height: '140px', borderRadius: '24px', overflow: 'hidden', background: '#f8fafc', flexShrink: 0 }}>
                      <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                          <p style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                            {item.categories?.name || 'exclusive'}
                          </p>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', letterSpacing: '-0.5px' }}>{item.name}</h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', transition: 'color 0.2s' }}
                          className="trash-btn-hover"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', background: '#f8fafc',
                          borderRadius: '16px', padding: '0.4rem'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            style={{ width: '36px', height: '36px', borderRadius: '12px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ width: '30px', textAlign: 'center', fontWeight: '800', fontSize: '1rem' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            style={{ width: '36px', height: '36px', borderRadius: '12px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a' }}>${(Number(item.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '10rem 2rem', background: '#fff', borderRadius: '48px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '100px', height: '100px', background: '#f8fafc', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem' }}>
                  <ShoppingBag size={48} color="#e2e8f0" />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '1rem' }}>your bag is empty</h2>
                <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '3rem' }}>it looks like you haven't added anything yet.</p>
                <Link to={`/${slug}/products`} className="btn-shop-dark" style={{ padding: '1.2rem 3rem' }}>browse our collection</Link>
              </div>
            )}
          </div>

          {/* Order Summary Side */}
          {cart.length > 0 && (
            <div style={{ position: 'sticky', top: '140px' }}>
              <div style={{
                background: '#fff', padding: '3rem', borderRadius: '40px',
                border: '1px solid #f1f5f9', boxShadow: '0 20px 60px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '2.5rem', letterSpacing: '-0.5px' }}>order summary</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>subtotal</span>
                    <span style={{ fontWeight: '800', color: '#0f172a' }}>${Number(cartTotal).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>shipping</span>
                    <span style={{ color: '#10b981', fontWeight: '800' }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>est. taxes</span>
                    <span style={{ fontWeight: '800', color: '#0f172a' }}>$0.00</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: '900' }}>total</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a' }}>${Number(cartTotal).toFixed(2)}</span>
                </div>

                <button className="btn-shop-dark" style={{ width: '100%', height: '72px', borderRadius: '24px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                  checkout now <ChevronRight size={20} />
                </button>

                <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '20px' }}>
                  <ShieldCheck size={24} color="#10b981" />
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500', lineHeight: 1.4 }}>
                    your transaction is secure and encrypted by CartHive.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .trash-btn-hover:hover {
          color: #ef4444 !important;
          transform: scale(1.1);
        }
        .back-link-hover:hover {
          color: #0f172a !important;
          transform: translateX(-5px);
        }
      `}</style>
    </div>
  );
};

export default Cart;
