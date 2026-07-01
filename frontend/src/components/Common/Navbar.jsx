import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Menu, X, LogOut, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
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
    <nav className="navbar animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={toggleSidebar} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '0.5rem', 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }} 
          className="menu-toggle-btn"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div className="navbar-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'var(--bg-tertiary)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
          <button 
            onClick={() => setTheme('classic')} 
            className="btn" 
            style={{ 
              padding: '0.35rem 0.75rem', 
              fontSize: '0.75rem', 
              borderRadius: 'var(--radius-sm)', 
              background: theme === 'classic' ? 'var(--bg-secondary)' : 'transparent', 
              color: theme === 'classic' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: theme === 'classic' ? 'var(--shadow-sm)' : 'none',
              fontWeight: 600
            }}
          >
            Blue
          </button>
          <button 
            onClick={() => setTheme('beige')} 
            className="btn" 
            style={{ 
              padding: '0.35rem 0.75rem', 
              fontSize: '0.75rem', 
              borderRadius: 'var(--radius-sm)', 
              background: theme === 'beige' ? 'var(--bg-secondary)' : 'transparent', 
              color: theme === 'beige' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: theme === 'beige' ? 'var(--shadow-sm)' : 'none',
              fontWeight: 600
            }}
          >
            Beige
          </button>
          <button 
            onClick={() => setTheme('slate')} 
            className="btn" 
            style={{ 
              padding: '0.35rem 0.75rem', 
              fontSize: '0.75rem', 
              borderRadius: 'var(--radius-sm)', 
              background: theme === 'slate' ? 'var(--bg-secondary)' : 'transparent', 
              color: theme === 'slate' ? 'var(--primary)' : 'var(--text-secondary)',
              boxShadow: theme === 'slate' ? 'var(--shadow-sm)' : 'none',
              fontWeight: 600
            }}
          >
            Slate
          </button>
        </div>
        
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'inline-block' }} className="navbar-username">
              Hi, <strong>{user.name}</strong>
            </span>
            <button 
              onClick={handleLogout} 
              className="btn btn-secondary" 
              style={{ 
                padding: '0.5rem', 
                borderRadius: '50%', 
                width: '34px', 
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 480px) {
          .navbar-username {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
