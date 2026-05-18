import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { ShoppingBag, IndianRupee, Package, Clock, TrendingUp, ArrowUpRight, BarChart3, ChevronRight, Activity, Zap, Layers, Store } from 'lucide-react';

const Dashboard = ({ products, currentBusiness, user, homeConfig, refreshData }) => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    growth: '+12.5%'
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [businessName, setBusinessName] = useState('');
  
  // UPI Edit State
  const [isEditingUpi, setIsEditingUpi] = useState(false);
  const [upiInput, setUpiInput] = useState('');
  const [savingUpi, setSavingUpi] = useState(false);

  useEffect(() => {
    if (currentBusiness) {
      setUpiInput(currentBusiness.upi || '');
    }
  }, [currentBusiness]);

  const handleSaveUpi = async () => {
    if (!currentBusiness) return;
    try {
      setSavingUpi(true);
      const { error } = await supabase.from('businesses').update({ upi: upiInput }).eq('id', currentBusiness.id);
      if (error) throw error;
      if (refreshData) await refreshData();
      setIsEditingUpi(false);
    } catch (err) {
      console.error('Error saving UPI:', err);
    } finally {
      setSavingUpi(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const savedUser = localStorage.getItem('carthive_user');
      const userData = JSON.parse(savedUser);
      setBusinessName(userData.business_name || 'Boutique');

      const { data: orders, error: ordersErr } = await supabase
        .from('orders')
        .select('*, products(name, image)')
        .eq('business_id', userData.business_id)
        .order('created_at', { ascending: false });

      if (ordersErr) throw ordersErr;

      const revenue = orders.reduce((acc, curr) => acc + Number(curr.total_amount), 0);
      const pending = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;

      setStats({
        totalRevenue: revenue,
        totalOrders: orders.length,
        pendingOrders: pending,
        growth: '+12.5%'
      });

      const months = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const monthName = d.toLocaleString('default', { month: 'short' });
        months.push({
          name: monthName, count: orders.filter(o => {
            const od = new Date(o.created_at);
            return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear();
          }).length
        });
      }
      setMonthlyData(months);
      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '3.5rem' }}>
        <div className="shimmer-effect" style={{ width: '150px', height: '20px', borderRadius: '4px', marginBottom: '12px' }}></div>
        <div className="shimmer-effect" style={{ width: '300px', height: '40px', borderRadius: '4px', marginBottom: '10px' }}></div>
        <div className="shimmer-effect" style={{ width: '450px', height: '16px', borderRadius: '4px' }}></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="shimmer-effect" style={{ height: '140px', borderRadius: '24px' }}></div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '3rem' }}>
        <div className="shimmer-effect" style={{ height: '400px', borderRadius: '24px' }}></div>
        <div className="shimmer-effect" style={{ height: '400px', borderRadius: '24px' }}></div>
      </div>
    </div>
  );

  const maxOrders = Math.max(...monthlyData.map(m => m.count), 5);

  return (
    <div className="dashboard-content" style={{ padding: '1.5rem 2.5rem 4rem 2.5rem' }}>

      {/* Premium Welcome Header */}
      <div style={{ marginBottom: '3.5rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#102a82', marginBottom: '8px' }}>
          <Store size={16} />
          <div className="admin-logo" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', color: '#102a82' }}>Admin Dashboard</div>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
          Welcome back, <span style={{ color: '#102a82' }}>{businessName}</span>
        </h1>
        <p style={{ fontSize: '1rem', color: '#666', marginTop: '10px', maxWidth: '600px', lineHeight: 1.6 }}>
          Here's a breakdown of your boutique's performance and recent activity.
        </p>
      </div>

      {/* Modern Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
        <StatCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={<IndianRupee size={24} />} color="#102a82" />
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<ShoppingBag size={24} />} color="#10b981" />
        <StatCard title="Active Items" value={products.length} icon={<Package size={24} />} color="#8b5cf6" />
        <StatCard title="Pending" value={stats.pendingOrders} icon={<Clock size={24} />} color="#f59e0b" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '3rem' }}>

        {/* Left: Performance Visuals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

          {/* Sales Analytics Card */}
          <div style={{ background: '#fff', borderRadius: '32px', padding: '2.5rem', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sales Momentum</h3>
                <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '4px' }}>Monthly order volume over the last 6 months</p>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={20} color="#102a82" />
              </div>
            </div>

            <div style={{ position: 'relative', padding: '20px 0 40px 0' }}>
              <div style={{ height: '140px' }}>
                <svg width="100%" height="100%" viewBox="0 0 500 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#102a82" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#102a82" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {(() => {
                    const w = 500; const h = 100;
                    const pts = monthlyData.map((m, i) => ({
                      x: (i * (w / (monthlyData.length - 1))),
                      y: h - (m.count / maxOrders) * h
                    }));
                    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                    const areaD = `${d} L ${w} ${h} L 0 ${h} Z`;
                    return (
                      <>
                        <path d={areaD} fill="url(#chartGradient)" />
                        <path d={d} fill="none" stroke="#102a82" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        {pts.map((p, i) => (
                          <g key={i}>
                            <circle cx={p.x} cy={p.y} r="6" fill="#fff" stroke="#102a82" strokeWidth="3" />
                            <text x={p.x} y={p.y - 15} textAnchor="middle" fill="#102a82" fontSize="11" fontWeight="900">{monthlyData[i].count}</text>
                          </g>
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', padding: '0 10px' }}>
                {monthlyData.map((m, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', color: '#999', fontWeight: '800', textTransform: 'uppercase' }}>{m.name}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders List */}
          <div style={{ background: '#fff', borderRadius: '32px', padding: '2.5rem', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Latest Transactions</h3>
              <button style={{ color: '#102a82', fontSize: '0.85rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                All Orders <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentOrders.map(order => (
                <div key={order.id} style={{ display: 'flex', alignItems: 'center', padding: '1.25rem', borderRadius: '20px', background: '#fcfcfc', border: '1px solid #f5f5f5', transition: 'all 0.3s ease' }}>
                  <img src={order.products?.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, marginLeft: '1.25rem' }}>
                    <p style={{ fontSize: '1rem', fontWeight: '800', color: '#111' }}>{order.customer_name}</p>
                    <p style={{ fontSize: '0.8rem', color: '#999' }}>{order.products?.name} • {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: '900', color: '#111' }}>₹{Number(order.total_amount).toFixed(0)}</p>
                    <span style={{ fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', color: order.status === 'completed' ? '#10b981' : '#f59e0b' }}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <div style={{ background: '#fff', borderRadius: '32px', padding: '2.5rem', color: '#111', border: '1px solid #102a82', boxShadow: '0 10px 30px -10px rgba(16, 42, 130, 0.1)' }}>
            <Zap size={24} color="#102a82" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: '#102a82' }}>Instant Insights</h3>
            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>
              Your store is performing <strong style={{ color: '#10b981' }}>12.5% better</strong> than last month. Consider restocking your best sellers soon.
            </p>
            <button style={{ width: '100%', padding: '1rem', borderRadius: '16px', background: '#102a82', color: '#fff', border: 'none', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s ease' }}>Generate Report</button>
          </div>

          <div style={{ background: '#fff', borderRadius: '32px', padding: '2.5rem', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
              <IndianRupee size={20} color="#111" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment Details</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              <div style={{ padding: '1.5rem', borderRadius: '20px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Store UPI ID</p>
                  {!isEditingUpi ? (
                    <button onClick={() => setIsEditingUpi(true)} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>Edit</button>
                  ) : (
                    <button onClick={handleSaveUpi} disabled={savingUpi} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>
                      {savingUpi ? 'Saving...' : 'Save'}
                    </button>
                  )}
                </div>
                
                {isEditingUpi ? (
                  <input 
                    type="text" 
                    value={upiInput} 
                    onChange={(e) => setUpiInput(e.target.value)} 
                    placeholder="e.g. yourname@upi"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                    autoFocus
                  />
                ) : (
                  <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', wordBreak: 'break-all' }}>{currentBusiness?.upi || 'Not Set'}</p>
                )}
              </div>

              {currentBusiness?.upi && (
                <div style={{ padding: '1.5rem', borderRadius: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ alignSelf: 'flex-start', fontSize: '0.75rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Payment QR (Auto-Generated)</p>
                  
                  <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentBusiness.upi.includes('://') ? currentBusiness.upi : `upi://pay?pa=${currentBusiness.upi}`)}`} 
                      alt="Payment QR" 
                      style={{ width: '160px', height: '160px', display: 'block' }} 
                    />
                  </div>
                  <p style={{ fontSize: '0.65rem', color: '#102a82', marginTop: '0.8rem', fontWeight: '800', letterSpacing: '0.1em' }}>SCAN TO PAY</p>
                </div>
              )}

              {/* Only show uploaded QR if link is missing */}
              {homeConfig?.payment_qr_url && !currentBusiness?.upi && (
                <div style={{ padding: '1.5rem', borderRadius: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ alignSelf: 'flex-start', fontSize: '0.75rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Payment QR (Uploaded)</p>
                  <div style={{ background: '#fff', padding: '1rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                    <img src={homeConfig.payment_qr_url} alt="Payment QR" style={{ width: '160px', height: '160px', objectFit: 'contain' }} />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div style={{ background: '#fff', padding: '2rem', borderRadius: '28px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
      {icon}
    </div>
    <p style={{ fontSize: '0.75rem', fontWeight: '900', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{title}</p>
    <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#111', margin: 0, letterSpacing: '-0.02em' }}>{value}</h3>

    {/* Decorative Sparkle */}
    <div style={{ position: 'absolute', top: '15px', right: '15px', opacity: 0.05 }}>
      <Zap size={40} color={color} />
    </div>
  </div>
);

export default Dashboard;
