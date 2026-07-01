import React, { useContext, useState } from 'react';
import Layout from '../components/Common/Layout';
import { AuthContext } from '../context/AuthContext';
import { User, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!name.trim() || !email.trim()) {
      setError('Name and Email cannot be empty');
      return;
    }

    if (password && password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const updateData = { name, email };
    if (password) {
      updateData.password = password;
    }

    const result = await updateProfile(updateData);
    setLoading(false);

    if (result.success) {
      setMessage('Profile updated successfully');
      setPassword('');
      setConfirmPassword('');
    } else {
      setError(result.message);
    }
  };

  return (
    <Layout>
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>My Profile</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Maintain your administrator credentials and accounts security settings.</p>
        </div>

        {error && (
          <div style={{ 
            padding: '0.75rem 1rem', 
            backgroundColor: 'var(--danger-light)', 
            color: 'var(--danger)', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '0.85rem',
            fontWeight: 550,
            border: '1px solid rgba(239, 68, 68, 0.15)'
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
            fontWeight: 550,
            border: '1px solid rgba(16, 185, 129, 0.15)'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            <User size={18} style={{ color: 'var(--primary)' }} />
            Account Information
          </h3>

          {/* Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} style={{ color: 'var(--primary)' }} />
            Security & Password
          </h3>
          
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '-0.5rem' }}>Leave fields blank if you do not wish to update your password.</p>

          {/* New Password */}
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="form-control" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
};

export default Profile;
