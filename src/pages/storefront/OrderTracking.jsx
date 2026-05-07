import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Package, Clock, CheckCircle2, AlertCircle, ArrowLeft, Truck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const OrderTracking = () => {
  const { slug } = useParams();
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
        throw new Error('order not found. please check your order id and try again.');
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
    <div className="tracking-page" style={{ padding: '140px 5% 8rem', background: '#fcfcfc', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '4rem' }}>
          <Link to={`/${slug}`} className="back-link-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontWeight: '600', textTransform: 'lowercase', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> back to store
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '900', letterSpacing: '-3px', marginBottom: '1.5rem', lineHeight: 0.9, textTransform: 'lowercase' }}>
            track your <span style={{ color: '#3b82f6' }}>order</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto' }}>
            enter your order id below to see the journey of your curated selection.
          </p>
        </div>

        <form onSubmit={handleTrack} style={{ display: 'flex', gap: '1rem', marginBottom: '6rem', background: '#fff', padding: '0.75rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
            <input 
              type="text" 
              placeholder="order id (e.g., ord-001)" 
              style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 4rem', border: 'none', background: 'transparent', outline: 'none', fontSize: '1.1rem', fontWeight: '600', color: '#0f172a' }}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-shop-dark" style={{ padding: '0 3rem', borderRadius: '24px', height: '64px' }} disabled={loading}>
            {loading ? 'searching...' : 'track order'}
          </button>
        </form>

        {error && (
          <div style={{ padding: '3rem', textAlign: 'center', borderRadius: '32px', border: '1px solid #fee2e2', background: '#fff', boxShadow: '0 20px 40px rgba(239, 68, 68, 0.05)' }}>
            <AlertCircle size={40} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
            <p style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: '600' }}>{error}</p>
          </div>
        )}

        {order && (
          <div style={{ background: '#fff', padding: '4rem', borderRadius: '48px', border: '1px solid #f1f5f9', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', animation: 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5rem', paddingBottom: '2.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: '900', marginBottom: '0.5rem' }}>order reference</p>
                <h3 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-1px' }}>#{order.id}</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: '900', marginBottom: '0.5rem' }}>status</p>
                <span style={{ 
                  background: '#f8fafc', color: '#0f172a', padding: '0.6rem 1.5rem', 
                  borderRadius: '50px', fontSize: '0.9rem', fontWeight: '900', border: '1px solid #e2e8f0',
                  textTransform: 'lowercase'
                }}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6rem', position: 'relative' }}>
              {/* Progress Line */}
              <div style={{ position: 'absolute', top: '30px', left: '10%', right: '10%', height: '4px', background: '#f1f5f9', zIndex: 0, borderRadius: '10px' }}></div>
              <div style={{ 
                position: 'absolute', top: '30px', left: '10%', 
                width: `${(getStatusStep(order.status) - 1) * 33.33}%`, 
                height: '4px', background: '#3b82f6', zIndex: 1, 
                transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
              }}></div>

              {[
                { label: 'placed', icon: Clock },
                { label: 'processing', icon: Package },
                { label: 'shipped', icon: Truck },
                { label: 'delivered', icon: CheckCircle2 }
              ].map((step, i) => {
                const isActive = i + 1 <= getStatusStep(order.status);
                const Icon = step.icon;
                return (
                  <div key={step.label} style={{ textAlign: 'center', zIndex: 2, position: 'relative' }}>
                    <div style={{ 
                      width: '64px', height: '64px', borderRadius: '24px', 
                      background: isActive ? '#3b82f6' : '#fff', 
                      border: `2px solid ${isActive ? '#3b82f6' : '#f1f5f9'}`,
                      color: isActive ? '#fff' : '#cbd5e1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      transition: 'all 0.5s ease',
                      boxShadow: isActive ? '0 15px 30px rgba(59, 130, 246, 0.25)' : 'none'
                    }}>
                      <Icon size={24} />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '900', color: isActive ? '#0f172a' : '#cbd5e1', textTransform: 'lowercase' }}>{step.label}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ background: '#f8fafc', padding: '3rem', borderRadius: '32px', border: '1px solid #f1f5f9' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0f172a', marginBottom: '2rem' }}>order details</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
                    <img src={order.products?.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  </div>
                  <div>
                    <p style={{ fontWeight: '800', color: '#0f172a', fontSize: '1.1rem' }}>{order.products?.name}</p>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>quantity: {order.quantity}</p>
                  </div>
                </div>
                <p style={{ fontWeight: '900', fontSize: '1.2rem', color: '#0f172a' }}>${Number(order.total_amount).toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', marginTop: '1.5rem' }}>
                <span style={{ fontWeight: '900', fontSize: '1.1rem', color: '#0f172a' }}>total amount</span>
                <span style={{ fontWeight: '900', fontSize: '1.5rem', color: '#3b82f6' }}>${Number(order.total_amount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .back-link-hover:hover {
          color: #0f172a !important;
          transform: translateX(-5px);
        }
      `}</style>
    </div>
  );
};

export default OrderTracking;
