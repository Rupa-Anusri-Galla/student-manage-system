import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import '../App.css';

const NotFound = () => {
  return (
    <div className="auth-container animate-fade">
      <div className="auth-card" style={{ textAlign: 'center', alignItems: 'center' }}>
        <HelpCircle size={64} style={{ color: 'var(--primary)', marginBottom: '1.5rem', animation: 'pulse-slow 2s infinite ease-in-out' }} />
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>Page Not Found</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The page you are looking for doesn't exist, was moved, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
