import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, User } from 'lucide-react';

const StudentRow = ({ student, onDelete }) => {
  return (
    <tr>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {student.profilePhoto ? (
            <img 
              src={student.profilePhoto} 
              alt={student.fullName} 
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
            />
          ) : (
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <User size={16} />
            </div>
          )}
          <span style={{ fontWeight: 650, color: 'var(--text-primary)' }}>{student.fullName}</span>
        </div>
      </td>
      <td>{student.rollNumber}</td>
      <td style={{ fontSize: '0.85rem' }}>{student.email}</td>
      <td>{student.phoneNumber}</td>
      <td>
        <span className="badge badge-primary">{student.department}</span>
      </td>
      <td>{student.year}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Link 
            to={`/students/${student._id}`} 
            className="btn btn-secondary" 
            style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)', display: 'flex' }}
            title="View Details"
          >
            <Eye size={14} />
          </Link>
          <Link 
            to={`/students/${student._id}/edit`} 
            className="btn btn-secondary" 
            style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)', color: 'var(--primary)', display: 'flex' }}
            title="Edit Record"
          >
            <Edit size={14} />
          </Link>
          <button 
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${student.fullName}?`)) {
                onDelete(student._id);
              }
            }} 
            className="btn btn-secondary" 
            style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)', color: 'var(--danger)', display: 'flex' }}
            title="Delete Record"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;
