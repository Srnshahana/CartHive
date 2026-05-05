import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabaseDemo } from '../data/supabaseDemo';
import { ArrowLeft, Trash2, CreditCard, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { slug } = useParams();
  const business = supabaseDemo.businesses.find(b => b.slug === slug);
  
  // For demo, we'll just use a static cart based on the first product of the business
  const demoProduct = supabaseDemo.products.find(p => p.business_id === business?.id);
  const cartItems = demoProduct ? [{ ...demoProduct, quantity: 1 }] : [];

  if (!business) return <div className="container section">Store not found</div>;

  return (
    <div className="section">
      <div className="container">
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem' }}>Your <span className="gradient-text">Cart</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Shopping at {business.name}</p>
        </header>

        {cartItems.length > 0 ? (
          <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map(item => (
                <div key={item.id} className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem' }}>{item.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.category}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>${item.price}</div>
                    <button className="btn btn-glass" style={{ padding: '0.4rem', color: '#ef4444' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <Link to={`/${slug}`} className="btn btn-glass" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                <ArrowLeft size={18} /> Continue Shopping
              </Link>
            </div>

            <div className="glass-card" style={{ height: 'fit-content' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>${cartItems[0].price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery</span>
                <span style={{ color: '#10b981' }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', fontSize: '1.25rem', fontWeight: '700' }}>
                <span>Total</span>
                <span className="gradient-text">${cartItems[0].price}</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}>
                <CreditCard size={20} /> Checkout Now
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem' }} className="glass-card">
            <ShoppingBag size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
            <h2>Your cart is empty</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Go back to the store to find some amazing products!</p>
            <Link to={`/${slug}`} className="btn btn-primary">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
