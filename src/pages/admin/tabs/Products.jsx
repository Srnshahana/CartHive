import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Package, Plus, Search, Tag, Edit3, Trash2, X, Upload, Loader2, Save, FolderPlus, AlertCircle, Star } from 'lucide-react';

const Products = ({ products, categories, handleFileUpload, uploadingMap, refreshData, businessId }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    offer_price: '',
    category_id: '',
    image: '',
    is_bestseller: false
  });

  const [newCategory, setNewCategory] = useState({ name: '', discription: '', cover_img: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const handleLocalUpload = async (file) => {
    console.log('Starting upload for file:', file.name);
    try {
      const url = await handleFileUpload(file, true, 'products', 'new_product_image');
      console.log('Upload successful, URL:', url);
      if (url) {
        setNewProduct(prev => ({ ...prev, image: url }));
      }
    } catch (err) {
      console.error('Local upload handler error:', err);
    }
  };

  const handleCategoryUpload = async (file) => {
    try {
      const url = await handleFileUpload(file, true, 'products', 'new_category_image');
      if (url) {
        setNewCategory(prev => ({ ...prev, cover_img: url }));
      }
    } catch (err) {
      console.error('Category upload handler error:', err);
    }
  };

  const saveProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in name and price');
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from('products').insert({
        business_id: businessId,
        ...newProduct,
        price: parseFloat(newProduct.price),
        offer_price: newProduct.offer_price ? parseFloat(newProduct.offer_price) : null
      });
      if (error) throw error;
      setShowAddModal(false);
      refreshData();
    } catch (err) {
      alert('Error saving product: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      refreshData();
    } catch (err) {
      alert('Error deleting product: ' + err.message);
    }
  };

  const addCategory = async () => {
    if (!newCategory.name) return;
    try {
      const { data, error } = await supabase.from('categories').insert({
        business_id: businessId,
        name: newCategory.name,
        discription: newCategory.discription,
        cover_img: newCategory.cover_img
      }).select().single();
      if (error) throw error;
      setNewCategory({ name: '', discription: '', cover_img: '' });
      refreshData();
      return data;
    } catch (err) {
      alert('Error adding category: ' + err.message);
    }
  };

  const deleteCategory = async (id) => {
    const hasProducts = products.some(p => p.category_id === id);
    if (hasProducts) {
      alert('Cannot delete this category because it contains products. Please delete or reassign the products first.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      refreshData();
    } catch (err) {
      alert('Error deleting category: ' + err.message);
    }
  };

  const saveEditCategory = async (id) => {
    if (!editCategoryName.trim()) return;
    try {
      const { error } = await supabase.from('categories').update({ name: editCategoryName }).eq('id', id);
      if (error) throw error;
      setEditingCategory(null);
      refreshData();
    } catch (err) {
      alert('Error updating category: ' + err.message);
    }
  };

  const toggleBestSeller = async (id, currentVal) => {
    try {
      const { error } = await supabase.from('products').update({ is_bestseller: !currentVal }).eq('id', id);
      if (error) throw error;
      refreshData();
    } catch (err) {
      alert('Error updating bestseller status: ' + err.message);
    }
  };

  return (
    <div className="admin-products-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ position: 'relative', width: '350px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
          <input type="text" className="form-input" placeholder="Search inventory..." style={{ paddingLeft: '3rem', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-shop-dark" style={{ background: '#f8fafc', color: '#1e293b', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }} onClick={() => setShowCatModal(true)}>
            <FolderPlus size={18} /> Categories
          </button>
          <button className="btn-shop-dark" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', borderRadius: '12px' }} onClick={() => setShowAddModal(true)}>
            <Plus size={20} /> New Product
          </button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={product.image} style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} alt="" />
                    <span style={{ fontWeight: '700' }}>{product.name}</span>
                  </div>
                </td>
                <td><span className="status-pill" style={{ background: '#f1f5f9', color: '#64748b' }}>{product.categories?.name || 'Uncategorized'}</span></td>
                <td>
                  <button 
                    onClick={() => toggleBestSeller(product.id, product.is_bestseller)}
                    style={{ 
                      background: product.is_bestseller ? '#fffbeb' : '#f8fafc', 
                      color: product.is_bestseller ? '#b45309' : '#94a3b8',
                      border: `1px solid ${product.is_bestseller ? '#fde68a' : '#e2e8f0'}`,
                      padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800',
                      display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer'
                    }}
                  >
                    <Star size={14} fill={product.is_bestseller ? '#b45309' : 'none'} />
                    {product.is_bestseller ? 'BEST SELLER' : 'STANDARD'}
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '800' }}>${product.price}</span>
                    {product.offer_price && <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '700' }}>Sale: ${product.offer_price}</span>}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="nav-btn-link" style={{ padding: '0.5rem' }} title="Edit"><Edit3 size={16} /></button>
                    <button 
                      className="nav-btn-link" 
                      style={{ padding: '0.5rem', color: '#ff4444' }} 
                      title="Delete"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '800px' }}>
            <button className="nav-menu-close" onClick={() => setShowAddModal(false)}><X /></button>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', fontWeight: '900' }}>Add <span className="gradient-text">New Product</span></h2>
            
            <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
              <div className="admin-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" className="form-input" placeholder="e.g. Lavender Face Wash" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Category
                    {categories.length === 0 && (
                      <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <AlertCircle size={12} /> REQUIRED
                      </span>
                    )}
                  </label>
                  {categories.length > 0 ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select 
                        className="form-input" 
                        style={{ flex: 1 }}
                        value={newProduct.category_id} 
                        onChange={(e) => setNewProduct({...newProduct, category_id: e.target.value})}
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <button className="btn-shop-dark" style={{ width: '45px', padding: 0 }} onClick={() => setShowCatModal(true)}>+</button>
                    </div>
                  ) : (
                    <div style={{ background: '#fff1f2', padding: '1rem', borderRadius: '12px', border: '1px solid #fecdd3' }}>
                      <p style={{ fontSize: '0.85rem', color: '#be123c', marginBottom: '0.75rem' }}>You need to create at least one category before adding products.</p>
                      <button className="btn-shop-dark" style={{ width: '100%', background: '#be123c', color: 'white', border: 'none', fontSize: '0.8rem' }} onClick={() => setShowCatModal(true)}>
                        <Plus size={16} /> Create First Category
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input type="number" className="form-input" placeholder="29.99" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Offer Price ($)</label>
                    <input type="number" className="form-input" placeholder="19.99" value={newProduct.offer_price} onChange={(e) => setNewProduct({...newProduct, offer_price: e.target.value})} />
                  </div>
                </div>
                <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                  <input 
                    type="checkbox" 
                    id="is_bestseller" 
                    checked={newProduct.is_bestseller} 
                    onChange={(e) => setNewProduct({...newProduct, is_bestseller: e.target.checked})}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="is_bestseller" style={{ marginBottom: 0, cursor: 'pointer', fontWeight: '700' }}>Mark as Best Seller</label>
                </div>
              </div>

              <div className="admin-form">
                <div className="form-group">
                  <label>Product Image</label>
                  <div 
                    onClick={() => document.getElementById('product-image-upload').click()}
                    style={{ 
                      width: '100%', height: '180px', background: '#f8fafc', border: '2px dashed #e2e8f0', 
                      borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', 
                      justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', position: 'relative'
                    }}
                  >
                    {uploadingMap['new_product_image'] ? (
                      <div style={{ textAlign: 'center' }}>
                        <Loader2 className="spin" size={32} color="#3b82f6" />
                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#3b82f6' }}>Uploading...</p>
                      </div>
                    ) : newProduct.image ? (
                      <img src={newProduct.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                    ) : (
                      <>
                        <Upload size={32} color="#94a3b8" />
                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>Click to upload image</p>
                      </>
                    )}
                  </div>
                  <input 
                    id="product-image-upload"
                    type="file" 
                    accept="image/*" 
                    hidden 
                    onChange={(e) => {
                      if (e.target.files[0]) handleLocalUpload(e.target.files[0]);
                    }} 
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-input" rows="3" placeholder="Describe your product..." value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn-shop-dark" style={{ background: '#f1f5f9', color: '#1e293b', border: 'none' }} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn-shop-dark" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={saveProduct} disabled={saving || categories.length === 0}>
                <Save size={18} /> {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Management Modal - Higher Z-Index */}
      {showCatModal && (
        <div className="admin-modal-overlay" style={{ zIndex: 3000 }}>
          <div className="admin-modal" style={{ maxWidth: '500px' }}>
            <button className="nav-menu-close" onClick={() => setShowCatModal(false)}><X /></button>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '900' }}>Manage <span className="gradient-text">Categories</span></h2>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '15px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1rem' }}>Add New Category</h3>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Category Name</label>
                <input type="text" className="form-input" placeholder="e.g. Skin Care" value={newCategory.name} onChange={(e) => setNewCategory({...newCategory, name: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Description</label>
                <textarea className="form-input" rows="2" placeholder="Brief description..." value={newCategory.discription} onChange={(e) => setNewCategory({...newCategory, discription: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Cover Image</label>
                <div 
                  onClick={() => document.getElementById('category-image-upload').click()}
                  style={{ 
                    width: '100%', height: '120px', background: '#fff', border: '2px dashed #cbd5e1', 
                    borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', position: 'relative'
                  }}
                >
                  {uploadingMap['new_category_image'] ? (
                    <div style={{ textAlign: 'center' }}>
                      <Loader2 className="spin" size={24} color="#3b82f6" />
                    </div>
                  ) : newCategory.cover_img ? (
                    <img src={newCategory.cover_img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                  ) : (
                    <>
                      <Upload size={24} color="#94a3b8" />
                      <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>Upload Cover</p>
                    </>
                  )}
                </div>
                <input 
                  id="category-image-upload"
                  type="file" 
                  accept="image/*" 
                  hidden 
                  onChange={(e) => {
                    if (e.target.files[0]) handleCategoryUpload(e.target.files[0]);
                  }} 
                />
              </div>
              <button className="btn-shop-dark" style={{ width: '100%', padding: '0.75rem' }} onClick={() => addCategory()} disabled={!newCategory.name}>Add Category</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  {editingCategory === cat.id ? (
                    <div style={{ display: 'flex', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        style={{ flex: 1, padding: '0.25rem 0.5rem', minHeight: 'auto' }} 
                        value={editCategoryName} 
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        autoFocus
                      />
                      <button className="nav-btn-link" style={{ padding: '0.25rem', color: '#10b981', display: 'flex' }} onClick={() => saveEditCategory(cat.id)}><Save size={16} /></button>
                      <button className="nav-btn-link" style={{ padding: '0.25rem', color: '#64748b', display: 'flex' }} onClick={() => setEditingCategory(null)}><X size={16} /></button>
                    </div>
                  ) : (
                    <>
                      <span style={{ fontWeight: '600' }}>{cat.name}</span>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="nav-btn-link" style={{ padding: '0.25rem', display: 'flex' }} onClick={() => { setEditingCategory(cat.id); setEditCategoryName(cat.name); }}><Edit3 size={16} /></button>
                        <button className="nav-btn-link" style={{ padding: '0.25rem', color: '#ff4444', display: 'flex' }} onClick={() => deleteCategory(cat.id)}><Trash2 size={16} /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {categories.length === 0 && (
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No categories created yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Products;
