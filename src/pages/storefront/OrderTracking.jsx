import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Package, Truck, CheckCircle, Clock, ArrowLeft, Loader2, Mail, Phone, MapPin, Eye } from 'lucide-react';

const OrderTracking = () => {
  const { slug } = useParams();
  const [business, setBusiness] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data } = await supabase.from('businesses').select('*').eq('slug', slug).single();
      setBusiness(data);
    };
    fetchBusiness();
  }, [slug]);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrders(null);

    try {
      if (!business) {
        setError('Store information is still loading. Please try again in a moment.');
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*, products(name, image)')
        .eq('business_id', business.id)
        .eq('email', email.trim())
        .eq('phone', phone.trim())
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (!data || data.length === 0) {
        setError('No orders found with these details. Please check your email and phone number.');
      } else {
        setOrders(data);
      }
    } catch (err) {
      console.error('Tracking error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'completed': return 4;
      case 'shipped': return 3;
      case 'processing': return 2;
      case 'pending': return 1;
      default: return 1;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f0ea', padding: '160px 2rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Tracking Form */}

        {/* Tracking Form */}
        <div style={{ background: '#fff', padding: '3.5rem', borderRadius: '40px', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
          {/* Minimal Decor */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle at center, rgba(59,130,246,0.03) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ width: '64px', height: '64px', background: '#fcfcfc', border: '1px solid #f1f5f9', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Package size={30} color="#3b82f6" strokeWidth={1.5} />
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '900', color: '#111', letterSpacing: '-0.02em', marginBottom: '12px' }}>Track Your Order</h1>
            <p style={{ color: '#888', fontSize: '1rem', fontWeight: '500' }}>Enter the contact details used during checkout</p>
          </div>

          <form onSubmit={handleTrack} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#bbb', letterSpacing: '0.1em' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#ddd' }} />
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #eee', outline: 'none', fontSize: '1rem', background: '#fcfcfc', transition: 'all 0.3s' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#bbb', letterSpacing: '0.1em' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#ddd' }} />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #eee', outline: 'none', fontSize: '1rem', background: '#fcfcfc', transition: 'all 0.3s' }}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '1.25rem', background: '#111', color: '#fff', border: 'none', borderRadius: '18px', fontSize: '0.95rem', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s ease', marginTop: '1rem', letterSpacing: '0.05em' }}
            >
              {loading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} size={20} /> : 'SEARCH MY ORDER'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '2rem', padding: '1.25rem', background: '#fff5f5', color: '#e53e3e', borderRadius: '16px', textAlign: 'center', fontSize: '0.9rem', fontWeight: '700', border: '1px solid #fed7d7' }}>
              {error}
            </div>
          )}
        </div>

        {/* Tracking Results */}
        {orders && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#111', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '1rem' }}>Found {orders.length} Order{orders.length > 1 ? 's' : ''}</h2>

            {orders.map(order => (
              <div key={order.id} style={{ background: '#fff', borderRadius: '40px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                {/* Status Badge & Meta */}
                <div style={{ padding: '2.5rem', background: '#fafaf9', borderBottom: '1px solid #f0f0ee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: order.status === 'completed' ? '#10b981' : '#3b82f6', boxShadow: `0 0 0 4px ${order.status === 'completed' ? '#dcfce7' : '#dbeafe'}` }} />
                    <div>
                      <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Order Status</p>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#111', textTransform: 'capitalize' }}>{order.status}</h4>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Ordered On</p>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#111' }}>{new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</h4>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div style={{ padding: '4rem 3rem' }}>
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                    {/* Background Line */}
                    <div style={{ position: 'absolute', top: '24px', left: '12%', right: '12%', height: '2px', background: '#f1f1ee', zIndex: 1 }} />
                    {/* Active Line */}
                    <div style={{ position: 'absolute', top: '24px', left: '12%', width: `${((getStatusStep(order.status) - 1) / 3) * 76}%`, height: '2px', background: '#111', zIndex: 1, transition: 'width 1.5s ease-out' }} />

                    <StatusNode icon={<Clock size={18} />} label="Ordered" active={getStatusStep(order.status) >= 1} />
                    <StatusNode icon={<Package size={18} />} label="Processing" active={getStatusStep(order.status) >= 2} />
                    <StatusNode icon={<Truck size={18} />} label="Shipped" active={getStatusStep(order.status) >= 3} />
                    <StatusNode icon={<CheckCircle size={18} />} label="Delivered" active={getStatusStep(order.status) >= 4} />
                  </div>
                </div>

                {/* Items & Summary */}
                <div style={{ padding: '2.5rem', borderTop: '1px solid #f1f1ee', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '70px', height: '90px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eee' }}>
                      <img src={order.products?.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '6px', color: '#111' }}>{order.products?.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#888', fontWeight: '500' }}>Qty: {order.quantity} • Paid via QR</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: '900', color: '#3b82f6', marginTop: '8px' }}>${Number(order.total_amount).toFixed(2)}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fcfcfc', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                      <Eye size={20} color="#111" />
                    </div>
                    <p style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', color: '#bbb' }}>Ref: #{String(order.id).slice(0, 6)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div style={{ marginTop: '5rem', textAlign: 'center', padding: '3rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '0.85rem', color: '#999', fontWeight: '500' }}>Having trouble finding your order? Contact the store owner via WhatsApp.</p>
        </div>

      </div>
    </div>
  );
};

const StatusNode = ({ icon, label, active }) => (
  <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: active ? '#111' : '#fff',
      border: `1.5px solid ${active ? '#111' : '#f1f1ee'}`,
      color: active ? '#fff' : '#ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: active ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
    }}>
      {icon}
    </div>
    <span style={{ fontSize: '0.7rem', fontWeight: '900', color: active ? '#111' : '#bbb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
  </div>
);

export default OrderTracking;
