import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ShoppingBag, ArrowLeft, Trash2, ShieldCheck, ChevronRight } from 'lucide-react';

const Cart = () => {
  const { slug } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const { data } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', slug)
          .single();
        setBusiness(data);
      } catch (err) {
        console.error('Error fetching business for cart:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
    
    // For demo, we'll just show an empty cart state or mock items since we don't have global cart state yet
    setCartItems([]);
  }, [slug]);

  if (loading) return <div className="container section">Loading cart...</div>;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <Link to={`/${slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontWeight: '600' }}>
            <ArrowLeft size={18} /> Continue Shopping at {business?.name || 'Store'}
          </Link>
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '3rem' }}>Your <span className="gradient-text">Shopping Bag</span></h1>

        <div className="grid grid-cols-3" style={{ gap: '3rem', alignItems: 'start' }}>
          <div className="col-span-2">
            {cartItems.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cartItems.map(item => (
                  <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <img src={item.image} style={{ width: '100px', height: '100px', borderRadius: '15px', objectFit: 'cover' }} alt={item.name} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: '800' }}>{item.name}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Quantity: {item.quantity}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>${(item.price * item.quantity).toFixed(2)}</p>
                      <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '5rem', textAlign: 'center' }}>
                <div style={{ background: '#f8fafc', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#94a3b8' }}>
                  <ShoppingBag size={40} />
                </div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800' }}>Your bag is empty</h2>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
                <Link to={`/${slug}/products`} className="btn-shop-dark" style={{ display: 'inline-flex' }}>Browse Products</Link>
              </div>
            )}
          </div>

          <div className="col-span-1">
            <div className="glass-card" style={{ padding: '2.5rem', background: '#f8fafc', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Subtotal</span>
                  <span style={{ fontWeight: '700' }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Shipping</span>
                  <span style={{ color: '#22c55e', fontWeight: '700' }}>FREE</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>Total</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#3b82f6' }}>${total.toFixed(2)}</span>
              </div>

              <button className="btn-shop-dark" style={{ width: '100%', padding: '1.25rem', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }} disabled={cartItems.length === 0}>
                Checkout Now <ChevronRight size={20} />
              </button>

              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b', fontSize: '0.85rem' }}>
                <ShieldCheck size={18} color="#22c55e" />
                <span>Secure payment powered by CartHive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
