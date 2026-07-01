import React, { useEffect, useState } from 'react';
import Layout from '../components/Common/Layout';
import StatCard from '../components/Dashboard/StatCard';
import RecentStudents from '../components/Dashboard/RecentStudents';
import studentService from '../services/studentService';
import { Users, Search, BookOpen, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    maleStudents: 0,
    femaleStudents: 0,
    departmentsCount: 0,
    recentStudents: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await studentService.getStats();
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/students?search=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'pulse-slow 1s infinite ease-in-out' }}></div>
            <span>Gathering database records...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Dashboard Title & Quick Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>Dashboard Overview</h1>
            <p className="dashboard-subtitle">Monitor academic enrollments and statistics</p>
          </div>

          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%', maxWidth: '360px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by name, roll no..." 
              className="form-control" 
              style={{ paddingLeft: '2.5rem', borderRadius: '9999px', fontSize: '0.875rem' }}
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </form>
        </div>

        {/* Aggregated Stat Cards */}
        <div className="grid grid-cols-4">
          <StatCard 
            title="Total Students" 
            value={stats.totalStudents} 
            icon={<Users size={20} />} 
            color="primary" 
          />
          <StatCard 
            title="Male Students" 
            value={stats.maleStudents} 
            icon={<UserCheck size={20} />} 
            color="success" 
          />
          <StatCard 
            title="Female Students" 
            value={stats.femaleStudents} 
            icon={<UserCheck size={20} />} 
            color="warning" 
          />
          <StatCard 
            title="Departments" 
            value={stats.departmentsCount} 
            icon={<BookOpen size={20} />} 
            color="primary" 
          />
        </div>

        {/* Recent Additions List */}
        <div className="grid grid-cols-3" style={{ gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <RecentStudents students={stats.recentStudents} />
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>System Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={() => navigate('/add-student')} 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Register New Student
              </button>
              <button 
                onClick={() => navigate('/students')} 
                className="btn btn-secondary" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Browse Student Directory
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;
