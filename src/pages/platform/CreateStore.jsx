import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Rocket, ArrowLeft, Globe, CheckCircle2, AlertCircle, Loader2, User } from 'lucide-react';

const CreateStore = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [slugStatus, setSlugStatus] = useState('idle');
  const [isManualSlug, setIsManualSlug] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    ph_no: '',
    no_order: '',
    price_range: '',
    owner_name: '',
    email: '',
    password: ''
  });

  // Auto-generate slug from name only if not manually edited
  useEffect(() => {
    if (!isManualSlug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');

      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, isManualSlug]);

  // Check slug availability
  useEffect(() => {
    if (!formData.slug) {
      setSlugStatus('idle');
      return;
    }

    const checkSlug = async () => {
      setSlugStatus('checking');
      try {
        const { data } = await supabase
          .from('businesses')
          .select('slug')
          .eq('slug', formData.slug)
          .maybeSingle();

        setSlugStatus(data ? 'taken' : 'available');
      } catch (err) {
        console.error('Error checking slug:', err);
      }
    };

    const timer = setTimeout(checkSlug, 500);
    return () => clearTimeout(timer);
  }, [formData.slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Clear any previous merchant session to prevent "shop mixing"
    localStorage.removeItem('carthive_user');
    localStorage.removeItem('cart');

    // Validate phone number (exactly 10 digits)
    if (!/^\d{10}$/.test(formData.ph_no)) {
      setError('Please enter a valid 10-digit phone number.');
      setLoading(false);
      return;
    }

    if (slugStatus === 'taken') {
      setError('This store link is already taken. Please try another one.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create the Business
      const { data: bizData, error: insertError } = await supabase
        .from('businesses')
        .insert([{
          name: formData.name,
          slug: formData.slug,
          ph_no: formData.ph_no,
          no_order: parseInt(formData.no_order) || 0,
          price_range: formData.price_range,
          is_active: true, // Set to true for instant activation
          is_firsTime: true // Flag for first-time onboarding
        }])
        .select()
        .single();

      if (insertError) {
        if (insertError.message?.includes('businesses_slug_key')) {
          throw new Error('This store link (URL) is already taken. Please choose another one.');
        }
        throw insertError;
      }

      // 2. Create the User Account
      const { error: userError } = await supabase
        .from('users')
        .insert([{
          name: formData.owner_name,
          email: formData.email,
          password: formData.password,
          role: 'merchant',
          business_id: bizData.id
        }]);

      if (userError) {
        if (userError.message?.includes('users_email_key')) {
          throw new Error('This email is already registered. Please use a different email or log in.');
        }
        throw userError;
      }

      // 3. Auto-Login the new merchant
      const newUserSession = {
        name: formData.owner_name,
        email: formData.email,
        role: 'merchant',
        business_id: bizData.id,
        business_name: bizData.name // Important for dashboard display
      };
      
      localStorage.setItem('carthive_user', JSON.stringify(newUserSession));

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="platform-landing" style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', borderRadius: '40px', padding: '4rem', maxWidth: '600px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ background: '#ecfdf5', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#10b981' }}>
            <CheckCircle2 size={40} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Welcome to CartHive!</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem', textAlign: 'center' }}>
            Congratulations! <strong>{formData.name}</strong> is officially live.<br/> 
            Now, log in to your <strong>Merchant Dashboard</strong> to add your first products and customize your boutique's layout.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link 
              to={`/${formData.slug}`} 
              className="btn-launch-instant" 
              style={{ width: 'fit-content', minWidth: '280px', justifyContent: 'center', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              View Your Live Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="platform-landing launch-form-wrapper" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '800px' }}> {/* Slightly narrower for single column feel */}
        <Link to="/" className="btn-back-platform">
          <ArrowLeft size={18} /> Back to explore
        </Link>

        <div className="launch-form-card">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ background: '#eff6ff', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#3b82f6' }}>
              <Rocket size={40} />
            </div>
            <h1 style={{ fontWeight: '900', color: '#0f172a', marginBottom: '1rem', letterSpacing: '-1px' }}>Launch Your Boutique</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Enter your details to create your instant storefront.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '1rem', borderRadius: '16px', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <AlertCircle size={20} /> {error}
              </div>
            )}

            {/* Section 1: Store Identity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontWeight: '700', color: '#334155' }}>Store Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. My Art Boutique"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ padding: '1.2rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.1rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontWeight: '700', color: '#334155' }}>Store URL</label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    type="text"
                    placeholder="my-store-link"
                    value={formData.slug}
                    onChange={(e) => {
                      setIsManualSlug(true);
                      setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') });
                    }}
                    style={{ padding: '1.2rem', paddingLeft: '8.5rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.1rem', outline: 'none', width: '100%' }}
                  />
                  <div style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: '600' }}>
                    carthive.com/
                  </div>
                </div>
                {formData.slug && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', padding: '0 0.5rem' }}>
                    {slugStatus === 'checking' && <><Loader2 size={12} className="animate-spin" /> Checking availability...</>}
                    {slugStatus === 'available' && <><CheckCircle2 size={12} color="#10b981" /> Link available</>}
                    {slugStatus === 'taken' && <><AlertCircle size={12} color="#ef4444" /> This link is already taken</>}
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontWeight: '700', color: '#334155' }}>Phone Number (10 Digits)</label>
                  <input
                    required
                    type="tel"
                    placeholder="e.g. 9876543210"
                    maxLength="10"
                    value={formData.ph_no}
                    onChange={(e) => setFormData({ ...formData, ph_no: e.target.value.replace(/\D/g, '') })}
                    style={{ padding: '1.2rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.1rem', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontWeight: '700', color: '#334155' }}>Avg. Monthly Orders</label>
                  <input
                    required
                    type="number"
                    placeholder="e.g. 50"
                    value={formData.no_order}
                    onChange={(e) => setFormData({ ...formData, no_order: e.target.value })}
                    style={{ padding: '1.2rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.1rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontWeight: '700', color: '#334155' }}>Price Range</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. ₹500 - ₹15000"
                  value={formData.price_range}
                  onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                  style={{ padding: '1.2rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.1rem', outline: 'none' }}
                />
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Specify the minimum and maximum price (₹) of the products you sell.</span>
              </div>
            </div>

            {/* Section 2: Owner Credentials */}
            <div style={{ padding: '2.5rem', background: '#f8fafc', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: '#3b82f6', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <User size={20} />
                </div>
                Owner Credentials
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontWeight: '700', color: '#334155' }}>Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.owner_name}
                    onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                    style={{ padding: '1.2rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.1rem', outline: 'none', background: 'white' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontWeight: '700', color: '#334155' }}>Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="owner@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ padding: '1.2rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.1rem', outline: 'none', background: 'white' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label style={{ fontWeight: '700', color: '#334155' }}>Set Password</label>
                    <input
                      required
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      style={{ padding: '1.2rem', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '1.1rem', outline: 'none', background: 'white' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <button
                type="submit"
                disabled={loading || slugStatus === 'taken' || slugStatus === 'checking'}
                className="btn-launch-instant"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Rocket size={20} />}
                {loading ? 'Creating Store...' : 'Launch Instant Store'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error Modal */}
      {error && (
        <div className="admin-alert-overlay" style={{ zIndex: 10000 }}>
          <div className="admin-alert-modal reveal-on-scroll reveal-active">
            <div style={{ background: '#fef2f2', width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', margin: '0 auto 1.5rem' }}>
              <AlertCircle size={32} />
            </div>
            <h3 className="admin-alert-title">Registration Issue</h3>
            <p className="admin-alert-message" style={{ marginBottom: '2rem' }}>{error}</p>
            <button 
              className="btn-launch-instant" 
              style={{ width: '100%', justifyContent: 'center', background: '#ef4444' }} 
              onClick={() => setError(null)}
            >
              Understand & Fix
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStore;
