import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LayoutDashboard, Users, UserPlus, User, Settings, LogOut, GraduationCap } from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeSidebar();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Student List', path: '/students', icon: <Users size={18} /> },
    { name: 'Add Student', path: '/add-student', icon: <UserPlus size={18} /> },
    { name: 'My Profile', path: '/profile', icon: <User size={18} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <GraduationCap size={28} />
        <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>EduManage</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="sidebar-footer">
          <div className="sidebar-profile">
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--primary)', 
              fontWeight: '700',
              fontSize: '1rem',
              border: '1px solid var(--border-color)'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-profile-info">
              <div className="sidebar-profile-name">{user.name}</div>
              <div className="sidebar-profile-role">Administrator</div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout} 
            className="sidebar-item" 
            style={{ 
              marginTop: '0.75rem', 
              width: '100%', 
              border: 'none', 
              background: 'none',
              cursor: 'pointer',
              color: 'var(--danger)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '500',
              fontFamily: 'inherit',
              transition: 'var(--transition)'
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
