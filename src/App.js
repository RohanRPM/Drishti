// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProjectDashboard from './pages/ProjectDashboard';
import DataEntryAndUpload from './pages/DataEntryAndUpload';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProjectMonitoringDashboard from './pages/ProjectMonitoringDashboard';
import AdminControlPanel from './pages/AdminControlPanel';
import Layout from './components/Layout';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/project-dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <ProjectDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/data-entry-upload"
          element={
            <PrivateRoute>
              <Layout>
                <DataEntryAndUpload project={{/* mock project data */ }} onUpdate={() => { }} />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-control-panel"
          element={
            <PrivateRoute roles={['Admin']}>
              <Layout>
                <AdminControlPanel />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/project-monitoring-dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <ProjectMonitoringDashboard />
              </Layout>
            </PrivateRoute>
          }
        />


        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
