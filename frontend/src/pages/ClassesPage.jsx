import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard, Input, Modal, Badge } from '../components/ui';
import { getMenuItemsByRole } from '../utils/menuConfig';

const ClassesPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockClasses = [
      { id: 1, name: 'Grade 10A', section: 'A', capacity: 30, currentStudents: 28, room: 'Room 101', classTeacher: 'Dr. Sarah Johnson', subjects: ['Mathematics', 'Physics', 'Chemistry'], status: 'Active' },
      { id: 2, name: 'Grade 10B', section: 'B', capacity: 30, currentStudents: 25, room: 'Room 102', classTeacher: 'Mr. Michael Brown', subjects: ['Mathematics', 'Biology', 'Chemistry'], status: 'Active' },
      { id: 3, name: 'Grade 11A', section: 'A', capacity: 25, currentStudents: 22, room: 'Room 201', classTeacher: 'Ms. Emily Davis', subjects: ['Mathematics', 'Physics', 'Computer Science'], status: 'Active' }
    ];
    setClasses(mockClasses);
  }, []);

  const menuItems = getMenuItemsByRole(user?.role, '/classes');

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="flex-1 lg:ml-64">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Classes Management</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Manage classes, sections, and student assignments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Classes</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{classes.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {classes.reduce((acc, cls) => acc + cls.currentStudents, 0)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <Input
                  type="text"
                  placeholder="Search classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Add Class</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((classData) => (
                <Card key={classData.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{classData.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Section {classData.section}</p>
                    </div>
                    <Badge variant={classData.status === 'Active' ? 'success' : 'danger'} dot={classData.status === 'Active'}>{classData.status}</Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-20">Room:</span>
                      <span>{classData.room}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-20">Teacher:</span>
                      <span>{classData.classTeacher}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-20">Students:</span>
                      <span>{classData.currentStudents}/{classData.capacity}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {classData.subjects.map((subject, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-3">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(classData.currentStudents / classData.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 text-sm">Edit</button>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 text-sm">Delete</button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassesPage;
