import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import StatsCards from '../../components/admin/StatsCards';
import RecentActivities from '../../components/admin/RecentActivities';
import QuickActions from '../../components/admin/QuickActions';
import { getMenuItemsByRole } from '../../utils/menuConfig';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = getMenuItemsByRole(user?.role, '/dashboard');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar 
        menuItems={menuItems} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userRole={user?.role}
      />
      
      <div className="flex-1 lg:ml-64">
        <Header 
          user={user} 
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={logout}
        />
        
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Welcome back, {user?.name}! Here's what's happening at your school.
              </p>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Recent Activities */}
              <div className="lg:col-span-2">
                <RecentActivities />
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
