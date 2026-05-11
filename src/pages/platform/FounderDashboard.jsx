import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Shield,
  Store,
  CheckCircle,
  XCircle,
  Phone,
  TrendingUp,
  Tag,
  Info,
  ExternalLink,
  Loader2,
  RefreshCcw,
  Search,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [rejectModal, setRejectModal] = useState({ isOpen: false, biz: null });
  const [alertConfig, setAlertConfig] = useState({ visible: false, title: '', message: '' });

  const showAlert = (message, title = 'Alert') => {
    setAlertConfig({ visible: true, title, message });
  };

  const closeAlert = () => {
    setAlertConfig({ ...alertConfig, visible: false });
  };

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (err) {
      console.error('Error fetching businesses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setBusinesses(businesses.map(b =>
        b.id === id ? { ...b, is_active: !currentStatus } : b
      ));
    } catch (err) {
      showAlert(err.message, 'Status Update Error');
    }
  };

  const triggerReject = (biz) => {
    setRejectModal({ isOpen: true, biz });
  };

  const handleReject = async () => {
    const biz = rejectModal.biz;
    if (!biz) return;

    try {
      // 1. Delete associated users first
      const { error: userError } = await supabase
        .from('users')
        .delete()
        .eq('business_id', biz.id);

      if (userError) throw userError;

      // 2. Delete the business
      const { error: bizError } = await supabase
        .from('businesses')
        .delete()
        .eq('id', biz.id);

      if (bizError) throw bizError;

      setBusinesses(businesses.filter(b => b.id !== biz.id));
      setRejectModal({ isOpen: false, biz: null });
    } catch (err) {
      showAlert(err.message, 'Rejection Error');
    }
  };

  const filteredBusinesses = businesses.filter(biz => {
    const matchesSearch = biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'active' && biz.is_active) ||
      (filter === 'pending' && !biz.is_active);
    return matchesSearch && matchesFilter;
  });

  if (loading && businesses.length === 0) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <Loader2 className="animate-spin" size={48} color="#3b82f6" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '3rem 5%' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <Link to="/" className="btn-back-platform">
          <ArrowLeft size={18} /> Back to explore
        </Link>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#3b82f6', marginBottom: '0.5rem' }}>
              <Shield size={24} />
              <span style={{ fontWeight: '800', letterSpacing: '1px', fontSize: '0.9rem', textTransform: 'uppercase' }}>Founder Portal</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-1px' }}>Business Management</h1>
          </div>

          <button
            onClick={fetchBusinesses}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: '600' }}
          >
            <RefreshCcw size={18} /> Refresh Data
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Total Stores</p>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a' }}>{businesses.length}</h3>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Active Stores</p>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a' }}>{businesses.filter(b => b.is_active).length}</h3>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Pending Requests</p>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a' }}>{businesses.filter(b => !b.is_active).length}</h3>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
            <input
              type="text"
              placeholder="Search by store name or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
            />
          </div>
          <div style={{ display: 'flex', background: 'white', padding: '0.4rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            {['all', 'active', 'pending'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: filter === f ? '#0f172a' : 'transparent',
                  color: filter === f ? 'white' : '#64748b',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table/List */}
        <div style={{ background: 'white', borderRadius: '32px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: '#64748b' }}>Store Information</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: '#64748b' }}>Contact & Metrics</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: '#64748b' }}>About & Customization</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: '#64748b' }}>Status</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: '700', color: '#64748b' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBusinesses.map(biz => (
                <tr key={biz.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                        {biz.name.charAt(0).toUpperCase()}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>{biz.name}</h4>
                    </div>
                    <code style={{ fontSize: '0.85rem', color: '#64748b', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      /{biz.slug}
                    </code>
                  </td>

                  <td style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                        <Phone size={14} /> {biz.ph_no || 'N/A'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                        <TrendingUp size={14} /> {biz.no_order || 0} orders/mo
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                        <Tag size={14} /> {biz.price_range || 'N/A'}
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '2rem', maxWidth: '300px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', gap: '0.5rem' }}>
                        <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {biz.about_store || 'No description provided.'}
                        </span>
                      </div>
                      {biz.customisation && (
                        <div style={{ fontSize: '0.85rem', color: '#3b82f6', background: '#eff6ff', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid #dbeafe', marginTop: '0.5rem' }}>
                          <strong style={{ display: 'block', marginBottom: '0.2rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customization:</strong>
                          <span style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {biz.customisation}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td style={{ padding: '2rem' }}>
                    {biz.is_active ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '100px', background: '#ecfdf5', color: '#10b981', fontWeight: '700', fontSize: '0.8rem' }}>
                        <CheckCircle size={14} /> Active
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '100px', background: '#fef2f2', color: '#ef4444', fontWeight: '700', fontSize: '0.8rem' }}>
                        <XCircle size={14} /> Pending
                      </span>
                    )}
                  </td>

                  <td style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => toggleStatus(biz.id, biz.is_active)}
                        style={{
                          padding: '0.6rem 1rem',
                          borderRadius: '10px',
                          border: 'none',
                          background: biz.is_active ? '#f1f5f9' : '#dcfce7',
                          color: biz.is_active ? '#64748b' : '#10b981',
                          fontWeight: '700',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        {biz.is_active ? 'Deactivate' : 'Activate'}
                      </button>

                      {!biz.is_active && (
                        <button
                          onClick={() => triggerReject(biz)}
                          style={{
                            padding: '0.6rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid #fee2e2',
                            background: 'white',
                            color: '#ef4444',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          Reject
                        </button>
                      )}

                      <Link
                        to={`/${biz.slug}`}
                        target="_blank"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '10px', background: '#f1f5f9', color: '#64748b' }}
                      >
                        <ExternalLink size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBusinesses.length === 0 && (
            <div style={{ padding: '5rem', textAlign: 'center', color: '#94a3b8' }}>
              <Store size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No businesses found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Custom Reject Modal */}
        {rejectModal.isOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
            <div style={{ background: 'white', borderRadius: '32px', padding: '3rem', maxWidth: '500px', width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <XCircle size={48} />
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', marginBottom: '1rem' }}>Are you sure?</h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                You are about to <strong style={{ color: '#ef4444' }}>REJECT and PERMANENTLY DELETE</strong> "{rejectModal.biz?.name}". This will also remove the owner's account.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  onClick={() => setRejectModal({ isOpen: false, biz: null })}
                  style={{ padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  style={{ padding: '1rem', borderRadius: '14px', border: 'none', background: '#ef4444', color: 'white', fontWeight: '700', cursor: 'pointer' }}
                >
                  Yes, Reject & Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Custom Alert Modal */}
      {alertConfig.visible && (
        <div className="admin-alert-overlay">
          <div className="admin-alert-modal">
            <h3 className="admin-alert-title">{alertConfig.title}</h3>
            <p className="admin-alert-message">{alertConfig.message}</p>
            <button className="admin-alert-btn" onClick={closeAlert}>
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FounderDashboard;
