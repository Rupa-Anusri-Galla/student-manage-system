import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Common/Layout';
import StudentForm from '../components/Students/StudentForm';
import studentService from '../services/studentService';

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = async (formData) => {
    setSubmitLoading(true);
    setError('');
    try {
      const res = await studentService.updateStudent(id, formData);
      if (res.success) {
        navigate('/students');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student record');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'pulse-slow 1s infinite ease-in-out' }}></div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Loading student profile details...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>Modify Student Details</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Edit the fields below to update this student's profile information.</p>
        </div>

        {error && (
          <div style={{ 
            padding: '0.75rem 1rem', 
            backgroundColor: 'var(--danger-light)', 
            color: 'var(--danger)', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '0.85rem',
            fontWeight: 550,
            border: '1px solid rgba(239, 68, 68, 0.15)'
          }}>
            {error}
          </div>
        )}

        {student && (
          <StudentForm 
            initialData={student} 
            onSubmit={handleSubmit} 
            submitText="Update Student Profile" 
            loading={submitLoading} 
          />
        )}
      </div>
    </Layout>
  );
};

export default EditStudent;
