import React from 'react';
import { Type, Tag, ImageIcon, MapPin, Mail, Phone, Upload, Loader2, Heart, IndianRupee, Star } from 'lucide-react';

const ImageUploadField = ({ label, value, onUpload, uploading, bucket, width = '100%', height = '140px', objectFit = 'contain' }) => {
  const fileInputId = `upload-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="form-group">
      <label>{label}</label>
      <div
        onClick={() => document.getElementById(fileInputId).click()}
        style={{
          width: width, height: height, background: '#f8fafc', border: '2px dashed #e2e8f0',
          borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', position: 'relative'
        }}
      >
        {uploading ? (
          <div style={{ textAlign: 'center' }}>
            <Loader2 className="spin" size={24} color="#3b82f6" />
          </div>
        ) : value ? (

          <img src={value} style={{ width: '100%', height: '100%', objectFit: objectFit, padding: '0.5rem' }} alt={label} />
        ) : (
          <>
            <Upload size={24} color="#94a3b8" />
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>Click to upload</p>
          </>
        )}
      </div>
      <input
        id={fileInputId}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) onUpload(file, true, bucket);
        }}
      />
    </div>
  );
};

const HomeConfig = ({ 
  homeConfig, 
  handleConfigChange, 
  handleSocialImageChange, 
  businessSlug, 
  handleFileUpload, 
  uploadingMap, 
  publishChanges, 
  publishing,
  tourStep,
  setTourStep,
  completeOnboarding
}) => {
  const [previewKey, setPreviewKey] = React.useState(0);
  const previewRef = React.useRef(null);
  const brandingRef = React.useRef(null);

  React.useEffect(() => {
    if (tourStep === 2 && brandingRef.current) {
      setTimeout(() => {
        brandingRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500); // Small delay to ensure layout is ready
    }
  }, [tourStep]);

  const handleApply = () => {
    localStorage.setItem(`carthive_preview_${businessSlug}`, JSON.stringify(homeConfig));
    setPreviewKey(k => k + 1);
    if (tourStep === 3) {
      setTourStep(4);
      // Wait for re-render then scroll
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: '100%', position: 'relative' }}>
      
      {/* Tour Step 4: Scroll UP to Preview (Now at top) */}
      {tourStep === 4 && (
        <div className="tour-tip-overlay">
          <div className="tour-tip-card" style={{ top: '150px', left: '50%', transform: 'translateX(-50%)', position: 'fixed' }}>
            <div className="tour-tip-icon"><ImageIcon size={20} /></div>
            <div className="tour-tip-content">
              <h4>3. Check Your Preview</h4>
              <p>Take a look at your mobile view at the top. If you're happy, click Next!</p>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTourStep(5);
                }} 
                className="btn-shop-dark" 
                style={{ marginTop: '1rem', padding: '0.4rem 1.5rem', fontSize: '0.8rem' }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Preview Section - MOVED TO TOP */}
      <div ref={previewRef} style={{ order: -1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800' }}>
            Live <span className="gradient-text">Store Preview</span>
          </h3>
        </div>
        <div style={{ 
          border: '12px solid #1e293b', 
          borderRadius: '40px', 
          overflow: 'hidden', 
          height: '750px', 
          width: '100%', 
          background: '#fff', 
          boxShadow: '0 40px 100px rgba(0,0,0,0.1)' 
        }}>
          <iframe key={previewKey} src={`/${businessSlug}?preview=true&k=${previewKey}`} style={{ width: '100%', height: '100%', border: 'none' }} title="Preview" />
        </div>
      </div>

      {/* Tour Step 4: Scroll UP to Preview (Now at top) */}
      {tourStep === 4 && (
        <div className="tour-tip-overlay">
          <div className="tour-tip-card" style={{ top: '150px', left: '50%', transform: 'translateX(-50%)', position: 'fixed' }}>
            <div className="tour-tip-icon"><ImageIcon size={20} /></div>
            <div className="tour-tip-content">
              <h4>3. Check Your Preview</h4>
              <p>Take a look at your mobile view at the top. If you're happy, click Next!</p>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTourStep(5);
                }} 
                className="btn-shop-dark" 
                style={{ marginTop: '1rem', padding: '0.4rem 1.5rem', fontSize: '0.8rem' }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Container (Form Inputs) */}
      <div
        className="custom-scrollbar"
        style={{
          width: '100%',
          overflowX: 'auto',
          display: 'flex',
          gap: '2.5rem',
          paddingBottom: '2rem',
          scrollSnapType: 'x mandatory'
        }}
      >

        {/* Branding Section */}
        <div 
          ref={brandingRef}
          className="admin-table-container" 
          style={{ minWidth: '600px', flexShrink: 0, padding: '2.5rem', scrollSnapAlign: 'start' }}
        >
          <h4 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '800' }}>
              <Type size={22} color="#3b82f6" /> Store Branding
            </span>
            <div style={{ position: 'relative' }}>
              <button className="btn-shop-dark" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleApply}>
                Apply
              </button>
              {tourStep === 3 && (
                <div className="tour-arrow-pointer" style={{ right: 'calc(100% + 15px)', left: 'auto', top: '50%' }}>
                  <div className="arrow-content" style={{ flexDirection: 'row-reverse' }}>
                    <div className="arrow-pulse"></div>
                    <span>2. Apply Changes</span>
                    <div className="arrow-tip-left"></div>
                  </div>
                </div>
              )}
            </div>
          </h4>
          <div className="admin-form" style={{ gap: '2rem' }}>
            <ImageUploadField
              label="Store Logo"
              value={homeConfig.logo_url}
              onUpload={(val, isFile) => handleFileUpload(val, isFile, 'logos', 'logo_url')}
              uploading={uploadingMap['logo_url']}
              bucket="logos"
              width="140px"
            />
            <ImageUploadField
              label="Hero Image"
              value={homeConfig.hero_image}
              onUpload={(val, isFile) => handleFileUpload(val, isFile, 'homepage', 'hero_image')}
              uploading={uploadingMap['hero_image']}
              bucket="homepage"
              width="240px"
              height="140px"
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group" style={{ position: 'relative' }}>
                <label>Hero Heading</label>
                <textarea 
                  className="form-input" 
                  name="hero_heading" 
                  value={homeConfig.hero_heading || ''} 
                  placeholder="Timeless Elegance"
                  onChange={(e) => {
                    handleConfigChange(e);
                    if (tourStep === 2) setTourStep(3);
                  }} 
                  rows="2" 
                />
                {/* Tour Arrow for Hero Heading */}
                {tourStep === 2 && (
                  <div className="tour-arrow-pointer" style={{ left: 'calc(100% + 15px)', top: '50%' }}>
                    <div className="arrow-content">
                      <div className="arrow-pulse"></div>
                      <span>1. Update Hero Text</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Hero Subtext</label>
                <textarea 
                  className="form-input" 
                  name="hero_subtext" 
                  value={homeConfig.hero_subtext || ''} 
                  placeholder="Handcrafted jewellery for your most precious moments."
                  onChange={handleConfigChange} 
                  rows="2" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Banners Section */}
        <div className="admin-table-container" style={{ minWidth: '500px', flexShrink: 0, padding: '2.5rem', scrollSnapAlign: 'start' }}>
          <h4 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '800' }}>
              <Tag size={22} color="#3b82f6" /> Banners & Ticker
            </span>
            <button className="btn-shop-dark" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleApply}>
              Apply
            </button>
          </h4>
          <div className="admin-form" style={{ gap: '2rem' }}>
            <ImageUploadField
              label="Banner Image"
              value={homeConfig.banner_image}
              onUpload={(val, isFile) => handleFileUpload(val, isFile, 'homepage', 'banner_image')}
              uploading={uploadingMap['banner_image']}
              bucket="homepage"
              width="240px"
              height="140px"
            />
            <div className="form-group">
              <label>Banner Title</label>
              <textarea 
                className="form-input" 
                name="banner_title" 
                value={homeConfig.banner_title || ''} 
                placeholder="Exquisite Collections"
                onChange={handleConfigChange} 
                rows="2" 
              />
            </div>
            <div className="form-group">
              <label>Moving Ticker Text</label>
              <textarea 
                className="form-input" 
                name="ticker_text" 
                value={homeConfig.ticker_text || ''} 
                placeholder="NEW ARRIVALS • Worldwide Shipping • Ethical & Sustainable ✿"
                onChange={handleConfigChange} 
                rows="2" 
              />
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="admin-table-container" style={{ minWidth: '500px', flexShrink: 0, padding: '2.5rem', scrollSnapAlign: 'start' }}>
          <h4 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '800' }}>
              <Heart size={22} color="#3b82f6" /> Our Story
            </span>
            <button className="btn-shop-dark" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleApply}>
              Apply
            </button>
          </h4>
          <div className="admin-form" style={{ gap: '2rem' }}>
            <div className="form-group">
              <label>Our Story Text</label>
              <textarea 
                className="form-input" 
                name="our_story" 
                value={homeConfig.our_story || ''} 
                onChange={handleConfigChange} 
                rows="6" 
                placeholder="Tell your brand's story..."
              />
            </div>
          </div>
        </div>

        {/* Social Section */}
        <div className="admin-table-container" style={{ minWidth: '500px', flexShrink: 0, padding: '2.5rem', scrollSnapAlign: 'start' }}>
          <h4 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '800' }}>
              <ImageIcon size={22} color="#3b82f6" /> Social Gallery
            </span>
            <button className="btn-shop-dark" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleApply}>
              Apply
            </button>
          </h4>
          <div className="admin-form" style={{ gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Instagram</label>
                <input className="form-input" name="instagram_link" value={homeConfig.instagram_link || ''} onChange={handleConfigChange} placeholder="https://instagram.com/..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Facebook</label>
                  <input className="form-input" name="facebook_link" value={homeConfig.facebook_link || ''} onChange={handleConfigChange} placeholder="Facebook URL" />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Twitter</label>
                  <input className="form-input" name="twitter_link" value={homeConfig.twitter_link || ''} onChange={handleConfigChange} placeholder="Twitter URL" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', color: '#64748b' }}>LinkedIn</label>
                  <input className="form-input" name="linkedin_link" value={homeConfig.linkedin_link || ''} onChange={handleConfigChange} placeholder="LinkedIn URL" />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.75rem', color: '#64748b' }}>WhatsApp</label>
                  <input className="form-input" name="whatsapp_link" value={homeConfig.whatsapp_link || ''} onChange={handleConfigChange} placeholder="WhatsApp number/link" />
                </div>
              </div>
            </div>
            
            <label style={{ fontSize: '0.9rem', fontWeight: '800', marginTop: '1rem', display: 'block' }}>Instagram Images (6 Slots)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: 'fit-content' }}>
              {homeConfig.instagram_images?.map((img, i) => (
                <ImageUploadField 
                  key={i}
                  label={`Image ${i + 1}`}
                  value={img}
                  onUpload={(val, isFile) => handleFileUpload(val, isFile, 'homepage', `insta_${i}`, i)}
                  uploading={uploadingMap[`insta_${i}`]}
                  bucket="homepage"
                  width="150px"
                  height="100px"
                  objectFit="cover"
                />
              ))}
            </div>
          </div>
        </div>


        <div className="admin-table-container" style={{ minWidth: '550px', flexShrink: 0, padding: '2.5rem', scrollSnapAlign: 'start' }}>
          <h4 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '800' }}>
              <MapPin size={22} color="#3b82f6" /> Footer & Support
            </span>
            <button className="btn-shop-dark" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleApply} disabled={publishing}>
              {publishing ? 'Applying...' : 'Apply'}
            </button>
          </h4>
          <div className="admin-form" style={{ gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label><Mail size={14} /> Email</label>
                <textarea className="form-input" name="support_email" value={homeConfig.support_email} onChange={handleConfigChange} rows="1" />
              </div>
              <div className="form-group">
                <label><Phone size={14} /> Phone</label>
                <textarea className="form-input" name="support_phone" value={homeConfig.support_phone} onChange={handleConfigChange} rows="1" />
              </div>
            </div>
            <div className="form-group">
              <label>About Text</label>
              <textarea className="form-input" name="footer_about" value={homeConfig.footer_about} onChange={handleConfigChange} rows="3" />
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '1.5rem', display: 'block' }}>Store Policies</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label>Terms & Conditions</label>
                  <textarea className="form-input" name="terms_and_conditions" value={homeConfig.terms_and_conditions || ''} onChange={handleConfigChange} rows="4" placeholder="Enter terms..." />
                </div>
                <div className="form-group">
                  <label>Privacy Policy</label>
                  <textarea className="form-input" name="privacy_policy" value={homeConfig.privacy_policy || ''} onChange={handleConfigChange} rows="4" placeholder="Enter privacy policy..." />
                </div>
                <div className="form-group">
                  <label>Shipping Policy</label>
                  <textarea className="form-input" name="shipping_policy" value={homeConfig.shipping_policy || ''} onChange={handleConfigChange} rows="4" placeholder="Enter shipping policy..." />
                </div>
                <div className="form-group">
                  <label>Refund Policy</label>
                  <textarea className="form-input" name="refund_policy" value={homeConfig.refund_policy || ''} onChange={handleConfigChange} rows="4" placeholder="Enter refund policy..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeConfig;
