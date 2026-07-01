import React, { useEffect, useState } from 'react';
import Layout from '../components/Common/Layout';
import StudentRow from '../components/Students/StudentRow';
import studentService from '../services/studentService';
import { Search, UserPlus, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const StudentList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';

  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState(initialSearch);
  const [gender, setGender] = useState('All');
  const [department, setDepartment] = useState('All');
  const [year, setYear] = useState('All');
  const [sort, setSort] = useState('createdAt:desc');
  const [showFilters, setShowFilters] = useState(false);

  // List of standard departments for quick filtering
  const [departmentsList, setDepartmentsList] = useState([
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology',
    'Business Administration',
  ]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 8,
        sort,
      };
      if (search.trim()) params.search = search.trim();
      if (gender !== 'All') params.gender = gender;
      if (department !== 'All') params.department = department;
      if (year !== 'All') params.year = year;

      const res = await studentService.getStudents(params);
      if (res.success) {
        setStudents(res.data);
        setTotal(res.total);
        setPages(res.pages);
      }
    } catch (err) {
      console.error('Failed to load student directory:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, gender, department, year, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    try {
      const res = await studentService.deleteStudent(id);
      if (res.success) {
        // Reload list
        fetchStudents();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete student record');
    }
  };

  return (
    <Layout>
      <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>Student Directory</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Browse, filter, and manage student enrollments</p>
          </div>
          <Link to="/add-student" className="btn btn-primary">
            <UserPlus size={16} /> Add Student
          </Link>
        </div>

        {/* Toolbar Section (Search & Filter Toggles) */}
        <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search by name, roll no or email..." 
                className="form-control" 
                style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" style={{ display: 'none' }}></button>
            </form>

            {/* Quick action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="btn btn-secondary" 
                style={{ padding: '0.625rem 1rem', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                <SlidersHorizontal size={14} /> Filters
              </button>

              <select 
                value={sort} 
                onChange={(e) => { setSort(e.target.value); setPage(1); }} 
                className="form-control" 
                style={{ width: '180px', padding: '0.5rem', fontSize: '0.825rem' }}
              >
                <option value="createdAt:desc">Newest Added</option>
                <option value="fullName:asc">Name: A to Z</option>
                <option value="fullName:desc">Name: Z to A</option>
                <option value="rollNumber:asc">Roll Number</option>
              </select>
            </div>
          </div>

          {/* Collapsible filter options panel */}
          {showFilters && (
            <div 
              className="animate-scale" 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '1rem', 
                borderTop: '1px solid var(--border-color)', 
                paddingTop: '1rem' 
              }}
            >
              {/* Filter by gender */}
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Gender</label>
                <select value={gender} onChange={(e) => { setGender(e.target.value); setPage(1); }} className="form-control" style={{ padding: '0.5rem', fontSize: '0.825rem' }}>
                  <option value="All">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Filter by department */}
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Department</label>
                <select value={department} onChange={(e) => { setDepartment(e.target.value); setPage(1); }} className="form-control" style={{ padding: '0.5rem', fontSize: '0.825rem' }}>
                  <option value="All">All Departments</option>
                  {departmentsList.map((dept, i) => (
                    <option key={i} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Filter by Year */}
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Academic Year</label>
                <select value={year} onChange={(e) => { setYear(e.target.value); setPage(1); }} className="form-control" style={{ padding: '0.5rem', fontSize: '0.825rem' }}>
                  <option value="All">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Directory Grid/Table view */}
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'pulse-slow 1s infinite ease-in-out' }}></div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Loading directory...</span>
            </div>
          </div>
        ) : students.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Roll Number</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Academic Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <StudentRow 
                      key={student._id} 
                      student={student} 
                      onDelete={handleDelete} 
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer bar */}
            {pages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  Showing <strong>{students.length}</strong> of <strong>{total}</strong> students
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
                    disabled={page === 1}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[...Array(pages)].map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setPage(i + 1)} 
                        className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ 
                          padding: '0.4rem 0.75rem', 
                          fontSize: '0.8rem', 
                          borderRadius: 'var(--radius-sm)',
                          minWidth: '32px'
                        }}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setPage((prev) => Math.min(prev + 1, pages))} 
                    disabled={page === pages}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <h3>No Records Found</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>We couldn't find any students matching your criteria.</p>
            <button 
              onClick={() => { setSearch(''); setGender('All'); setDepartment('All'); setYear('All'); }} 
              className="btn btn-secondary"
              style={{ marginTop: '1.25rem' }}
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
      <style>{`
        @media (max-width: 768px) {
          .table th:nth-child(3), .table td:nth-child(3),
          .table th:nth-child(4), .table td:nth-child(4),
          .table th:nth-child(6), .table td:nth-child(6) {
            display: none !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default StudentList;
