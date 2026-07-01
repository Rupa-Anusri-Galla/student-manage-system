import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Common/Layout';
import studentService from '../services/studentService';
import { ArrowLeft, Edit, User, Mail, Phone, Calendar, BookOpen, GraduationCap, MapPin } from 'lucide-react';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await studentService.getStudent(id);
        if (res.success) {
          setStudent(res.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load student record');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'pulse-slow 1s infinite ease-in-out' }}></div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Loading student file...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !student) {
    return (
      <Layout>
        <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', margin: '2rem auto' }}>
          <h3 style={{ color: 'var(--danger)' }}>Error Loading Record</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{error || 'Student not found.'}</p>
          <Link to="/students" className="btn btn-secondary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            <ArrowLeft size={16} style={{ marginRight: '0.25rem' }} /> Back to Directory
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Navigation / Action bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/students" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <ArrowLeft size={16} /> Back to Directory
          </Link>
          <Link to={`/students/${student._id}/edit`} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Edit size={16} /> Edit Student
          </Link>
        </div>

        {/* Profile Card Info */}
        <div className="card profile-details-card" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2.5rem', padding: '2.5rem' }}>
          
          {/* Avatar side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', borderRight: '1px solid var(--border-color)', paddingRight: '2rem' }} className="avatar-side">
            {student.profilePhoto ? (
              <img 
                src={student.profilePhoto} 
                alt={student.fullName} 
                style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', boxShadow: 'var(--shadow-md)' }}
              />
            ) : (
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <User size={72} />
              </div>
            )}
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>{student.fullName}</h2>
              <span className="badge badge-primary" style={{ marginTop: '0.375rem' }}>{student.rollNumber}</span>
            </div>
          </div>

          {/* Details fields side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Academic Information */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '750', color: 'var(--text-secondary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.375rem' }}>
                <GraduationCap size={18} style={{ color: 'var(--primary)' }} />
                Academic Background
              </h3>
              <div className="grid grid-cols-2" style={{ gap: '1rem 2rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Department</span>
                  <strong style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{student.department}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Academic Year</span>
                  <strong style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{student.year}</strong>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '750', color: 'var(--text-secondary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.375rem' }}>
                <User size={18} style={{ color: 'var(--primary)' }} />
                Personal Profile
              </h3>
              <div className="grid grid-cols-2" style={{ gap: '1rem 2rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.925rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <Mail size={14} style={{ color: 'var(--text-muted)' }} />
                    {student.email}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Phone Number</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.925rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                    {student.phoneNumber}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Gender</span>
                  <strong style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{student.gender}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Date of Birth</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.925rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                    {formatDate(student.dateOfBirth)}
                  </span>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Residential Address</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.925rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
                    {student.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Parent / Guardian Information */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '750', color: 'var(--text-secondary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.375rem' }}>
                <BookOpen size={18} style={{ color: 'var(--primary)' }} />
                Parent / Guardian Details
              </h3>
              <div className="grid grid-cols-2" style={{ gap: '1rem 2rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Parent / Guardian Name</span>
                  <strong style={{ fontSize: '0.925rem', color: 'var(--text-primary)' }}>{student.parentName}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Parent Contact Phone</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.925rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                    {student.parentPhone}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .profile-details-card {
            grid-template-columns: 1fr !important;
            padding: 1.5rem !important;
          }
          .avatar-side {
            border-right: none !important;
            padding-right: 0 !important;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default StudentDetails;
