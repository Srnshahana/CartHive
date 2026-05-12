import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Search, Package, Truck, CheckCircle, Clock, ArrowLeft, Loader2, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const TrackOrder = () => {
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
    <div style={{ minHeight: '100vh', background: '#f1f0ea', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <Link to={`/${slug}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}>
            <ArrowLeft size={18} /> BACK TO STORE
          </Link>
          {business && (
            <h2 style={{ fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>{business.name}</h2>
          )}
        </div>

        {/* Tracking Form */}
        <div style={{ background: '#fff', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ width: '60px', height: '60px', background: '#f8fafc', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Package size={28} color="#3b82f6" />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#111', marginBottom: '10px' }}>Track Your Order</h1>
            <p style={{ color: '#666', fontSize: '1rem' }}>Enter your details to check your order status</p>
          </div>

          <form onSubmit={handleTrack} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                  <input 
                    type="email" 
                    required 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1px solid #eee', outline: 'none', fontSize: '1rem', background: '#fcfcfc' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                  <input 
                    type="tel" 
                    required 
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1px solid #eee', outline: 'none', fontSize: '1rem', background: '#fcfcfc' }}
                  />
                </div>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: '1.2rem', background: '#111', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '1rem', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s ease', marginTop: '1rem' }}
            >
              {loading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : 'TRACK ORDER'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff5f5', color: '#e53e3e', borderRadius: '12px', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600', border: '1px solid #fed7d7' }}>
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {orders && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111' }}>Found {orders.length} order{orders.length > 1 ? 's' : ''}</h2>
            {orders.map(order => (
              <div key={order.id} style={{ background: '#fff', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
                {/* Order Meta */}
                <div style={{ padding: '2rem', borderBottom: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#999', textTransform: 'uppercase' }}>Order ID</p>
                    <p style={{ fontWeight: '800', fontSize: '1.1rem' }}>#{order.id.slice(0, 8)}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#999', textTransform: 'uppercase' }}>Placed On</p>
                    <p style={{ fontWeight: '800', fontSize: '1.1rem' }}>{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ padding: '3rem 2rem' }}>
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '4px', background: '#f1f5f9', zIndex: 1 }}>
                      <div style={{ width: `${((getStatusStep(order.status) - 1) / 3) * 100}%`, height: '100%', background: '#3b82f6', transition: 'width 1s ease' }}></div>
                    </div>
                    
                    <StatusStep icon={<Clock size={20} />} label="Pending" active={getStatusStep(order.status) >= 1} />
                    <StatusStep icon={<Package size={20} />} label="Processing" active={getStatusStep(order.status) >= 2} />
                    <StatusStep icon={<Truck size={20} />} label="Shipped" active={getStatusStep(order.status) >= 3} />
                    <StatusStep icon={<CheckCircle size={20} />} label="Completed" active={getStatusStep(order.status) >= 4} />
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ padding: '2rem', borderTop: '1px solid #f5f5f5' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <img src={order.products?.image} alt="" style={{ width: '80px', height: '100px', borderRadius: '16px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '4px' }}>{order.products?.name}</h3>
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>Quantity: {order.quantity}</p>
                      <p style={{ fontWeight: '800', color: '#3b82f6', marginTop: '8px' }}>Total: ${Number(order.total_amount).toFixed(2)}</p>
                    </div>
                    {order.status === 'completed' && (
                      <div style={{ textAlign: 'center', color: '#10b981' }}>
                        <CheckCircle size={32} />
                        <p style={{ fontSize: '0.7rem', fontWeight: '800', marginTop: '4px' }}>DELIVERED</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

const StatusStep = ({ icon, label, active }) => (
  <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: active ? '#3b82f6' : '#fff', border: `2px solid ${active ? '#3b82f6' : '#f1f5f9'}`, color: active ? '#fff' : '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', boxShadow: active ? '0 10px 20px rgba(59,130,246,0.2)' : 'none' }}>
      {icon}
    </div>
    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: active ? '#111' : '#ccc', textTransform: 'uppercase' }}>{label}</span>
  </div>
);

export default TrackOrder;
