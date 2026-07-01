import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap } from 'lucide-react';
import '../App.css';

const SplashScreen = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (user) {
          navigate('/dashboard');
        } else {
          navigate('/welcome');
        }
      }, 2000); // 2s duration for smooth intro
      return () => clearTimeout(timer);
    }
  }, [user, loading, navigate]);

  return (
    <div className="splash-container">
      <div className="splash-bg-blob splash-blob-1"></div>
      <div className="splash-bg-blob splash-blob-2"></div>
      
      <div className="splash-logo-container">
        <GraduationCap size={72} className="splash-logo" />
        <h1 className="splash-title">EduManage</h1>
        <p className="splash-subtitle">Student Management System</p>
      </div>

      <div style={{ position: 'absolute', bottom: '10%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }} className="animate-fade">
        <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--primary-light)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '50%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '2px', animation: 'pulse-slow 1.5s infinite ease-in-out' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
