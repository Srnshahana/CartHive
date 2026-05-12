import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { slug } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const { data, error: bizErr } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', slug)
          .single();

        if (bizErr || !data) {
          throw new Error('Store not found');
        }

        setBusiness(data);
        setError(null);
      } catch (err) {
        console.error('Store resolution error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [slug]);

  const value = {
    business,
    loading,
    error,
    slug
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdfdfd' }}>
        <div className="shimmer-effect" style={{ width: '200px', height: '40px', borderRadius: '12px' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#102a82', marginBottom: '1rem' }}>Store Not Found</h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '2rem' }}>We couldn't find a store at the address <strong>/{slug}</strong></p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => navigate('/')} className="btn-shop-dark">Back to platform</button>
        </div>
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
