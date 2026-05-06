import React from 'react';
import { Type, Tag, ImageIcon, MapPin, Mail, Phone, Upload, Loader2 } from 'lucide-react';

const ImageUploadField = ({ label, value, onUpload, uploading, bucket }) => (
  <div className="form-group">
    <label style={{ display: 'flex', justifyContent: 'space-between' }}>
      {label}
      {uploading && <Loader2 size={14} className="spin" />}
    </label>
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <textarea 
        className="form-input" 
        value={value} 
        onChange={(e) => onUpload(e.target.value, false)} 
        rows="1" 
        style={{ flex: 1 }}
        placeholder="Paste URL or upload image..."
      />
      <label className="upload-btn">
        <Upload size={18} />
        <input 
          type="file" 
          accept="image/*" 
          hidden 
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) onUpload(file, true, bucket);
          }} 
        />
      </label>
    </div>
  </div>
);

const HomeConfig = ({ homeConfig, handleConfigChange, handleSocialImageChange, businessSlug, handleFileUpload, uploadingMap }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: '100%' }}>
      
      {/* Scrollable Container */}
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
        <div className="admin-table-container" style={{ minWidth: '600px', flexShrink: 0, padding: '2.5rem', scrollSnapAlign: 'start' }}>
          <h4 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '800' }}>
            <Type size={22} color="#3b82f6" /> Store Branding
          </h4>
          <div className="admin-form" style={{ gap: '2rem' }}>
            <ImageUploadField 
              label="Store Logo" 
              value={homeConfig.logo_url} 
              onUpload={(val, isFile) => handleFileUpload(val, isFile, 'logos', 'logo_url')}
              uploading={uploadingMap['logo_url']}
              bucket="logos"
            />
            <ImageUploadField 
              label="Hero Image" 
              value={homeConfig.hero_image} 
              onUpload={(val, isFile) => handleFileUpload(val, isFile, 'homepage', 'hero_image')}
              uploading={uploadingMap['hero_image']}
              bucket="homepage"
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Hero Heading</label>
                <textarea className="form-input" name="hero_heading" value={homeConfig.hero_heading} onChange={handleConfigChange} rows="2" />
              </div>
              <div className="form-group">
                <label>Hero Subtext</label>
                <textarea className="form-input" name="hero_subtext" value={homeConfig.hero_subtext} onChange={handleConfigChange} rows="2" />
              </div>
            </div>
          </div>
        </div>

        {/* Banners Section */}
        <div className="admin-table-container" style={{ minWidth: '500px', flexShrink: 0, padding: '2.5rem', scrollSnapAlign: 'start' }}>
          <h4 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '800' }}>
            <Tag size={22} color="#3b82f6" /> Banners & Ticker
          </h4>
          <div className="admin-form" style={{ gap: '2rem' }}>
            <ImageUploadField 
              label="Banner Image" 
              value={homeConfig.banner_image} 
              onUpload={(val, isFile) => handleFileUpload(val, isFile, 'homepage', 'banner_image')}
              uploading={uploadingMap['banner_image']}
              bucket="homepage"
            />
            <div className="form-group">
              <label>Banner Title</label>
              <textarea className="form-input" name="banner_title" value={homeConfig.banner_title} onChange={handleConfigChange} rows="2" />
            </div>
            <div className="form-group">
              <label>Moving Ticker Text</label>
              <textarea className="form-input" name="ticker_text" value={homeConfig.ticker_text} onChange={handleConfigChange} rows="2" />
            </div>
          </div>
        </div>

        {/* Social Section */}
        <div className="admin-table-container" style={{ minWidth: '650px', flexShrink: 0, padding: '2.5rem', scrollSnapAlign: 'start' }}>
          <h4 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '800' }}>
            <ImageIcon size={22} color="#3b82f6" /> Social Gallery
          </h4>
          <div className="admin-form" style={{ gap: '2rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '800' }}>Instagram Images (6 Slots)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {homeConfig.instagram_images?.map((img, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <textarea 
                    className="form-input" 
                    placeholder={`URL ${i+1}`} 
                    value={img} 
                    onChange={(e) => handleSocialImageChange(i, e.target.value)} 
                    rows="1" 
                    style={{ fontSize: '0.8rem', paddingRight: '2.5rem' }} 
                  />
                  <label style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#94a3b8' }}>
                    {uploadingMap[`insta_${i}`] ? <Loader2 size={14} className="spin" /> : <Upload size={14} />}
                    <input 
                      type="file" 
                      accept="image/*" 
                      hidden 
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) handleFileUpload(file, true, 'homepage', `insta_${i}`, i);
                      }} 
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="admin-table-container" style={{ minWidth: '550px', flexShrink: 0, padding: '2.5rem', scrollSnapAlign: 'start' }}>
          <h4 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '800' }}>
            <MapPin size={22} color="#3b82f6" /> Footer & Support
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
          </div>
        </div>
      </div>

      {/* Live Preview Section */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '800' }}>Live <span className="gradient-text">Store Preview</span></h3>
        <div style={{ border: '12px solid #1e293b', borderRadius: '40px', overflow: 'hidden', height: '800px', width: '100%', background: '#fff', boxShadow: '0 40px 100px rgba(0,0,0,0.2)' }}>
          <iframe src={`/${businessSlug}`} style={{ width: '100%', height: '100%', border: 'none' }} title="Preview" />
        </div>
      </div>
      <style>{`
        .upload-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          color: #64748b;
          width: 45px;
          height: 45px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .upload-btn:hover { background: #e2e8f0; color: #3b82f6; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default HomeConfig;
