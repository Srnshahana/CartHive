import React, { useState } from 'react';
import { supabaseDemo } from '../data/supabaseDemo';
import { LayoutDashboard, ShoppingBag, Settings, Users, LogOut } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="section" style={{ padding: 0 }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside className="glass" style={{ width: '280px', padding: '2rem', borderRight: '1px solid var(--glass-border)' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 className="gradient-text" style={{ fontSize: '1.5rem' }}>CartHive Admin</h1>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-glass'}`} 
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              <ShoppingBag size={20} /> Orders
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-glass'}`} 
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              <LayoutDashboard size={20} /> Products
            </button>
            <button 
              className="btn btn-glass" 
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              <Settings size={20} /> Settings
            </button>
          </nav>

          <div style={{ marginTop: 'auto' }}>
            <button className="btn btn-glass" style={{ width: '100%', justifyContent: 'flex-start', color: '#ef4444' }}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '3rem' }}>
          <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem' }}>{activeTab === 'orders' ? 'Recent Orders' : 'Product Management'}</h2>
            <div className="glass-card" style={{ padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem' }}>
              Logged in as <span style={{ fontWeight: '700' }}>Admin</span>
            </div>
          </header>

          {activeTab === 'orders' ? (
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-light)' }}>
                    <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>Order ID</th>
                    <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>Customer</th>
                    <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>Business</th>
                    <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>Total</th>
                    <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>Status</th>
                    <th style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {supabaseDemo.orders.map(order => {
                    const biz = supabaseDemo.businesses.find(b => b.id === order.business_id);
                    return (
                      <tr key={order.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                        <td style={{ padding: '1.25rem 1.5rem' }}>#{order.id}</td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <div style={{ fontWeight: '600' }}>{order.customer_name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.customer_phone}</div>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>{biz?.name}</td>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>${order.total_price}</td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '50px', 
                            fontSize: '0.8rem', 
                            background: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)', 
                            color: order.status === 'Delivered' ? '#10b981' : 'var(--primary)' 
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <button className="btn btn-glass" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>View Details</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-3">
              {supabaseDemo.products.map(product => (
                <div key={product.id} className="glass-card">
                   <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} />
                   <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                   <div style={{ fontWeight: '700' }}>${product.price}</div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
