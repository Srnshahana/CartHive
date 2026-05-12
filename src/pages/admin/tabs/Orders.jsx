import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Search, ExternalLink, MessageCircle, Eye, Loader2, Filter, CheckCircle, Clock, Truck, XCircle, X, MapPin, User, Package, CreditCard, Calendar } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const savedUser = localStorage.getItem('carthive_user');
      const userData = JSON.parse(savedUser);

      const { data, error } = await supabase
        .from('orders')
        .select('*, products(name, image)')
        .eq('business_id', userData.business_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const openWhatsApp = (phone, name, orderId) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = `Hello ${name}, this is regarding your order #${orderId.slice(0, 8)} from our store.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return { bg: '#dcfce7', text: '#166534', icon: <CheckCircle size={14} /> };
      case 'shipped': return { bg: '#dbeafe', text: '#1e40af', icon: <Truck size={14} /> };
      case 'processing': return { bg: '#fef9c3', text: '#854d0e', icon: <Clock size={14} /> };
      case 'cancelled': return { bg: '#fee2e2', text: '#991b1b', icon: <XCircle size={14} /> };
      default: return { bg: '#f1f5f9', text: '#475569', icon: <Clock size={14} /> };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm) ||
      order.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return (
    <div style={{ padding: '2rem' }}>
      <div className="shimmer-effect" style={{ height: '80px', borderRadius: '16px', marginBottom: '1.5rem' }}></div>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '2rem' }}>
            <div className="shimmer-effect" style={{ width: '100px', height: '24px', borderRadius: '4px' }}></div>
            <div className="shimmer-effect" style={{ width: '150px', height: '24px', borderRadius: '4px' }}></div>
            <div className="shimmer-effect" style={{ width: '200px', height: '24px', borderRadius: '4px' }}></div>
            <div className="shimmer-effect" style={{ width: '80px', height: '24px', borderRadius: '20px', marginLeft: 'auto' }}></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="admin-orders-container" style={{ padding: '1.5rem' }}>
      {/* Header & Filters */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '350px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
            <input 
              type="text" 
              placeholder="Search name, phone or ID..." 
              style={{ width: '100%', padding: '12px 16px 12px 48px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.9rem', color: '#0f172a', outline: 'none' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Filter style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
            <select 
              style={{ padding: '12px 40px 12px 42px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '600', color: '#475569', outline: 'none', appearance: 'none', minWidth: '160px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>results</p>
            <p style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>{filteredOrders.length} orders</p>
          </div>
          <button onClick={fetchOrders} style={{ width: '42px', height: '42px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Loader2 size={18} color="#64748b" className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-table-wrapper" style={{ overflowX: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Order Info</th>
              <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Customer</th>
              <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Product</th>
              <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Status</th>
              <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const status = getStatusColor(order.status);
              return (
                <tr 
                  key={order.id} 
                  onClick={() => setSelectedOrder(order)}
                  style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <p style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>#{String(order.id).slice(0, 8)}</p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(order.created_at).toLocaleDateString()}</p>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <p style={{ fontWeight: '600', color: '#0f172a' }}>{order.customer_name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{order.phone}</p>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>{order.products?.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>${Number(order.total_amount).toFixed(2)}</p>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', background: status.bg, color: status.text, fontSize: '0.7rem', fontWeight: '800' }}>
                      {status.icon} {order.status}
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                      style={{ background: '#f1f5f9', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', color: '#475569', fontWeight: '700', fontSize: '0.75rem' }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            style={{ background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Order Details</h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Order ID: #{selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem', overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
              
              {/* Left Column: Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Status Update Card */}
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Current Status</h4>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: getStatusColor(selectedOrder.status).bg, color: getStatusColor(selectedOrder.status).text, fontSize: '0.75rem', fontWeight: '800' }}>
                      {getStatusColor(selectedOrder.status).icon} {selectedOrder.status}
                    </div>
                  </div>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <select 
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                      disabled={updatingId === selectedOrder.id}
                      style={{ 
                        flex: 1, 
                        padding: '12px 40px 12px 16px', 
                        borderRadius: '10px', 
                        border: '1px solid #e2e8f0', 
                        outline: 'none', 
                        background: '#fff', 
                        appearance: 'none',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        width: '100%'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <div style={{ position: 'absolute', right: '16px', pointerEvents: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                      <Filter size={16} />
                    </div>
                  </div>
                </div>

                {/* Grid Info Sections */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={14} /> Customer
                    </h4>
                    <p style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '5px' }}>{selectedOrder.customer_name}</p>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '10px' }}>{selectedOrder.email}</p>
                    <button 
                      onClick={() => openWhatsApp(selectedOrder.phone, selectedOrder.customer_name, selectedOrder.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', border: 'none', background: '#ecfdf5', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' }}
                    >
                      <MessageCircle size={16} /> {selectedOrder.phone}
                    </button>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} /> Order Date
                    </h4>
                    <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>{new Date(selectedOrder.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>at {new Date(selectedOrder.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={14} /> Shipping Address
                  </h4>
                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', lineHeight: 1.6 }}>
                    <p style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '5px' }}>{selectedOrder.address_line}</p>
                    {selectedOrder.landmark && <p style={{ color: '#64748b' }}><strong>Landmark:</strong> {selectedOrder.landmark}</p>}
                    <p style={{ color: '#64748b' }}>{selectedOrder.district}, {selectedOrder.state}</p>
                    <p style={{ color: '#64748b', fontWeight: '700' }}>Pincode: {selectedOrder.pincode}</p>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={14} /> Item Ordered
                  </h4>
                  <div style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <img src={selectedOrder.products?.image} alt="" style={{ width: '80px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h5 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '10px' }}>{selectedOrder.products?.name}</h5>
                      <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Quantity</p>
                          <p style={{ fontWeight: '700' }}>{selectedOrder.quantity}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total Amount</p>
                          <p style={{ fontWeight: '700', color: '#3b82f6', fontSize: '1.1rem' }}>${Number(selectedOrder.total_amount).toFixed(2)}</p>
                        </div>
                      </div>
                      {selectedOrder.customisation && (
                        <div style={{ marginTop: '1.5rem', padding: '12px', background: '#fff9db', borderRadius: '8px', border: '1px solid #f9e154', fontSize: '0.85rem' }}>
                          <strong style={{ display: 'block', marginBottom: '4px', textTransform: 'uppercase', fontSize: '0.7rem' }}>Customisation Request:</strong>
                          {selectedOrder.customisation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Receipt */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={14} /> Payment Receipt
                </h4>
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                  {selectedOrder.payment_reciept ? (
                    <img 
                      src={selectedOrder.payment_reciept} 
                      alt="Receipt" 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', cursor: 'zoom-in' }} 
                      onClick={() => window.open(selectedOrder.payment_reciept, '_blank')}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <Eye size={48} strokeWidth={1} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                      <p style={{ fontSize: '0.85rem' }}>No receipt uploaded</p>
                    </div>
                  )}
                </div>
                {selectedOrder.payment_reciept && (
                  <a href={selectedOrder.payment_reciept} target="_blank" rel="noreferrer" style={{ textAlign: 'center', fontSize: '0.8rem', color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>
                    Open Original Image →
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
