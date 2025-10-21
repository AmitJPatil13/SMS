import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard, Badge } from '../components/ui';
import { getMenuItemsByRole } from '../utils/menuConfig';

const MyClassesPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const menuItems = getMenuItemsByRole(user?.role, '/my-classes');

  useEffect(() => {
    const mockClasses = [
      { 
        id: 1, 
        name: 'Grade 10A - Mathematics', 
        subject: 'Mathematics', 
        grade: 'Grade 10A', 
        students: 28, 
        schedule: 'Mon, Wed, Fri - 9:00 AM',
        room: 'Room 101',
        avgPerformance: 85,
        nextClass: '2024-10-22 09:00',
        studentList: [
          { id: 1, name: 'Alice Johnson', rollNo: 'STU001', attendance: 95, grade: 88 },
          { id: 2, name: 'Bob Smith', rollNo: 'STU002', attendance: 88, grade: 82 },
          { id: 3, name: 'Carol Davis', rollNo: 'STU003', attendance: 92, grade: 90 }
        ]
      },
      { 
        id: 2, 
        name: 'Grade 10B - Mathematics', 
        subject: 'Mathematics', 
        grade: 'Grade 10B', 
        students: 25, 
        schedule: 'Tue, Thu - 10:00 AM',
        room: 'Room 102',
        avgPerformance: 78,
        nextClass: '2024-10-22 10:00',
        studentList: [
          { id: 4, name: 'David Wilson', rollNo: 'STU004', attendance: 85, grade: 75 },
          { id: 5, name: 'Emma Brown', rollNo: 'STU005', attendance: 90, grade: 80 }
        ]
      },
      { 
        id: 3, 
        name: 'Grade 11A - Advanced Math', 
        subject: 'Mathematics', 
        grade: 'Grade 11A', 
        students: 22, 
        schedule: 'Mon, Wed - 11:00 AM',
        room: 'Room 201',
        avgPerformance: 82,
        nextClass: '2024-10-22 11:00',
        studentList: [
          { id: 6, name: 'Frank Miller', rollNo: 'STU006', attendance: 94, grade: 85 },
          { id: 7, name: 'Grace Lee', rollNo: 'STU007', attendance: 88, grade: 78 }
        ]
      }
    ];
    setClasses(mockClasses);
  }, []);

  const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);
  const avgAttendance = Math.round(classes.reduce((sum, cls) => sum + cls.avgPerformance, 0) / classes.length);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="flex-1 lg:ml-64">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Classes</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">View and manage your assigned classes and students.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
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
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalStudents}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Performance</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{avgAttendance}%</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {classes.map((classData) => (
                <Card key={classData.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{classData.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{classData.grade}</p>
                    </div>
                    <Badge color="green">Active</Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-32">👥 Students:</span>
                      <span>{classData.students}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-32">📅 Schedule:</span>
                      <span>{classData.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-32">🚪 Room:</span>
                      <span>{classData.room}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-32">⏰ Next Class:</span>
                      <span>{new Date(classData.nextClass).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Average Performance</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{classData.avgPerformance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${classData.avgPerformance}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedClass(classData)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    >
                      View Students
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm">
                      Take Attendance
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {selectedClass && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedClass.name} - Student Roster</h2>
                  <Button onClick={() => setSelectedClass(null)} className="bg-gray-500 hover:bg-gray-600 text-white text-sm">
                    Close
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Roll No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Attendance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedClass.studentList.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{student.rollNo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{student.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.attendance >= 90 ? 'bg-green-100 text-green-800' :
                              student.attendance >= 75 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {student.attendance}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="font-semibold text-blue-600">{student.grade}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">View</button>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">Grade</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {classes.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Classes Found</h3>
                <p className="text-gray-500 dark:text-gray-400">You don't have any classes assigned yet.</p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyClassesPage;
