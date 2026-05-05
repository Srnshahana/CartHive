import React, { useState } from 'react';
import { supabaseDemo } from '../data/supabaseDemo';
import { LayoutDashboard, ShoppingBag, Settings, Edit3, LogOut, X, Save } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [products, setProducts] = useState(supabaseDemo.products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p =>
      p.id === editingProduct.id ? editingProduct : p
    );
    setProducts(updatedProducts);
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

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
            <button className="btn btn-glass" style={{ justifyContent: 'flex-start', width: '100%' }}>
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
              {products.map(product => {
                const biz = supabaseDemo.businesses.find(b => b.id === product.business_id);
                return (
                  <div key={product.id} className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.9)', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                        {biz?.name}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{product.name}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{product.category}</p>
                      <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text)' }}>${product.price}</div>
                    </div>
                    <button
                      onClick={() => handleEditClick(product)}
                      className="btn btn-glass"
                      style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
                    >
                      <Edit3 size={18} /> Edit Details
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Edit Product Modal */}
      {isModalOpen && editingProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="glass-card fade-in" style={{ width: '90%', maxWidth: '500px', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>Edit Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="btn btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editingProduct.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={editingProduct.image}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Description</label>
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-glass" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  <Save size={20} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
