import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard, Badge } from '../components/ui';
import { getMenuItemsByRole } from '../utils/menuConfig';

const ChildrenPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  const menuItems = getMenuItemsByRole(user?.role, '/children');

  useEffect(() => {
    const mockChildren = [
      {
        id: 1,
        name: 'Alice Johnson',
        rollNo: 'STU001',
        class: 'Grade 10A',
        section: 'A',
        age: 15,
        dateOfBirth: '2009-03-15',
        attendance: 95,
        overallGrade: 'A',
        avgScore: 88,
        classTeacher: 'Ms. Emily Davis',
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'],
        recentGrades: [
          { subject: 'Mathematics', score: 92, grade: 'A+' },
          { subject: 'Physics', score: 85, grade: 'A' },
          { subject: 'Chemistry', score: 88, grade: 'A' },
          { subject: 'English', score: 90, grade: 'A+' },
          { subject: 'Biology', score: 86, grade: 'A' }
        ],
        upcomingEvents: [
          { type: 'Exam', title: 'Mathematics Mid-term', date: '2024-10-25' },
          { type: 'Assignment', title: 'Physics Lab Report', date: '2024-10-22' }
        ]
      },
      {
        id: 2,
        name: 'Bob Johnson',
        rollNo: 'STU015',
        class: 'Grade 8B',
        section: 'B',
        age: 13,
        dateOfBirth: '2011-07-22',
        attendance: 92,
        overallGrade: 'B+',
        avgScore: 82,
        classTeacher: 'Mr. John Anderson',
        subjects: ['Mathematics', 'Science', 'English', 'History', 'Art'],
        recentGrades: [
          { subject: 'Mathematics', score: 85, grade: 'A' },
          { subject: 'Science', score: 80, grade: 'B+' },
          { subject: 'English', score: 82, grade: 'A-' },
          { subject: 'History', score: 78, grade: 'B+' },
          { subject: 'Art', score: 88, grade: 'A' }
        ],
        upcomingEvents: [
          { type: 'Event', title: 'Science Fair', date: '2024-10-28' },
          { type: 'Assignment', title: 'History Project', date: '2024-10-30' }
        ]
      }
    ];
    setChildren(mockChildren);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="flex-1 lg:ml-64">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Children</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">View and manage information about your children enrolled in school.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-lg">
                    <span className="text-2xl">👶</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Children</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{children.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Attendance</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {Math.round(children.reduce((sum, child) => sum + child.attendance, 0) / children.length)}%
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Performance</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {Math.round(children.reduce((sum, child) => sum + child.avgScore, 0) / children.length)}%
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {children.map((child) => (
                <Card key={child.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-16 w-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {child.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{child.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{child.class} - Roll No: {child.rollNo}</p>
                      </div>
                    </div>
                    <Badge color="green">Active</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Age</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{child.age} years</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Class Teacher</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{child.classTeacher}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Attendance</p>
                      <p className="text-sm font-medium text-green-600">{child.attendance}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Overall Grade</p>
                      <Badge color="green">{child.overallGrade}</Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Average Score</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{child.avgScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${child.avgScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Grades</p>
                    <div className="space-y-2">
                      {child.recentGrades.slice(0, 3).map((grade, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 dark:text-gray-400">{grade.subject}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">{grade.score}%</span>
                            <Badge color="green" className="text-xs">{grade.grade}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {child.upcomingEvents.length > 0 && (
                    <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">⏰ Upcoming Events</p>
                      {child.upcomingEvents.map((event, index) => (
                        <div key={index} className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span className="font-medium">{event.type}:</span> {event.title} - {event.date}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedChild(child)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    >
                      View Details
                    </Button>
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm">
                      Contact Teacher
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {selectedChild && (
              <Card className="p-6 mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detailed Information - {selectedChild.name}</h2>
                  <Button onClick={() => setSelectedChild(null)} className="bg-gray-500 hover:bg-gray-600 text-white text-sm">
                    Close
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Full Name:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedChild.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Roll Number:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedChild.rollNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Class:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedChild.class}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Date of Birth:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedChild.dateOfBirth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Class Teacher:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedChild.classTeacher}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Academic Performance</h3>
                    <div className="space-y-3">
                      {selectedChild.recentGrades.map((grade, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-gray-700 dark:text-gray-300">{grade.subject}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-blue-600">{grade.score}%</span>
                            <Badge color="green">{grade.grade}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enrolled Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedChild.subjects.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {children.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">👶</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Children Found</h3>
                <p className="text-gray-500 dark:text-gray-400">You don't have any children registered in the system.</p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChildrenPage;
