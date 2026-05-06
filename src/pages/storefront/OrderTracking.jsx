import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Package, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const { data, error: queryError } = await supabase
        .from('orders')
        .select('*, products(*)')
        .eq('id', orderId)
        .single();

      if (queryError || !data) {
        throw new Error('Order not found. Please check your Order ID.');
      }

      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    const steps = ['pending_payment', 'processing', 'shipped', 'delivered'];
    return steps.indexOf(status?.toLowerCase()) + 1;
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Track your <span className="gradient-text">order</span></h1>
          <p style={{ color: '#64748b' }}>Enter your order ID to see the current status of your delivery.</p>
        </div>

        <form onSubmit={handleTrack} style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter Order ID (e.g., ord-001)" 
              style={{ paddingLeft: '3rem' }}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-shop-dark" style={{ padding: '0 2rem' }} disabled={loading}>
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', border: '1px solid #fee2e2', background: '#fef2f2' }}>
            <AlertCircle size={32} color="#dc2626" style={{ marginBottom: '1rem' }} />
            <p style={{ color: '#dc2626', margin: 0 }}>{error}</p>
          </div>
        )}

        {order && (
          <div className="glass-card" style={{ padding: '3rem', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Order ID</p>
                <h3 style={{ fontSize: '1.5rem', margin: '0.2rem 0' }}>#{order.id}</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Status</p>
                <span className={`status-pill status-${order.status.toLowerCase()}`} style={{ fontSize: '1rem', padding: '0.5rem 1.2rem' }}>
                  {order.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', position: 'relative' }}>
              {/* Progress Line */}
              <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: '#eee', zIndex: 0 }}></div>
              <div style={{ position: 'absolute', top: '24px', left: '10%', width: `${(getStatusStep(order.status) - 1) * 33.33}%`, height: '2px', background: '#3b82f6', zIndex: 1, transition: 'width 1s ease' }}></div>

              {[
                { label: 'Placed', icon: Clock },
                { label: 'Processing', icon: Package },
                { label: 'Shipped', icon: Package },
                { label: 'Delivered', icon: CheckCircle2 }
              ].map((step, i) => {
                const isActive = i + 1 <= getStatusStep(order.status);
                const Icon = step.icon;
                return (
                  <div key={step.label} style={{ textAlign: 'center', zIndex: 2, position: 'relative' }}>
                    <div style={{ 
                      width: '50px', height: '50px', borderRadius: '50%', 
                      background: isActive ? '#3b82f6' : 'white', 
                      border: `2px solid ${isActive ? '#3b82f6' : '#eee'}`,
                      color: isActive ? 'white' : '#94a3b8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1rem',
                      transition: 'all 0.3s ease'
                    }}>
                      <Icon size={20} />
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: isActive ? '700' : '500', color: isActive ? '#1a1a1a' : '#94a3b8' }}>{step.label}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '20px' }}>
              <h4 style={{ marginBottom: '1.5rem', fontWeight: '800' }}>Order Summary</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Item</span>
                <span style={{ fontWeight: '700' }}>{order.products?.name} (x{order.quantity})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', marginTop: '1rem' }}>
                <span style={{ fontWeight: '800' }}>Total Amount</span>
                <span style={{ fontWeight: '800', fontSize: '1.2rem', color: '#3b82f6' }}>${order.total_amount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
