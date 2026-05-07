import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { LayoutDashboard, ShoppingBag, Edit3, LogOut, Package, User, Layout, Save, Plus, Loader2 } from 'lucide-react';

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

      // Fetch Config - Get the latest entry to avoid issues with duplicates
      const { data: configList } = await supabase
        .from('homepage_content')
        .select('*')
        .eq('business_id', biz.id)
        .order('created_at', { ascending: false })
        .limit(1);

      const config = configList?.[0] || null;

      // Check localStorage for preview fallback (matches Navbar behavior)
      let previewLogo = null;
      const previewData = localStorage.getItem(`carthive_preview_${biz.slug}`);
      if (previewData) {
        try {
          const parsed = JSON.parse(previewData);
          previewLogo = parsed.logo_url;
        } catch (e) { }
      }

      // Patch logo_url from business or preview if missing in config
      let finalConfig = config ? { ...config } : null;
      const dbLogo = biz.logo_url || biz.logo || biz.store_logo || biz.avatar_url || (config ? (config.logo_url || config.logo) : null) || previewLogo;

      if (dbLogo) {
        if (!finalConfig) finalConfig = { logo_url: dbLogo };
        else finalConfig.logo_url = dbLogo;
      }

      // Mandatory fallback to prevent empty state in admin card
      if (finalConfig && !finalConfig.logo_url) {
        finalConfig.logo_url = 'https://img.icons8.com/color/96/shop.png';
      }

      if (!finalConfig) {
        finalConfig = {
          logo_url: dbLogo || 'https://img.icons8.com/color/96/shop.png',
          hero_image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
          hero_heading: 'shine on the',
          hero_subtext: 'beauty that reflects your spirits',
          banner_image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop',
          banner_title: 'effortless beauty, timeless charm.',
          banner_subtitle: 'new arrivals now in stock',
          ticker_text: 'orders over $50 ✿ free shipping on orders over $50 ✿',
          footer_about: 'born from a passion for beauty rituals, we celebrate individuality and bring radiant confidence to everyone',
          support_email: `support@${biz.slug}.com`,
          support_phone: '+1 123 456 7890',
          physical_address: '123 Creative Lane, Art City',
          our_story: 'Born from a passion for beauty rituals, we celebrate individuality and bring radiant confidence to everyone. We believe that every person deserves to feel beautiful in their own skin.',
          instagram_link: 'https://instagram.com/',
          facebook_link: '',
          twitter_link: '',
          linkedin_link: '',
          whatsapp_link: '',
          terms_and_conditions: `Welcome to our store. By accessing this website, you agree to be bound by these Terms and Conditions. All content is owned by ${biz.name}. We reserve the right to modify these terms at any time.`,
          privacy_policy: `We respect your privacy. We only collect information necessary to process your orders and improve your shopping experience. We never sell your personal data to third parties.`,
          shipping_policy: `We strive to ship all orders within 2-3 business days. Shipping rates are calculated at checkout. You will receive a tracking number once your order is on its way.`,
          refund_policy: `We accept returns within 30 days of purchase. Items must be in original condition. Please contact our support team to initiate a return process.`,
          instagram_images: [
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop'
          ]
        };
      }

      // Mandatory fallbacks for existing config
      if (!finalConfig.instagram_images || finalConfig.instagram_images.length === 0) {
        finalConfig.instagram_images = [
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop'
        ];
      }

      const policyDefaults = {
        terms_and_conditions: `Welcome to our store. By accessing this website, you agree to be bound by these Terms and Conditions. All content is owned by ${biz.name}. We reserve the right to modify these terms at any time.`,
        privacy_policy: `We respect your privacy. We only collect information necessary to process your orders and improve your shopping experience. We never sell your personal data to third parties.`,
        shipping_policy: `We strive to ship all orders within 2-3 business days. Shipping rates are calculated at checkout. You will receive a tracking number once your order is on its way.`,
        refund_policy: `We accept returns within 30 days of purchase. Items must be in original condition. Please contact our support team to initiate a return process.`
      };

      const patchedConfig = { ...finalConfig };
      Object.keys(policyDefaults).forEach(key => {
        const val = patchedConfig[key];
        if (val === null || val === undefined || (typeof val === 'string' && val.trim() === '')) {
          patchedConfig[key] = policyDefaults[key];
        }
      });

      setHomeConfig(patchedConfig);

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
      console.error('Fetch error:', err);
      // Only log out if it's explicitly an authentication error
      if (err.message?.includes('JWT') || err.status === 401) {
        localStorage.removeItem('carthive_user');
        navigate('/login');
      }
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

  const publishChanges = async (silent = false) => {
    setPublishing(true);
    try {
      const logo = homeConfig.logo_url;

      // 1. Try to update business logo in multiple possible columns
      const { error: bizError } = await supabase.from('businesses').update({
        logo_url: logo,
        logo: logo,
        store_logo: logo,
        avatar_url: logo
      }).eq('id', currentBusiness.id);

      if (bizError) console.warn('Business logo update error:', bizError.message);

      // Smart Update: ONLY edit existing row
      // Strip ID and non-existent columns to avoid schema errors
      const {
        id: oldId,
        created_at,
        logo: tmpL,
        store_logo: tmpSL,
        avatar_url: tmpAV,
        instagram_links: tmpILs,
        ...configToSave
      } = homeConfig;

      const { data: updatedData, error } = await supabase.from('homepage_content').update({
        ...configToSave,
        business_id: currentBusiness.id,
        store_name: currentBusiness.name,
        logo_url: logo,
        instagram_link: homeConfig.instagram_link,
        facebook_link: homeConfig.facebook_link,
        twitter_link: homeConfig.twitter_link,
        linkedin_link: homeConfig.linkedin_link,
        whatsapp_link: homeConfig.whatsapp_link,
        terms_and_conditions: homeConfig.terms_and_conditions,
        privacy_policy: homeConfig.privacy_policy,
        shipping_policy: homeConfig.shipping_policy,
        refund_policy: homeConfig.refund_policy
      }).eq('business_id', currentBusiness.id).select();

      if (error) throw error;

      if (!updatedData || updatedData.length === 0) {
        throw new Error('No configuration found to update. Please click the "+" button to initialize your store first!');
      }

      // Sync local state and re-fetch to be 100% sure
      await refreshAllData();

      if (!silent) alert('Changes published successfully!');
      return true;
    } catch (err) {
      console.error('Publishing error:', err);
      if (!silent) alert('Error: ' + err.message);
      return false;
    } finally {
      setPublishing(false);
    }
  };

  const handleResetDesign = async () => {
    if (!window.confirm('Are you sure you want to reset all designs to default? This will delete your current live settings.')) return;

    try {
      setPublishing(true);
      // 1. Delete from DB
      await supabase.from('homepage_content').delete().eq('business_id', currentBusiness.id);

      // 2. Clear localStorage
      localStorage.removeItem(`carthive_preview_${currentBusiness.slug}`);

      // 3. Reload everything
      await refreshAllData();
      alert('Design reset to defaults successfully!');
    } catch (err) {
      alert('Error resetting design: ' + err.message);
    } finally {
      setPublishing(false);
    }
  };

  const createDefaultConfig = async () => {
    try {
      setPublishing(true);
      const defaults = {
        business_id: currentBusiness.id,
        store_name: currentBusiness.name,
        logo_url: 'https://img.icons8.com/color/96/shop.png',
        hero_image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
        hero_heading: 'shine on the',
        hero_subtext: 'beauty that reflects your spirits',
        banner_image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop',
        banner_title: 'effortless beauty, timeless charm.',
        banner_subtitle: 'new arrivals now in stock',
        ticker_text: 'orders over $50 ✿ free shipping on orders over $50 ✿',
        footer_about: 'born from a passion for beauty rituals, we celebrate individuality and bring radiant confidence to everyone',
        support_email: `support@${currentBusiness.slug}.com`,
        support_phone: '+1 123 456 7890',
        physical_address: '123 Creative Lane, Art City',
        our_story: 'Born from a passion for beauty rituals, we celebrate individuality and bring radiant confidence to everyone. We believe that every person deserves to feel beautiful in their own skin.',
        instagram_link: 'https://instagram.com/',
        facebook_link: '',
        twitter_link: '',
        linkedin_link: '',
        whatsapp_link: '',
        terms_and_conditions: `Welcome to our store. By accessing this website, you agree to be bound by these Terms and Conditions. All content is owned by ${currentBusiness.name}. We reserve the right to modify these terms at any time.`,
        privacy_policy: `We respect your privacy. We only collect information necessary to process your orders and improve your shopping experience. We never sell your personal data to third parties.`,
        shipping_policy: `We strive to ship all orders within 2-3 business days. Shipping rates are calculated at checkout. You will receive a tracking number once your order is on its way.`,
        refund_policy: `We accept returns within 30 days of purchase. Items must be in original condition. Please contact our support team to initiate a return process.`,
        instagram_images: [
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=600&fit=crop',
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
          'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop'
        ]
      };

      const { error } = await supabase.from('homepage_content').insert(defaults);
      if (error) throw error;

      await refreshAllData();
      alert('Default configuration created successfully!');
    } catch (err) {
      alert('Error creating defaults: ' + err.message);
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
            {homeConfig?.logo_url ? (
              <img src={homeConfig.logo_url} alt={currentBusiness?.name} style={{ height: '40px', width: '40px', borderRadius: '4px', objectFit: 'contain' }} />
            ) : (
              <StoreIcon />
            )}
            {activeTab === 'home_screen' && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-shop-dark" style={{ padding: '0.6rem 1.8rem', borderRadius: '10px' }} onClick={() => publishChanges()} disabled={publishing}>
                  <Save size={18} /> {publishing ? 'publishing...' : 'publish changes'}
                </button>
                <button
                  className="btn-shop-dark"
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', background: '#3b82f6', color: 'white', borderColor: '#3b82f6' }}
                  onClick={createDefaultConfig}
                  disabled={publishing}
                  title="Create default configuration row"
                >
                  <Plus size={18} />
                </button>
              </div>
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
            publishChanges={publishChanges}
            publishing={publishing}
            handleResetDesign={handleResetDesign}
            createDefaultConfig={createDefaultConfig}
          />
        )}
      </main>
    </div>
  );
};

export default AdminPortal;

const StoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1e293b" />
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="white" />
  </svg>
);
