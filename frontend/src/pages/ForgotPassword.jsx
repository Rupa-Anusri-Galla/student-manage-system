import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import '../App.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email.trim() || !newPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.forgotPassword(email, newPassword);
      setLoading(false);
      if (res.success) {
        setMessage(res.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to reset password. Please check your email.');
    }
  };

  return (
    <div className="auth-container animate-fade">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-brand">
            <GraduationCap size={32} />
            <span>EduManage</span>
          </div>
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">Provide email details to update password credentials</p>
        </div>

        {error && (
          <div style={{ 
            padding: '0.75rem 1rem', 
            backgroundColor: 'var(--danger-light)', 
            color: 'var(--danger)', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '0.85rem', 
            marginBottom: '1.25rem',
            fontWeight: 550
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ 
            padding: '0.75rem 1rem', 
            backgroundColor: 'var(--success-light)', 
            color: 'var(--success)', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '0.85rem', 
            marginBottom: '1.25rem',
            fontWeight: 550
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Admin Email Address</label>
            <input 
              type="email" 
              placeholder="admin@university.com" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="form-control" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
            {loading ? 'Updating Password...' : 'Reset Password'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 550 }}>
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
