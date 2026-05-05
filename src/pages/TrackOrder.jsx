import React, { useState } from 'react';
import { supabaseDemo } from '../data/supabaseDemo';
import { Search, Package, Clock, CheckCircle2 } from 'lucide-react';

const TrackOrder = () => {
  const [phone, setPhone] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const foundOrders = supabaseDemo.orders.filter(o => o.customer_phone === phone);
    setResults(foundOrders);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock size={20} color="var(--primary)" />;
      case 'Shipped': return <Package size={20} color="var(--secondary)" />;
      case 'Delivered': return <CheckCircle2 size={20} color="#10b981" />;
      default: return <Clock size={20} color="var(--primary)" />;
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Track Your <span className="gradient-text">Orders</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Enter your phone number to see all your recent orders across all stores.</p>
        </header>

        <form onSubmit={handleSearch} className="glass-card" style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
          <input 
            type="tel" 
            placeholder="Enter phone number (e.g. 5551234)" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
            style={{ flex: 1, padding: '0.75rem 1.5rem', background: 'var(--surface)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'white', fontSize: '1.1rem' }} 
          />
          <button type="submit" className="btn btn-primary">
            <Search size={20} /> Search
          </button>
        </form>

        {results && (
          <div className="fade-in">
            {results.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {results.map(order => (
                  <div key={order.id} className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Order ID</span>
                        <h3 style={{ fontSize: '1.1rem' }}>#{order.id}</h3>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Status</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                          {getStatusIcon(order.status)} {order.status}
                        </div>
                      </div>
                    </div>
                    <div>
                      {order.items.map((item, idx) => {
                        const product = supabaseDemo.products.find(p => p.id === item.product_id);
                        return (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>{item.quantity}x {product?.name || 'Unknown Product'}</span>
                            <span style={{ fontWeight: '600' }}>${item.price * item.quantity}</span>
                          </div>
                        );
                      })}
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.25rem' }}>
                        <span>Total</span>
                        <span className="gradient-text">${order.total_price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                No orders found for this phone number.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
