import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Import Pages
import SplashScreen from './pages/SplashScreen';
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import StudentDetails from './pages/StudentDetails';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Protected Route Wrapper Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-color)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'pulse-slow 1s infinite ease-in-out',
          }}
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router basename="/student-manage-system">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <StudentList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-student"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students/:id"
            element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students/:id/edit"
            element={
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
export { ProtectedRoute };