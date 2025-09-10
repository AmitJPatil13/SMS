import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, Input, Modal, Badge } from '../components/ui';

const ExamsPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    const mockExams = [
      { id: 1, name: 'Midterm Mathematics', subject: 'Mathematics', class: 'Grade 10A', date: '2024-01-15', time: '09:00', duration: '2 hours', totalMarks: 100, status: 'Scheduled' },
      { id: 2, name: 'Physics Test', subject: 'Physics', class: 'Grade 10A', date: '2024-01-18', time: '10:00', duration: '1.5 hours', totalMarks: 75, status: 'Completed' },
      { id: 3, name: 'Chemistry Quiz', subject: 'Chemistry', class: 'Grade 11A', date: '2024-01-20', time: '11:00', duration: '1 hour', totalMarks: 50, status: 'Scheduled' },
      { id: 4, name: 'English Literature', subject: 'English', class: 'Grade 10B', date: '2024-01-22', time: '14:00', duration: '2.5 hours', totalMarks: 100, status: 'Ongoing' }
    ];
    setExams(mockExams);
  }, []);

  const getMenuItems = () => [
    { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
    { name: 'Students', href: '/students', icon: 'Users', current: false },
    { name: 'Teachers', href: '/teachers', icon: 'UserCheck', current: false },
    { name: 'Classes', href: '/classes', icon: 'BookOpen', current: false },
    { name: 'Subjects', href: '/subjects', icon: 'Book', current: false },
    { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
    { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
    { name: 'Exams', href: '/exams', icon: 'FileText', current: true },
    { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false },
    { name: 'Settings', href: '/settings', icon: 'Settings', current: false }
  ];

  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedClass === 'all' || exam.class === selectedClass)
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return 'blue';
      case 'Ongoing': return 'yellow';
      case 'Completed': return 'green';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={getMenuItems()} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="main-content flex-1">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Exams Management</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Create exams, manage schedules, and enter marks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Exams</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{exams.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{exams.filter(e => e.status === 'Scheduled').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ongoing</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{exams.filter(e => e.status === 'Ongoing').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{exams.filter(e => e.status === 'Completed').length}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <Input
                    type="text"
                    placeholder="Search exams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Classes</option>
                    <option value="Grade 10A">Grade 10A</option>
                    <option value="Grade 10B">Grade 10B</option>
                    <option value="Grade 11A">Grade 11A</option>
                  </select>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">Create Exam</Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Exam</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Marks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredExams.map((exam) => (
                      <tr key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{exam.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{exam.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{exam.class}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{new Date(exam.date).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{exam.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{exam.duration}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{exam.totalMarks}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge color={getStatusColor(exam.status)}>{exam.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">Edit</button>
                            <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300">Grade</button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExamsPage;
