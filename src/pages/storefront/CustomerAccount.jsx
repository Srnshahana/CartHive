import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useStore } from '../../context/StoreContext';
import { Package, MapPin, Heart, LogOut, ArrowLeft, Loader2, Sparkles, RefreshCcw, User, Phone, Home, Building, Hash, Flag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CustomerAccount = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { business } = useStore();
  const { addToCart } = useCart();
  
  const [user, setUser] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recommendedStores, setRecommendedStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  const [addressForm, setAddressForm] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    phone: ''
  });
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    checkUser();
    loadWishlist();
    fetchRecommendedStores();
  }, []);

  const fetchRecommendedStores = async () => {
    try {
      // Just fetch some random active businesses to recommend (excluding current maybe, or just first few)
      const { data } = await supabase
        .from('businesses')
        .select('*')
        .limit(6);
      if (data) setRecommendedStores(data);
    } catch (err) {
      console.error('Error fetching stores', err);
    }
  };

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate(`/${slug}/login`);
        return;
      }
      setUser(session.user);
      fetchCustomerData(session.user.id);
    } catch (err) {
      console.error(err);
      navigate(`/${slug}/login`);
    }
  };

  const fetchCustomerData = async (userId) => {
    try {
      // Fetch profile
      const { data: profile } = await supabase
        .from('customers')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (profile) {
        setCustomerData(profile);
        setAddressForm({
          address_line_1: profile.address_line_1 || '',
          address_line_2: profile.address_line_2 || '',
          city: profile.city || '',
          state: profile.state || '',
          postal_code: profile.postal_code || '',
          phone: profile.phone || ''
        });
        
        // Fetch Orders (matching phone if we don't have customer_id yet)
        if (profile.phone && business?.id) {
          const { data: userOrders } = await supabase
            .from('orders')
            .select(`
              *,
              product:products(*)
            `)
            .eq('business_id', business.id)
            .eq('phone', profile.phone)
            .order('created_at', { ascending: false });
            
          if (userOrders) setOrders(userOrders);
        }
      }
    } catch (err) {
      console.error('Error fetching customer data', err);
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = () => {
    const saved = localStorage.getItem('carthive_wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('carthive_wishlist', JSON.stringify(updated));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate(`/${slug}`);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    setSavingAddress(true);
    try {
      const { error } = await supabase
        .from('customers')
        .upsert({
          id: user.id,
          email: user.email,
          address_line_1: addressForm.address_line_1,
          address_line_2: addressForm.address_line_2,
          city: addressForm.city,
          state: addressForm.state,
          postal_code: addressForm.postal_code,
          phone: addressForm.phone
        });
        
      if (error) throw error;
      alert('Address saved successfully!');
    } catch (err) {
      alert('Failed to save address: ' + err.message);
    } finally {
      setSavingAddress(false);
    }
  };

  const handleReorder = (product) => {
    if (product) {
      addToCart(product, 1);
      navigate(`/${slug}/cart`);
    }
  };

  if (loading) {
    return (
      <div className="boutique-page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Loader2 size={32} className="animate-spin" color="#1a1a1a" />
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-logo" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', color: '#102a82' }}>My Account</div>
        </div>
        
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <Package size={20} /> orders
          </button>
          <button className={`admin-nav-item ${activeTab === 'address' ? 'active' : ''}`} onClick={() => setActiveTab('address')}>
            <MapPin size={20} /> address book
          </button>
          <button className={`admin-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('wishlist')}>
            <Heart size={20} /> wishlist
          </button>
          <button className={`admin-nav-item ${activeTab === 'recommendations' ? 'active' : ''}`} onClick={() => setActiveTab('recommendations')}>
            <Sparkles size={20} /> for you
          </button>

          <div style={{ borderTop: '1px solid #e2e8f0', margin: '1rem 0', paddingTop: '1rem' }}>
            <button onClick={() => navigate(`/${slug}`)} className="admin-nav-item" style={{ color: '#64748b' }}>
              <ArrowLeft size={20} /> back to store
            </button>
          </div>
        </nav>
        
        <button onClick={handleLogout} className="admin-nav-item" style={{ color: '#ff4444', marginTop: 'auto' }}>
          <LogOut size={20} /> logout
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>
              {activeTab === 'orders' && 'Order History'}
              {activeTab === 'address' && 'Saved Address'}
              {activeTab === 'wishlist' && 'My Wishlist'}
              {activeTab === 'recommendations' && 'Recommended for You'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right', marginRight: '1rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: '800' }}>{customerData?.full_name || user?.email}</p>
              <p style={{ fontSize: '0.7rem', color: '#888' }}>Customer</p>
            </div>
            <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} color="#666" />
            </div>
            <button 
              onClick={handleLogout} 
              style={{ 
                border: 'none', 
                background: '#fef2f2', 
                color: '#ef4444', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '10px', 
                borderRadius: '10px',
                marginLeft: '10px'
              }} 
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <div style={{ padding: '2rem' }}>
          {activeTab === 'orders' && (
            <div className="glass-card" style={{ padding: '2rem', background: '#fff', borderRadius: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px' }}>Order History</h2>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888', background: '#f8fafc', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
                  <Package size={40} style={{ margin: '0 auto 15px', opacity: 0.5 }} />
                  <p>No orders found yet.</p>
                  <Link to={`/${slug}/products`} className="btn-shop-dark" style={{ display: 'inline-flex', marginTop: '20px', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}>Start Shopping</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {orders.map(order => (
                    <div 
                      key={order.id} 
                      style={{ 
                        background: '#fff',
                        border: '1px solid #f1f5f9', 
                        borderRadius: '20px', 
                        padding: '20px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                      }}
                    >
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ width: '90px', height: '90px', borderRadius: '16px', overflow: 'hidden', background: '#f8f8f8', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)' }}>
                          {order.product?.image && <img src={order.product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
                        </div>
                        <div>
                          <p style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '6px', color: '#0f172a' }}>{order.product?.name || 'Unknown Product'}</p>
                          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '500' }}>Ordered: {new Date(order.created_at).toLocaleDateString()}</p>
                          <span style={{ display: 'inline-block', padding: '6px 12px', background: order.status === 'completed' ? '#ecfdf5' : '#fef3c7', color: order.status === 'completed' ? '#059669' : '#d97706', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <p style={{ fontWeight: '900', fontSize: '1.4rem', color: '#0f172a', marginBottom: '15px' }}>₹{Number(order.product?.price || 0) * order.quantity}</p>
                        <button 
                          onClick={() => handleReorder(order.product)} 
                          style={{ 
                            background: '#f8fafc', 
                            color: '#0f172a',
                            border: '1px solid #e2e8f0', 
                            padding: '8px 20px', 
                            borderRadius: '10px', 
                            fontWeight: '700', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#0f172a';
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f8fafc';
                            e.currentTarget.style.color = '#0f172a';
                          }}
                        >
                          <RefreshCcw size={16} /> Reorder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'address' && (
            <div className="glass-card" style={{ padding: '2rem', background: '#fff', borderRadius: '24px', maxWidth: '800px' }}>
              <p style={{ color: '#666', marginBottom: '30px' }}>Save your address here for faster checkout on future orders.</p>
              
              <form onSubmit={handleSaveAddress} style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}><Phone size={16} /> phone number</label>
                    <input type="text" className="form-input" placeholder="+1 (555) 000-0000" value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} />
                  </div>
                </div>
                
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}><Home size={16} /> address line 1</label>
                  <input type="text" className="form-input" placeholder="123 Main St" value={addressForm.address_line_1} onChange={e => setAddressForm({...addressForm, address_line_1: e.target.value})} />
                </div>
                
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}><Building size={16} /> address line 2 (optional)</label>
                  <input type="text" className="form-input" placeholder="Apt 4B" value={addressForm.address_line_2} onChange={e => setAddressForm({...addressForm, address_line_2: e.target.value})} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}><MapPin size={16} /> city</label>
                    <input type="text" className="form-input" placeholder="New York" value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}><Flag size={16} /> state / province</label>
                    <input type="text" className="form-input" placeholder="NY" value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}><Hash size={16} /> postal code</label>
                    <input type="text" className="form-input" placeholder="10001" value={addressForm.postal_code} onChange={e => setAddressForm({...addressForm, postal_code: e.target.value})} />
                  </div>
                </div>
                
                <button type="submit" disabled={savingAddress} className="btn-shop-dark" style={{ alignSelf: 'flex-start', padding: '1rem 2rem', borderRadius: '15px', fontWeight: '700' }}>
                  {savingAddress ? 'Saving...' : 'Save Address'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="glass-card" style={{ padding: '2rem', background: '#fff', borderRadius: '24px' }}>
              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888', background: '#f8fafc', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
                  <Heart size={40} style={{ margin: '0 auto 15px', opacity: 0.5 }} />
                  <p>Your wishlist is empty.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '25px', paddingTop: '10px' }}>
                  {wishlist.map(product => (
                    <div 
                      key={product.id} 
                      style={{ 
                        background: '#fff', 
                        borderRadius: '20px', 
                        overflow: 'hidden', 
                        display: 'flex', 
                        flexDirection: 'column',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                        border: '1px solid #f1f5f9',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                      }}
                    >
                      <div style={{ height: '220px', background: '#f8f8f8', position: 'relative' }}>
                        <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        <button 
                          onClick={() => removeFromWishlist(product.id)} 
                          style={{ position: 'absolute', top: '15px', right: '15px', background: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        >
                          <Heart size={16} fill="#ef4444" color="#ef4444" />
                        </button>
                      </div>
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '5px', color: '#0f172a' }} className="truncate">{product.name}</p>
                          <p style={{ fontWeight: '800', color: '#3b82f6', fontSize: '1.2rem', marginBottom: '15px' }}>₹{Number(product.price).toFixed(0)}</p>
                        </div>
                        <button 
                          onClick={() => { addToCart(product, 1); navigate(`/${slug}/cart`); }} 
                          style={{ 
                            width: '100%', padding: '12px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '700',
                            background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#1e293b'}
                          onMouseLeave={(e) => e.target.style.background = '#0f172a'}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div>
              {/* <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px' }}>Recommended Stores</h2> */}
              {recommendedStores.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                  <Sparkles size={40} style={{ margin: '0 auto 15px', opacity: 0.5 }} />
                  <p>Check back later! We're finding the best stores for you.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '25px', paddingTop: '10px' }}>
                  {recommendedStores.map(store => (
                    <div 
                      key={store.id} 
                      style={{ 
                        background: '#fff', 
                        borderRadius: '20px', 
                        overflow: 'hidden', 
                        display: 'flex', 
                        flexDirection: 'column',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                        border: '1px solid #f1f5f9',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                      }}
                    >
                      {/* Banner Area */}
                      <div style={{ height: '90px', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', position: 'relative' }}>
                        {/* Overlapping Logo */}
                        <div style={{ 
                          position: 'absolute', 
                          bottom: '-35px', 
                          left: '50%', 
                          transform: 'translateX(-50%)',
                          width: '70px', 
                          height: '70px', 
                          background: '#fff', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          border: '3px solid #fff',
                          overflow: 'hidden'
                        }}>
                          {store.logo_url || store.avatar_url ? (
                            <img src={store.logo_url || store.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={store.name} />
                          ) : (
                            <Building size={30} color="#94a3b8" />
                          )}
                        </div>
                      </div>
                      
                      {/* Content Area */}
                      <div style={{ padding: '45px 20px 20px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ fontWeight: '800', fontSize: '1.15rem', color: '#0f172a', marginBottom: '4px', letterSpacing: '-0.3px' }} className="truncate">
                            {store.name}
                          </h3>
                          <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '500', marginBottom: '20px' }}>CartHive Storefront</p>
                        </div>
                        <a 
                          href={`/${store.slug}`} 
                          style={{ 
                            textDecoration: 'none', 
                            display: 'block', 
                            width: '100%',
                            padding: '12px', 
                            borderRadius: '12px', 
                            fontSize: '0.9rem', 
                            fontWeight: '700',
                            background: '#f8fafc',
                            color: '#0f172a',
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#0f172a';
                            e.target.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#f8fafc';
                            e.target.style.color = '#0f172a';
                          }}
                        >
                          Visit Store
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <style>{`
        .truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
};

export default CustomerAccount;
