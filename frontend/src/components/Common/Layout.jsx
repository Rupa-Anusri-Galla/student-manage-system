import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="main-layout">
      {/* Sidebar backdrop blur overlay for tablets & mobiles */}
      {sidebarOpen && (
        <div 
          onClick={closeSidebar} 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            zIndex: 95,
            backdropFilter: 'blur(2px)',
            transition: 'opacity 0.3s ease'
          }}
          className="sidebar-overlay"
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      
      <div className="content-wrapper">
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content">
          {children}
        </main>
      </div>
      
      <style>{`
        @media (min-width: 769px) {
          .sidebar-overlay {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
