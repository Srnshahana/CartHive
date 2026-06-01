import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, LogIn, ArrowLeft, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fromStore = location.state?.fromStore;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Query the users table provided in your schema
      const { data, error: queryError } = await supabase
        .from('users')
        .select('*, businesses(*)')
        .eq('email', email)
        .eq('password', password) // Note: In production, use hashed passwords & Supabase Auth
        .single();

      if (queryError || !data) {
        throw new Error('Invalid email or password');
      }

      // Store user session in localStorage for this demo
      localStorage.setItem('carthive_user', JSON.stringify(data));
      
      // Success! Redirect to admin
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#f8fafc' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem', background: 'white', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
        <Link to={fromStore ? `/${fromStore}` : "/"} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> back to {fromStore ? 'store' : 'CartHive'}
        </Link>
        
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Admin <span className="gradient-text">Login</span></h2>
        <p style={{ color: '#64748b', marginBottom: '2.5rem' }}>Manage your store, products, and orders.</p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '15px', marginBottom: '2rem', display: 'flex', gap: '0.75rem', fontSize: '0.9rem', alignItems: 'center' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Mail size={16} /> email address
            </label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="admin@yourstore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Lock size={16} /> password
            </label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-shop-dark" 
            style={{ width: '100%', padding: '1rem', borderRadius: '15px', fontWeight: '700', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
            disabled={loading}
          >
            {loading ? 'signing in...' : <><LogIn size={20} /> sign in</>}
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
          Need an account? Contact CartHive support to register your business.
        </div>
      </div>
    </div>
  );
};

export default Login;
