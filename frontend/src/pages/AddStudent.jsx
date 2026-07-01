import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Common/Layout';
import StudentForm from '../components/Students/StudentForm';
import studentService from '../services/studentService';

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const res = await studentService.createStudent(formData);
      if (res.success) {
        navigate('/students');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register student record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>Register Student</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fill in all required fields to register a student in the directory.</p>
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

        <StudentForm 
          onSubmit={handleSubmit} 
          submitText="Register Student" 
          loading={loading} 
        />
      </div>
    </Layout>
  );
};

export default AddStudent;
