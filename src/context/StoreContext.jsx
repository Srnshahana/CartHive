import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const StoreContext = createContext();

export const StoreProvider = ({ children, hostname }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      if (!slug && !hostname) return;
      
      try {
        setLoading(true);
        // 1. Fetch business details by slug or custom_domain
        let query = supabase.from('businesses').select('*');
        if (hostname) {
          query = query.eq('custom_domain', hostname);
        } else {
          query = query.eq('slug', slug);
        }

        const { data: business, error: bizError } = await query.single();

        if (bizError || !business) {
          console.error('Store not found:', bizError);
          setError('Store not found');
          return;
        }

        // Premium Feature Gate: Block 'Launch' plans from using custom domains
        if (hostname && business.payment_plan === 'Launch') {
          setError('Domain Inactive');
          return;
        }

        // 2. Fetch homepage content/config for this business
        const { data: config } = await supabase
          .from('homepage_content')
          .select('*')
          .eq('business_id', business.id)
          .maybeSingle();

        setStoreData({
          ...business,
          config: config || {}
        });
      } catch (err) {
        console.error('Error resolving store slug:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [slug, hostname]);

  const value = {
    storeData,
    loading,
    error,
    businessId: storeData?.id,
    businessName: storeData?.name,
    config: storeData?.config
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfcfc' }}>
        <div className="shimmer-effect" style={{ width: '200px', height: '40px', borderRadius: '8px' }}></div>
      </div>
    );
  }

  if (error && !loading) {
    // Optionally redirect to platform landing if store not found
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Store not found</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Back to CartHive</button>
      </div>
    );
  }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
