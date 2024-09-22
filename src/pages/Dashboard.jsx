// src/pages/Dashboard.jsx
import React from 'react';
// import { Link } from 'react-router-dom';
import ProjectDashboard from './ProjectDashboard';
// import logo from '../assets/logo.png';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {/* <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 flex items-center">
          <img src={logo} alt="Drishti Logo" className="h-8 mr-2" />
          <span className="font-bold text-lg">Drishti</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">Home</Link>
          <Link to="/project-dashboard" className="block p-2 rounded hover:bg-gray-700">Project Dashboard</Link>
          <Link to="/data-entry-upload" className="block p-2 rounded hover:bg-gray-700">Data Entry & Upload</Link>
          <Link to="/profile" className="block p-2 rounded hover:bg-gray-700">Profile</Link>
        </nav>
      </div> */}
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <ProjectDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
