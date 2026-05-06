import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { LayoutDashboard, ShoppingBag, Edit3, LogOut, Package, User, Layout, Save } from 'lucide-react';

// Import Tabs
import Dashboard from './tabs/Dashboard';
import Orders from './tabs/Orders';
import Products from './tabs/Products';
import HomeConfig from './tabs/HomeConfig';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [uploadingMap, setUploadingMap] = useState({});
  const navigate = useNavigate();

  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [homeConfig, setHomeConfig] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initial fetch with full loading state
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    await refreshAllData();
    setLoading(false);
  };

  const refreshAllData = async () => {
    try {
      const savedUser = localStorage.getItem('carthive_user');
      if (!savedUser) {
        navigate('/login');
        return;
      }
      const userData = JSON.parse(savedUser);
      setUser(userData);

      // Fetch Business
      const { data: biz, error: bizErr } = await supabase.from('businesses').select('*').eq('id', userData.business_id).single();
      if (bizErr || !biz) throw new Error('Business not found');
      setCurrentBusiness(biz);

      // Fetch Config
      const { data: config } = await supabase.from('homepage_content').select('*').eq('business_id', biz.id).single();
      if (config) {
        // Remove logo_url if it's missing from schema but present in state
        const { logo_url, ...safeConfig } = config; 
        setHomeConfig(config); // Keep it for now, but upsert will fail if we include it
      } else if (!homeConfig) {
        setHomeConfig({
          hero_image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
          hero_heading: 'shine on',
          hero_subtext: 'beauty that reflects your spirit',
          banner_image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop',
          banner_title: 'effortless beauty, timeless charm.',
          banner_subtitle: 'new arrivals now in stock',
          ticker_text: 'orders over $50 ✿ free shipping on orders over $50 ✿',
          footer_about: 'born from a passion for beauty rituals, we celebrate individuality and bring radiant confidence to everyone',
          support_email: 'support@artstore.com',
          support_phone: '+1 123 456 7890',
          physical_address: '123 Creative Lane, Art City',
          instagram_images: ['', '', '', '', '', '']
        });
      }

      // Fetch Categories
      const { data: cats } = await supabase.from('categories').select('*').eq('business_id', biz.id);
      setCategories(cats || []);

      // Fetch Products with Categories
      const { data: prods } = await supabase
        .from('products')
        .select('*, categories(*)')
        .eq('business_id', biz.id);
      setProducts(prods || []);
      
    } catch (err) {
      console.error(err);
      localStorage.removeItem('carthive_user');
      navigate('/login');
    }
  };

  const handleFileUpload = async (source, isFile, bucket, fieldKey, index = null) => {
    console.log('--- Handle File Upload Start ---');
    console.log('Bucket:', bucket, 'Field:', fieldKey, 'IsFile:', isFile);
    
    if (!isFile) {
      console.log('Direct URL entry detected:', source);
      if (bucket === 'homepage' || bucket === 'logos') {
        if (index !== null) handleSocialImageChange(index, source);
        else setHomeConfig(prev => ({ ...prev, [fieldKey]: source }));
      }
      return source;
    }

    try {
      console.log('File upload process beginning...');
      setUploadingMap(prev => ({ ...prev, [fieldKey]: true }));
      
      const publicUrl = await uploadImage(source, bucket);
      console.log('Supabase returned public URL:', publicUrl);
      
      if (bucket === 'homepage' || bucket === 'logos') {
        console.log('Updating HomeConfig state for bucket:', bucket);
        if (index !== null) handleSocialImageChange(index, publicUrl);
        else setHomeConfig(prev => ({ ...prev, [fieldKey]: publicUrl }));
      }
      
      console.log('Upload workflow complete. Returning URL.');
      return publicUrl;
    } catch (err) {
      console.error('CRITICAL UPLOAD ERROR:', err);
      alert('Upload failed: ' + err.message);
      return null;
    } finally {
      setUploadingMap(prev => ({ ...prev, [fieldKey]: false }));
      console.log('--- Handle File Upload End ---');
    }
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setHomeConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialImageChange = (index, value) => {
    const newImages = [...(homeConfig.instagram_images || ['', '', '', '', '', ''])];
    newImages[index] = value;
    setHomeConfig(prev => ({ ...prev, instagram_images: newImages }));
  };

  const publishChanges = async () => {
    setPublishing(true);
    try {
      // Create a copy without logo_url to avoid schema errors if it doesn't exist
      const { logo_url, ...dataToSave } = homeConfig;
      
      const { error } = await supabase.from('homepage_content').upsert({
        business_id: currentBusiness.id,
        store_name: currentBusiness.name,
        ...dataToSave
      }, { onConflict: 'business_id' });
      if (error) throw error;
      alert('Changes published successfully!');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setPublishing(false);
    }
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">carthive admin</div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={20} /> dashboard</button>
          <button className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><ShoppingBag size={20} /> orders</button>
          <button className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}><Package size={20} /> products</button>
          <button className={`admin-nav-item ${activeTab === 'home_screen' ? 'active' : ''}`} onClick={() => setActiveTab('home_screen')}><Layout size={20} /> home screen</button>
        </nav>
        <button onClick={() => { localStorage.removeItem('carthive_user'); navigate('/login'); }} className="admin-nav-item" style={{ color: '#ff4444', marginTop: 'auto' }}><LogOut size={20} /> logout</button>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <h2 style={{ textTransform: 'lowercase' }}>{activeTab}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {activeTab === 'home_screen' && (
              <button className="btn-shop-dark" style={{ padding: '0.6rem 1.8rem', borderRadius: '10px' }} onClick={publishChanges} disabled={publishing}>
                <Save size={18} /> {publishing ? 'publishing...' : 'publish changes'}
              </button>
            )}
            <div style={{ textAlign: 'right', marginRight: '1rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: '800' }}>{user?.name || currentBusiness?.name}</p>
              <p style={{ fontSize: '0.7rem', color: '#888' }}>Store Admin</p>
            </div>
            <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} color="#666" /></div>
          </div>
        </header>

        {activeTab === 'dashboard' && <Dashboard products={products} />}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'products' && (
          <Products 
            products={products} 
            categories={categories} 
            handleFileUpload={handleFileUpload} 
            uploadingMap={uploadingMap} 
            refreshData={refreshAllData}
            businessId={currentBusiness?.id}
          />
        )}
        {activeTab === 'home_screen' && homeConfig && (
          <HomeConfig 
            homeConfig={homeConfig} 
            handleConfigChange={handleConfigChange} 
            handleSocialImageChange={handleSocialImageChange} 
            businessSlug={currentBusiness?.slug}
            handleFileUpload={handleFileUpload}
            uploadingMap={uploadingMap}
          />
        )}
      </main>
    </div>
  );
};

export default AdminPortal;
