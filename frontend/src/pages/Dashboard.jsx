import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import TeacherDashboard from './teacher/TeacherDashboard';
import StudentDashboard from './student/StudentDashboard';
import ParentDashboard from './parent/ParentDashboard';

const Dashboard = () => {
  const { user, hasRole } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Render different dashboards based on user role
  if (hasRole('admin')) {
    return <AdminDashboard />;
  } else if (hasRole('teacher')) {
    return <TeacherDashboard />;
  } else if (hasRole('student')) {
    return <StudentDashboard />;
  } else if (hasRole('parent')) {
    return <ParentDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this dashboard.</p>
      </div>
    </div>
  );
};

export default Dashboard;
