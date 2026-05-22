import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ShoppingBag, ArrowLeft, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, [loading, cart]);

  if (loading) return (
    <div className="boutique-page-wrapper" style={{ paddingTop: '160px' }}>
      <div className="container">
        <div className="shimmer-effect" style={{ width: '300px', height: '40px', margin: '0 auto 60px', borderRadius: '4px' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="shimmer-effect" style={{ height: '180px', borderRadius: '12px' }}></div>
            ))}
          </div>
          <div className="shimmer-effect" style={{ height: '400px', borderRadius: '12px' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="boutique-page-wrapper">
      <div className="container">
        {cart.length > 0 && (
          <h1 className="cart-title reveal-on-scroll" style={{ 
            transitionDelay: '0.1s', 
            textAlign: 'center', 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            marginBottom: 'clamp(1.5rem, 4vw, 3rem)'
          }}>
            your shopping bag <span style={{ color: '#aaa', fontWeight: '400', fontSize: 'clamp(1rem, 3vw, 1.5rem)', marginLeft: '10px', verticalAlign: 'middle' }}>/ {cartCount} items</span>
          </h1>
        )}

        {cart.length > 0 ? (
          <div className="cart-grid">
            {/* Cart Items */}
            <div className="cart-items-list">
              {cart.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="cart-item-card reveal-on-scroll" 
                  style={{ transitionDelay: `${0.2 + idx * 0.1}s` }}
                >
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.categories?.name || 'boutique item'}</span>
                        <h3 className="cart-item-name" style={{ marginTop: '5px' }}>{item.name.toLowerCase()}</h3>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.color = '#1a1a1a'}
                        onMouseLeave={(e) => e.target.style.color = '#ccc'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #dcdbd5', borderRadius: '4px', padding: '2px' }}>
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{ background: 'none', border: 'none', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ width: '30px', textAlign: 'center', fontSize: '0.85rem', fontWeight: '600' }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{ background: 'none', border: 'none', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                        ₹{(Number(item.price) * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Summary */}
            <div className="cart-summary-box reveal-on-scroll" style={{ transitionDelay: '0.4s', borderRadius: '8px', border: '1px solid #dcdbd5' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '30px', textTransform: 'lowercase', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>order summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>subtotal</span>
                  <span style={{ fontWeight: '600' }}>₹{Number(cartTotal).toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>estimated shipping</span>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>tax</span>
                  <span style={{ fontWeight: '600' }}>₹0</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>total</span>
                <span style={{ fontWeight: '800', fontSize: '1.5rem' }}>₹{Number(cartTotal).toFixed(0)}</span>
              </div>

              <Link 
                to={`/${slug}/checkout`}
                className="boutique-btn" 
                style={{ borderRadius: '4px', height: '60px', gap: '10px', textDecoration: 'none' }}
              >
                checkout <ArrowRight size={18} />
              </Link>

              <div style={{ marginTop: '30px', padding: '20px', background: '#fafafa', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.75rem', color: '#999', lineHeight: 1.6 }}>
                  By proceeding to checkout, you agree to our Terms of Service and Privacy Policy. All transactions are secure and encrypted.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="reveal-on-scroll" style={{ 
            margin: '0 auto',
            maxWidth: '600px',
            padding: '100px 40px', 
            textAlign: 'center', 
            background: '#fff', 
            borderRadius: '40px', 
            border: '1px solid #dcdbd5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.03)'
          }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              background: '#fcfcfc', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '2.5rem',
              border: '1px solid #eee'
            }}>
              <ShoppingBag size={40} strokeWidth={1} color="#aaa" />
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111', marginBottom: '16px', letterSpacing: '-0.03em' }}>your bag is empty</h2>
            <p style={{ color: '#888', marginBottom: '3.5rem', fontSize: '1.1rem', maxWidth: '380px', lineHeight: 1.7 }}>
              Looks like you haven't added anything yet. Explore our curated selection of pieces.
            </p>
            <Link 
              to={`/${slug}/products`} 
              className="boutique-btn" 
              style={{ 
                display: 'inline-flex', 
                padding: '0 60px', 
                width: 'auto', 
                borderRadius: '50px',
                height: '64px',
                fontSize: '0.95rem',
                letterSpacing: '0.1em'
              }}
            >
              explore collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
