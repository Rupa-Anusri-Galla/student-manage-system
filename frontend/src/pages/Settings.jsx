import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Common/Layout';
import { AuthContext } from '../context/AuthContext';
import { Palette, LogOut, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'classic');
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'classic') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout>
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>System Settings</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Configure local interface themes and global preferences.</p>
        </div>

        {/* Theme Preferences */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            <Palette size={18} style={{ color: 'var(--primary)' }} />
            Visual Interface Theme
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '-0.5rem' }}>Select a color palette theme for your workspace:</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            {/* Classic Blue */}
            <div 
              onClick={() => setTheme('classic')} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.875rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: theme === 'classic' ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                border: `1px solid ${theme === 'classic' ? 'var(--primary)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 650, color: theme === 'classic' ? 'var(--primary)' : 'var(--text-primary)' }}>Classic Blue (Default)</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Gentle gray background with high-contrast blue components</span>
              </div>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--primary)', backgroundColor: theme === 'classic' ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {theme === 'classic' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />}
              </div>
            </div>

            {/* Beige Harmony */}
            <div 
              onClick={() => setTheme('beige')} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.875rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: theme === 'beige' ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                border: `1px solid ${theme === 'beige' ? 'var(--primary)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 650, color: theme === 'beige' ? 'var(--primary)' : 'var(--text-primary)' }}>Beige Harmony</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Classic warm palette with soft brown elements and cream backgrounds</span>
              </div>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--primary)', backgroundColor: theme === 'beige' ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {theme === 'beige' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />}
              </div>
            </div>

            {/* Slate Minimalist */}
            <div 
              onClick={() => setTheme('slate')} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.875rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: theme === 'slate' ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                border: `1px solid ${theme === 'slate' ? 'var(--primary)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 650, color: theme === 'slate' ? 'var(--primary)' : 'var(--text-primary)' }}>Slate Dark Mode</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sleek dark theme styled in deep navy-slate colors</span>
              </div>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--primary)', backgroundColor: theme === 'slate' ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {theme === 'slate' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />}
              </div>
            </div>

          </div>
        </div>

        {/* Administration Preferences */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldAlert size={18} style={{ color: 'var(--danger)' }} />
            Administration Controls
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '-0.5rem' }}>End your current administrative session:</p>
          
          <div>
            <button onClick={handleLogout} className="btn btn-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <LogOut size={16} /> Logout from EduManage
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Settings;
