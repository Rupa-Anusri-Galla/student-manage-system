import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight, User } from 'lucide-react';

const RecentStudents = ({ students }) => {
  return (
    <div className="card animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Recently Added Students</h3>
        <Link to="/students" style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {students && students.length > 0 ? (
          students.map((student) => (
            <div 
              key={student._id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                transition: 'var(--transition)'
              }}
              className="recent-student-row"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {student.profilePhoto ? (
                  <img 
                    src={student.profilePhoto} 
                    alt={student.fullName} 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                  />
                ) : (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <User size={18} />
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{student.fullName}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{student.rollNumber} • {student.department}</span>
                </div>
              </div>

              <Link 
                to={`/students/${student._id}`} 
                className="btn btn-secondary" 
                style={{ padding: '0.375rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Eye size={12} /> View
              </Link>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No students registered yet.
          </div>
        )}
      </div>
      <style>{`
        .recent-student-row:hover {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};

export default RecentStudents;
