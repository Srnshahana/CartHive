import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import {
  LayoutDashboard, ShoppingBag, Package, Settings, LogOut, Menu, X, Save, Plus,
  ArrowLeft, ArrowRight, Store as StoreIcon, ImageIcon, CheckCircle, Loader2, Heart, Tag, Type, MapPin, Mail, Phone,
  User, Rocket
} from 'lucide-react';

// Import Tabs
import Dashboard from './tabs/Dashboard';
import Orders from './tabs/Orders';
import Products from './tabs/Products';
import HomeConfig from './tabs/HomeConfig';

// Jewelry Assets
import heroImg from '../../assets/hero-img.avif';
import bannerImg from '../../assets/banner.avif';
import insta1 from '../../assets/insta-1.jpg';
import insta2 from '../../assets/insta2.jpg';
import insta3 from '../../assets/insta3.jpg';
import insta4 from '../../assets/insta4.jpg';
import insta5 from '../../assets/insta5.jpg';
import insta6 from '../../assets/insta6.jpg';
import logoSvg from '../../assets/logo.svg';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [uploadingMap, setUploadingMap] = useState({});
  const navigate = useNavigate();

  const showAlert = (message, title = 'Alert') => {
    setAlertConfig({ visible: true, title, message });
  };

  const closeAlert = () => {
    setAlertConfig({ ...alertConfig, visible: false });
  };

  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [homeConfig, setHomeConfig] = useState(null);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showArrowPointer, setShowArrowPointer] = useState(false);
  const [tourStep, setTourStep] = useState(0); // 0: None, 1: Point to Store Design, 2: Inside HomeConfig tips
  const [alertConfig, setAlertConfig] = useState({ visible: false, title: '', message: '' });

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

      // Handle First Time Onboarding
      if (biz.is_firsTime) {
        setShowOnboarding(true);
      }

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
        const dbLogo = biz.logo_url;
        finalConfig = {
          logo_url: dbLogo || logoSvg,
          hero_image: heroImg,
          hero_heading: 'Timeless Elegance',
          hero_subtext: 'Handcrafted jewellery for your most precious moments.',
          banner_image: bannerImg,
          banner_title: 'Exquisite Collections',
          banner_subtitle: 'Discover our latest handcrafted bracelets and rings.',
          ticker_text: 'NEW ARRIVALS: Handcrafted Gold & Silver Collections • Worldwide Shipping • Ethical & Sustainable ✿ • ',
          footer_about: 'Dedicated to the art of fine jewellery, we craft pieces that tell your unique story with elegance and precision.',
          support_email: `support@${biz.slug}.com`,
          support_phone: '+1 123 456 7890',
          physical_address: '123 Jewellery Lane, Luxury City',
          our_story: 'Dedicated to the art of fine jewellery, we craft pieces that tell your unique story with elegance and precision. Our journey began with a simple passion for transforming raw materials into timeless treasures. Today, we celebrate individuality and bring radiant confidence to everyone who wears our collections.',
          instagram_link: 'https://instagram.com/',
          facebook_link: '',
          twitter_link: '',
          linkedin_link: '',
          whatsapp_link: '',
          terms_and_conditions: `Welcome to our store. By accessing this website, you agree to be bound by these Terms and Conditions. All content is owned by ${biz.name}. We reserve the right to modify these terms at any time.`,
          privacy_policy: `We respect your privacy. We only collect information necessary to process your orders and improve your shopping experience. We never sell your personal data to third parties.`,
          shipping_policy: `We strive to ship all orders within 2-3 business days. Shipping rates are calculated at checkout. You will receive a tracking number once your order is on its way.`,
          refund_policy: `We accept returns within 30 days of purchase. Items must be in original condition. Please contact our support team to initiate a return process.`,
          instagram_images: [insta1, insta2, insta3, insta4, insta5, insta6]
        };
      }

      const brandingDefaults = {
        logo_url: logoSvg,
        hero_image: heroImg,
        hero_heading: 'Timeless Elegance',
        hero_subtext: 'Handcrafted jewellery for your most precious moments.',
        banner_image: bannerImg,
        banner_title: 'Exquisite Collections',
        banner_subtitle: 'Discover our latest handcrafted bracelets and rings.',
        ticker_text: 'NEW ARRIVALS: Handcrafted Gold & Silver Collections • Worldwide Shipping • Ethical & Sustainable ✿ • ',
        footer_about: 'Dedicated to the art of fine jewellery, we craft pieces that tell your unique story with elegance and precision.',
        our_story: 'Dedicated to the art of fine jewellery, we craft pieces that tell your unique story with elegance and precision. Our journey began with a simple passion for transforming raw materials into timeless treasures. Today, we celebrate individuality and bring radiant confidence to everyone who wears our collections.',
        instagram_images: [insta1, insta2, insta3, insta4, insta5, insta6]
      };

      const policyDefaults = {
        terms_and_conditions: `Welcome to our store. By accessing this website, you agree to be bound by these Terms and Conditions. All content is owned by ${biz.name}. We reserve the right to modify these terms at any time.`,
        privacy_policy: `We respect your privacy. We only collect information necessary to process your orders and improve your shopping experience. We never sell your personal data to third parties.`,
        shipping_policy: `We strive to ship all orders within 2-3 business days. Shipping rates are calculated at checkout. You will receive a tracking number once your order is on its way.`,
        refund_policy: `We accept returns within 30 days of purchase. Items must be in original condition. Please contact our support team to initiate a return process.`
      };

      const allDefaults = { ...brandingDefaults, ...policyDefaults };
      const patchedConfig = { ...finalConfig };

      Object.keys(allDefaults).forEach(key => {
        const val = patchedConfig[key];
        const isOldLogo = key === 'logo_url' && val === 'https://img.icons8.com/color/96/shop.png';
        
        if (val === null || val === undefined || (typeof val === 'string' && val.trim() === '') || (Array.isArray(val) && val.length === 0) || isOldLogo) {
          patchedConfig[key] = allDefaults[key];
        }
      });

      setHomeConfig(patchedConfig);
      // Sync to local storage for the preview iframe to pick up immediately
      localStorage.setItem(`carthive_preview_${biz.slug}`, JSON.stringify(patchedConfig));

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
      showAlert(err.message, 'Upload failed');
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

      if (!silent) showAlert('Changes published successfully!', 'Success');
      return true;
    } catch (err) {
      console.error('Publishing error:', err);
      if (!silent) showAlert(err.message, 'Error');
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
      showAlert('Design reset to defaults successfully!', 'Success');
    } catch (err) {
      showAlert(err.message, 'Error resetting design');
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
        hero_image: heroImg,
        hero_heading: 'Timeless Elegance',
        hero_subtext: 'Handcrafted jewellery for your most precious moments.',
        banner_image: bannerImg,
        banner_title: 'Exquisite Collections',
        banner_subtitle: 'Discover our latest handcrafted bracelets and rings.',
        ticker_text: 'NEW ARRIVALS: Handcrafted Gold & Silver Collections • Worldwide Shipping • Ethical & Sustainable ✿ • ',
        footer_about: 'Dedicated to the art of fine jewellery, we craft pieces that tell your unique story with elegance and precision.',
        support_email: `support@${currentBusiness.slug}.com`,
        support_phone: '+1 123 456 7890',
        physical_address: '123 Jewellery Lane, Luxury City',
        our_story: 'Dedicated to the art of fine jewellery, we craft pieces that tell your unique story with elegance and precision. Our journey began with a simple passion for transforming raw materials into timeless treasures. Today, we celebrate individuality by bringing radiant confidence to everyone who wears our collections. We believe that every piece of jewellery should be as unique and precious as the moments they commemorate, crafted with ethical standards and sustainable practices at the heart of everything we do.',
        instagram_link: 'https://instagram.com/',
        facebook_link: '',
        twitter_link: '',
        linkedin_link: '',
        whatsapp_link: '',
        terms_and_conditions: `Welcome to our store. By accessing this website, you agree to be bound by these Terms and Conditions. All content is owned by ${currentBusiness.name}. We reserve the right to modify these terms at any time.`,
        privacy_policy: `We respect your privacy. We only collect information necessary to process your orders and improve your shopping experience. We never sell your personal data to third parties.`,
        shipping_policy: `We strive to ship all orders within 2-3 business days. Shipping rates are calculated at checkout. You will receive a tracking number once your order is on its way.`,
        refund_policy: `We accept returns within 30 days of purchase. Items must be in original condition. Please contact our support team to initiate a return process.`,
        instagram_images: [insta1, insta2, insta3, insta4, insta5, insta6]
      };

      const { error } = await supabase.from('homepage_content').insert(defaults);
      if (error) throw error;

      await refreshAllData();
      showAlert('Default configuration created successfully!', 'Success');
    } catch (err) {
      showAlert(err.message, 'Error creating defaults');
    } finally {
      setPublishing(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await supabase.from('businesses').update({ is_firsTime: false }).eq('id', currentBusiness.id);
      setShowOnboarding(false);
      setCurrentBusiness(prev => ({ ...prev, is_firsTime: false }));
    } catch (err) {
      console.error('Error completing onboarding:', err);
      setShowOnboarding(false);
    }
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <div className={`admin-layout ${mobileMenuOpen ? 'sidebar-open' : ''}`}>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-logo" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', color: '#102a82' }}>Admin Dashboard</div>
          <button className="admin-mobile-close" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}><LayoutDashboard size={20} /> dashboard</button>
          <button className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }}><ShoppingBag size={20} /> orders</button>
          <button className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }}><Package size={20} /> products</button>

          <div style={{ position: 'relative' }}>
            <button className={`admin-nav-item ${activeTab === 'home_screen' ? 'active' : ''}`} onClick={() => {
                setActiveTab('home_screen');
                setMobileMenuOpen(false);
                if (showArrowPointer) {
                  setShowArrowPointer(false);
                  setTourStep(2);
                }
              }}>
                  <CustomStoreIcon /> <span>Store Design</span>
            </button>
            {showArrowPointer && (
              <div className="tour-arrow-pointer">
                <div className="arrow-content">
                  <div className="arrow-pulse"></div>
                  <span>Start Here!</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', margin: '1rem 0', paddingTop: '1rem' }}>
            <button
              onClick={() => navigate(`/${currentBusiness?.slug}`)}
              className="admin-nav-item"
              style={{ color: '#64748b' }}
            >
              <ArrowLeft size={20} /> back to store
            </button>
          </div>
        </nav>
        <button onClick={() => { localStorage.removeItem('carthive_user'); navigate('/login'); }} className="admin-nav-item" style={{ color: '#ff4444', marginTop: 'auto' }}><LogOut size={20} /> logout</button>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}> */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="admin-mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            {activeTab !== 'home_screen' && (
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {activeTab === 'home_screen' && (
              <div style={{ display: 'flex', gap: '0.75rem', position: 'relative' }}>
                <button
                  className="btn-launch-instant"
                  style={{
                    padding: '0.6rem 2.2rem',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)'
                  }}
                  onClick={() => publishChanges()}
                  disabled={publishing}
                >
                  {publishing ? 'publishing...' : 'publish changes'}
                </button>
                {tourStep === 5 && (
                  <div className="tour-arrow-pointer" style={{ right: 'calc(100% + 15px)', left: 'auto', top: '50%' }}>
                    <div className="arrow-content" style={{ flexDirection: 'row-reverse' }}>
                      <div className="arrow-pulse"></div>
                      <span>Click Publish!</span>
                      <div className="arrow-tip-left"></div>
                    </div>
                  </div>
                )}
                <button
                  className="btn-shop-dark"
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '12px', background: '#f8fafc', color: '#64748b', borderColor: '#e2e8f0' }}
                  onClick={createDefaultConfig}
                  disabled={publishing}
                  title="Reset Design"
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
            showAlert={showAlert}
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
            tourStep={tourStep}
            setTourStep={setTourStep}
            completeOnboarding={completeOnboarding}
          />
        )}
      </main>

      {/* Onboarding Overlay - Simplified Welcome */}
      {showOnboarding && (
        <div className="admin-onboarding-overlay">
          <div className="onboarding-card reveal-on-scroll reveal-active" style={{ maxWidth: '500px', textAlign: 'center' }}>
            <div style={{ background: '#eff6ff', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#3b82f6' }}>
              <Rocket size={40} />
            </div>
            <h2 className="onboarding-title">Welcome to {currentBusiness?.name || 'Your Boutique'}!</h2>
            <p className="onboarding-subtitle" style={{ marginBottom: '2.5rem' }}>
              Your boutique is live! Let's take 30 seconds to customize your design and make it truly yours.
            </p>

            <button
              onClick={() => {
                setShowOnboarding(false);
                setShowArrowPointer(true);
                setTourStep(1);
              }}
              className="btn-launch-instant"
              style={{ width: '100%', justifyContent: 'center', padding: '1.2rem' }}
            >
              Let's Get Started <ArrowRight size={20} />
            </button>

            <button onClick={completeOnboarding} className="onboarding-skip" style={{ marginTop: '1.5rem' }}>
              I'll explore on my own
            </button>
          </div>
        </div>
      )}

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

export default AdminPortal;

const CustomStoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1e293b" />
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="white" />
  </svg>
);
