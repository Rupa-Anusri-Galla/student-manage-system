import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="card stat-card animate-scale" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="stat-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span className="stat-label" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          {title}
        </span>
        <span className="stat-val" style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
          {value}
        </span>
      </div>
      <div 
        className="stat-icon-wrapper" 
        style={{ 
          width: '46px',
          height: '46px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `var(--${color}-light)`, 
          color: `var(--${color})` 
        }}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
