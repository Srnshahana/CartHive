import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { User, Lock, Mail, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';

const CustomerLogin = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        // Sign Up
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              role: 'customer' // Optional: distinguish role in auth metadata
            }
          }
        });

        if (authError) throw authError;

        // Upsert into customers table
        if (authData?.user) {
          const { error: profileError } = await supabase
            .from('customers')
            .upsert({
              id: authData.user.id,
              email: formData.email,
              full_name: formData.fullName
            });
            
          if (profileError) {
            console.error('Profile creation error:', profileError);
            // Non-fatal, they are still signed up
          }
        }
      } else {
        // Sign In
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;
      }

      // Success, redirect to account dashboard
      navigate(`/${slug}/account`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#f8fafc' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem', background: 'white', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
        <Link to={`/${slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> back to store
        </Link>

        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>
          {isSignUp ? 'Create' : 'Customer'} <span className="gradient-text">{isSignUp ? 'Account' : 'Login'}</span>
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2.5rem' }}>
          {isSignUp ? 'Join to track orders and save your favorites.' : 'Log in to your customer account.'}
        </p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '15px', marginBottom: '2rem', display: 'flex', gap: '0.75rem', fontSize: '0.9rem', alignItems: 'center' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {isSignUp && (
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}>
                <User size={16} /> full name
              </label>
              <input
                required
                type="text"
                placeholder="Jane Doe"
                className="form-input"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          )}

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}>
              <Mail size={16} /> email address
            </label>
            <input
              required
              type="email"
              placeholder="customer@example.com"
              className="form-input"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}>
              <Lock size={16} /> password
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="form-input"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155', fontWeight: '600' }}>
                <Lock size={16} /> confirm password
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="form-input"
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="btn-shop-dark" 
            style={{ width: '100%', padding: '1rem', borderRadius: '15px', fontWeight: '700', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
          >
            {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? 'create account' : 'sign in')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem' }}>
          <span style={{ color: '#64748b' }}>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
          </span>
          <button onClick={() => setIsSignUp(!isSignUp)} style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: '800', cursor: 'pointer', padding: 0 }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '8px' }}>Not a customer?</p>
          <Link to="/login" state={{ fromStore: slug }} style={{ fontSize: '0.85rem', fontWeight: '700', color: '#3b82f6', textDecoration: 'none' }}>
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
