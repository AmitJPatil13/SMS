



import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, Input, Badge } from '../components/ui';

const AttendancePage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('Grade 10A');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    const mockStudents = [
      { id: 1, name: 'Alice Johnson', rollNumber: 'STU001', class: 'Grade 10A' },
      { id: 2, name: 'Bob Smith', rollNumber: 'STU002', class: 'Grade 10A' },
      { id: 3, name: 'Carol Davis', rollNumber: 'STU003', class: 'Grade 10A' },
      { id: 4, name: 'David Wilson', rollNumber: 'STU004', class: 'Grade 10A' },
      { id: 5, name: 'Emma Brown', rollNumber: 'STU005', class: 'Grade 10A' },
      { id: 6, name: 'Frank Miller', rollNumber: 'STU006', class: 'Grade 10B' },
      { id: 7, name: 'Grace Lee', rollNumber: 'STU007', class: 'Grade 10B' },
      { id: 8, name: 'Henry Taylor', rollNumber: 'STU008', class: 'Grade 10B' }
    ];
    setStudents(mockStudents);

    // Mock attendance records
    const mockAttendance = [
      { id: 1, studentId: 1, date: selectedDate, status: 'Present', time: '08:30' },
      { id: 2, studentId: 2, date: selectedDate, status: 'Present', time: '08:32' },
      { id: 3, studentId: 3, date: selectedDate, status: 'Absent', time: null },
      { id: 4, studentId: 4, date: selectedDate, status: 'Late', time: '09:15' },
      { id: 5, studentId: 5, date: selectedDate, status: 'Present', time: '08:28' }
    ];
    setAttendanceRecords(mockAttendance);
  }, [selectedDate]);

  const getMenuItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
      { name: 'Students', href: '/students', icon: 'Users', current: false },
      { name: 'Teachers', href: '/teachers', icon: 'UserCheck', current: false },
      { name: 'Classes', href: '/classes', icon: 'BookOpen', current: false },
      { name: 'Subjects', href: '/subjects', icon: 'Book', current: false },
      { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
      { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: true },
      { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
      { name: 'Notifications', href: '/notifications', icon: 'Bell', current: false },
      { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false },
      { name: 'Settings', href: '/settings', icon: 'Settings', current: false }
    ];

    if (user?.role === 'teacher') {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
        { name: 'My Classes', href: '/my-classes', icon: 'BookOpen', current: false },
        { name: 'Students', href: '/students', icon: 'Users', current: false },
        { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: true },
        { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
        { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
        { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false },
        { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false }
      ];
    }

    if (user?.role === 'student') {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
        { name: 'My Classes', href: '/my-classes', icon: 'BookOpen', current: false },
        { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: true },
        { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
        { name: 'Results', href: '/results', icon: 'Award', current: false },
        { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
        { name: 'Assignments', href: '/assignments', icon: 'FileText', current: false },
        { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false }
      ];
    }

    if (user?.role === 'parent') {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
        { name: 'My Children', href: '/children', icon: 'Users', current: false },
        { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: true },
        { name: 'Results', href: '/results', icon: 'Award', current: false },
        { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
        { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false },
        { name: 'Fees', href: '/fees', icon: 'CreditCard', current: false },
        { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  const filteredStudents = students.filter(student => 
    student.class === selectedClass && 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceChange = (studentId, status) => {
    const existingRecord = attendanceRecords.find(record => 
      record.studentId === studentId && record.date === selectedDate
    );

    if (existingRecord) {
      setAttendanceRecords(attendanceRecords.map(record => 
        record.id === existingRecord.id 
          ? { ...record, status, time: status === 'Present' || status === 'Late' ? new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : null }
          : record
      ));
    } else {
      const newRecord = {
        id: attendanceRecords.length + 1,
        studentId,
        date: selectedDate,
        status,
        time: status === 'Present' || status === 'Late' ? new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : null
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }
  };

  const getAttendanceStatus = (studentId) => {
    const record = attendanceRecords.find(record => 
      record.studentId === studentId && record.date === selectedDate
    );
    return record ? record.status : 'Not Marked';
  };

  const getAttendanceTime = (studentId) => {
    const record = attendanceRecords.find(record => 
      record.studentId === studentId && record.date === selectedDate
    );
    return record ? record.time : null;
  };

  const getAttendanceStats = () => {
    const classStudents = students.filter(s => s.class === selectedClass);
    const presentCount = classStudents.filter(s => getAttendanceStatus(s.id) === 'Present').length;
    const absentCount = classStudents.filter(s => getAttendanceStatus(s.id) === 'Absent').length;
    const lateCount = classStudents.filter(s => getAttendanceStatus(s.id) === 'Late').length;
    const notMarkedCount = classStudents.filter(s => getAttendanceStatus(s.id) === 'Not Marked').length;
    
    return { presentCount, absentCount, lateCount, notMarkedCount, total: classStudents.length };
  };

  const stats = getAttendanceStats();
  const classes = ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A', 'Grade 12B'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar 
        menuItems={menuItems} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userRole={user?.role}
      />
      
      <div className="main-content flex-1">
        <Header 
          user={user} 
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={logout}
        />
        
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance Management</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Mark and track student attendance records.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Present</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.presentCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                    <span className="text-2xl">❌</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Absent</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.absentCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Late</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.lateCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Not Marked</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.notMarkedCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <Input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Mark All Present
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Attendance
                  </Button>
                </div>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Roll Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredStudents.map((student) => {
                      const status = getAttendanceStatus(student.id);
                      const time = getAttendanceTime(student.id);
                      
                      return (
                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{student.rollNumber}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              color={
                                status === 'Present' ? 'green' : 
                                status === 'Absent' ? 'red' : 
                                status === 'Late' ? 'yellow' : 'gray'
                              }
                            >
                              {status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{time || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleAttendanceChange(student.id, 'Present')}
                                className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                              >
                                Present
                              </button>
                              <button
                                onClick={() => handleAttendanceChange(student.id, 'Absent')}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                              >
                                Absent
                              </button>
                              <button
                                onClick={() => handleAttendanceChange(student.id, 'Late')}
                                className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
                              >
                                Late
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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

export default AttendancePage;
