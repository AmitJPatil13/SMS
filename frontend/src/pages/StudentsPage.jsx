import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, Input, Modal, Badge } from '../components/ui';

const StudentsPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    class: '',
    rollNumber: '',
    address: '',
    parentName: '',
    parentPhone: '',
    dateOfBirth: '',
    admissionDate: ''
  });

  // Get menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
      { name: 'Students', href: '/students', icon: 'Users', current: true },
      { name: 'Teachers', href: '/teachers', icon: 'UserCheck', current: false },
      { name: 'Classes', href: '/classes', icon: 'BookOpen', current: false },
      { name: 'Subjects', href: '/subjects', icon: 'Book', current: false },
      { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
      { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
      { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
      { name: 'Notifications', href: '/notifications', icon: 'Bell', current: false },
      { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false },
      { name: 'Settings', href: '/settings', icon: 'Settings', current: false }
    ];

    if (user?.role === 'teacher') {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
        { name: 'My Classes', href: '/my-classes', icon: 'BookOpen', current: false },
        { name: 'Students', href: '/students', icon: 'Users', current: true },
        { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
        { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
        { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
        { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false },
        { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  // Mock data for demonstration
  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@school.com',
        phone: '+1-555-0123',
        class: 'Grade 10A',
        rollNumber: 'STU001',
        address: '123 Main St, City, State',
        parentName: 'John Johnson',
        parentPhone: '+1-555-0124',
        dateOfBirth: '2008-03-15',
        admissionDate: '2023-09-01',
        status: 'Active',
        attendance: 95
      },
      {
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@school.com',
        phone: '+1-555-0125',
        class: 'Grade 10B',
        rollNumber: 'STU002',
        address: '456 Oak Ave, City, State',
        parentName: 'Jane Smith',
        parentPhone: '+1-555-0126',
        dateOfBirth: '2008-07-22',
        admissionDate: '2023-09-01',
        status: 'Active',
        attendance: 88
      },
      {
        id: 3,
        name: 'Carol Davis',
        email: 'carol.davis@school.com',
        phone: '+1-555-0127',
        class: 'Grade 11A',
        rollNumber: 'STU003',
        address: '789 Pine St, City, State',
        parentName: 'Mike Davis',
        parentPhone: '+1-555-0128',
        dateOfBirth: '2007-11-08',
        admissionDate: '2022-09-01',
        status: 'Active',
        attendance: 92
      },
      {
        id: 4,
        name: 'David Wilson',
        email: 'david.wilson@school.com',
        phone: '+1-555-0129',
        class: 'Grade 9A',
        rollNumber: 'STU004',
        address: '321 Elm St, City, State',
        parentName: 'Sarah Wilson',
        parentPhone: '+1-555-0130',
        dateOfBirth: '2009-01-14',
        admissionDate: '2023-09-01',
        status: 'Inactive',
        attendance: 75
      }
    ];
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  // Filter students based on search and class
  useEffect(() => {
    let filtered = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === 'all' || student.class === selectedClass;
      return matchesSearch && matchesClass;
    });
    setFilteredStudents(filtered);
  }, [students, searchTerm, selectedClass]);

  const handleAddStudent = () => {
    const student = {
      ...newStudent,
      id: students.length + 1,
      status: 'Active',
      attendance: 100
    };
    setStudents([...students, student]);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      class: '',
      rollNumber: '',
      address: '',
      parentName: '',
      parentPhone: '',
      dateOfBirth: '',
      admissionDate: ''
    });
    setIsAddModalOpen(false);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent(student);
    setIsEditModalOpen(true);
  };

  const handleUpdateStudent = () => {
    setStudents(students.map(student => 
      student.id === editingStudent.id ? { ...newStudent, id: editingStudent.id } : student
    ));
    setIsEditModalOpen(false);
    setEditingStudent(null);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      class: '',
      rollNumber: '',
      address: '',
      parentName: '',
      parentPhone: '',
      dateOfBirth: '',
      admissionDate: ''
    });
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const classes = ['all', 'Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A', 'Grade 12B'];

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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students Management</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manage student information, enrollment, and academic records.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{students.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Students</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{students.filter(s => s.status === 'Active').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Classes</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{new Set(students.map(s => s.class)).size}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Attendance</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {students.length > 0 ? Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length) : 0}%
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
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
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>
                        {cls === 'all' ? 'All Classes' : cls}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Student
                </Button>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Attendance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredStudents.map((student) => (
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
                              <div className="text-sm text-gray-500 dark:text-gray-400">#{student.rollNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{student.class}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{student.email}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{student.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${student.attendance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900 dark:text-white">{student.attendance}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            color={student.status === 'Active' ? 'green' : 'red'}
                          >
                            {student.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            >
                              Delete
                            </button>
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

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <Input
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <Input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <Input
                value={newStudent.phone}
                onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
              <select
                value={newStudent.class}
                onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Class</option>
                {classes.filter(c => c !== 'all').map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roll Number</label>
              <Input
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                placeholder="Enter roll number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
              <Input
                type="date"
                value={newStudent.dateOfBirth}
                onChange={(e) => setNewStudent({...newStudent, dateOfBirth: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Name</label>
              <Input
                value={newStudent.parentName}
                onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                placeholder="Enter parent name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Phone</label>
              <Input
                value={newStudent.parentPhone}
                onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                placeholder="Enter parent phone"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <textarea
              value={newStudent.address}
              onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
              placeholder="Enter address"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              onClick={() => setIsAddModalOpen(false)}
              className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddStudent}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Student
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Student Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <Input
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <Input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <Input
                value={newStudent.phone}
                onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
              <select
                value={newStudent.class}
                onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Class</option>
                {classes.filter(c => c !== 'all').map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roll Number</label>
              <Input
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                placeholder="Enter roll number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
              <Input
                type="date"
                value={newStudent.dateOfBirth}
                onChange={(e) => setNewStudent({...newStudent, dateOfBirth: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Name</label>
              <Input
                value={newStudent.parentName}
                onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                placeholder="Enter parent name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Phone</label>
              <Input
                value={newStudent.parentPhone}
                onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                placeholder="Enter parent phone"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <textarea
              value={newStudent.address}
              onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
              placeholder="Enter address"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStudent}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update Student
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentsPage;
