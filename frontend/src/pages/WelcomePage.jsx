import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, GraduationCap, Users, ShieldCheck, Cpu } from 'lucide-react';
import '../App.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container animate-fade">
      <div className="welcome-hero">
        <div className="welcome-info">
          <div className="welcome-badge">MERN Stack Platform</div>
          <h1 className="welcome-heading">
            Manage your student records <span>efficiently</span>.
          </h1>
          <p className="welcome-desc">
            EduManage is a production-ready Student Management System. Clean, secure authentication, dynamic statistics query, responsive layouts, and customizable theme settings.
          </p>
          <div className="welcome-actions">
            <Link to="/login" className="btn btn-primary" style={{ minWidth: '130px' }}>
              <LogIn size={18} /> Sign In
            </Link>
            <Link to="/register" className="btn btn-secondary" style={{ minWidth: '150px' }}>
              <UserPlus size={18} /> Register Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="welcome-illustration">
        <div className="welcome-vector-card">
          <GraduationCap size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>System Integrations</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Users size={16} style={{ color: 'var(--primary)' }} />
              Full Student CRUD & Search
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
              JWT + bcrypt Authentication
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Cpu size={16} style={{ color: 'var(--warning)' }} />
              Real-time Metrics Dashboard
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
