import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard, Input, Modal, Badge } from '../components/ui';
import { getMenuItemsByRole } from '../utils/menuConfig';

const TeachersPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    employeeId: '',
    address: '',
    qualification: '',
    experience: '',
    salary: '',
    joinDate: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const menuItems = getMenuItemsByRole(user?.role, '/teachers');

  // Mock data for demonstration
  useEffect(() => {
    const mockTeachers = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@school.com',
        phone: '+1-555-0201',
        subject: 'Mathematics',
        employeeId: 'TCH001',
        address: '123 Teacher Lane, City, State',
        qualification: 'PhD in Mathematics',
        experience: '8 years',
        salary: '$65,000',
        joinDate: '2020-09-01',
        emergencyContact: 'John Johnson',
        emergencyPhone: '+1-555-0202',
        status: 'Active',
        classes: 3
      },
      {
        id: 2,
        name: 'Mr. Michael Brown',
        email: 'michael.brown@school.com',
        phone: '+1-555-0203',
        subject: 'Physics',
        employeeId: 'TCH002',
        address: '456 Educator Ave, City, State',
        qualification: 'MSc in Physics',
        experience: '5 years',
        salary: '$58,000',
        joinDate: '2021-09-01',
        emergencyContact: 'Lisa Brown',
        emergencyPhone: '+1-555-0204',
        status: 'Active',
        classes: 4
      },
      {
        id: 3,
        name: 'Ms. Emily Davis',
        email: 'emily.davis@school.com',
        phone: '+1-555-0205',
        subject: 'English Literature',
        employeeId: 'TCH003',
        address: '789 Scholar St, City, State',
        qualification: 'MA in English Literature',
        experience: '6 years',
        salary: '$55,000',
        joinDate: '2019-09-01',
        emergencyContact: 'Robert Davis',
        emergencyPhone: '+1-555-0206',
        status: 'Active',
        classes: 5
      },
      {
        id: 4,
        name: 'Prof. James Wilson',
        email: 'james.wilson@school.com',
        phone: '+1-555-0207',
        subject: 'Chemistry',
        employeeId: 'TCH004',
        address: '321 Academic Blvd, City, State',
        qualification: 'PhD in Chemistry',
        experience: '12 years',
        salary: '$70,000',
        joinDate: '2018-09-01',
        emergencyContact: 'Mary Wilson',
        emergencyPhone: '+1-555-0208',
        status: 'Active',
        classes: 2
      }
    ];
    setTeachers(mockTeachers);
    setFilteredTeachers(mockTeachers);
  }, []);

  // Filter teachers based on search and subject
  useEffect(() => {
    let filtered = teachers.filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || teacher.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    });
    setFilteredTeachers(filtered);
  }, [teachers, searchTerm, selectedSubject]);

  const handleAddTeacher = () => {
    const teacher = {
      ...newTeacher,
      id: teachers.length + 1,
      status: 'Active',
      classes: 0
    };
    setTeachers([...teachers, teacher]);
    setNewTeacher({
      name: '',
      email: '',
      phone: '',
      subject: '',
      employeeId: '',
      address: '',
      qualification: '',
      experience: '',
      salary: '',
      joinDate: '',
      emergencyContact: '',
      emergencyPhone: ''
    });
    setIsAddModalOpen(false);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleUpdateTeacher = () => {
    setTeachers(teachers.map(teacher => 
      teacher.id === editingTeacher.id ? { ...newTeacher, id: editingTeacher.id } : teacher
    ));
    setIsEditModalOpen(false);
    setEditingTeacher(null);
    setNewTeacher({
      name: '',
      email: '',
      phone: '',
      subject: '',
      employeeId: '',
      address: '',
      qualification: '',
      experience: '',
      salary: '',
      joinDate: '',
      emergencyContact: '',
      emergencyPhone: ''
    });
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'History', 'Geography', 'Computer Science', 'Art', 'Music', 'Physical Education'];

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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teachers Management</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manage teacher information, assignments, and schedules.
              </p>
            </div>

            {/* Stats Cards - Premium Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in stagger-children">
              <StatCard
                title="Total Teachers"
                value={teachers.length}
                icon="👨‍🏫"
                color="green"
                trend="up"
                trendValue="+12%"
              />
              <StatCard
                title="Active Teachers"
                value={teachers.filter(t => t.status === 'Active').length}
                icon="✅"
                color="blue"
                trend="up"
                trendValue="+5%"
              />
              <StatCard
                title="Subjects"
                value={new Set(teachers.map(t => t.subject)).size}
                icon="📚"
                color="orange"
              />
              <StatCard
                title="Avg Experience"
                value={`${teachers.length > 0 ? Math.round(teachers.reduce((acc, t) => acc + parseInt(t.experience), 0) / teachers.length) : 0} yrs`}
                icon="📊"
                color="purple"
              />
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
                      placeholder="Search teachers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>
                        {subject === 'all' ? 'All Subjects' : subject}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  variant="success"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Add Teacher
                </Button>
              </div>
            </div>

            {/* Teachers Table */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Teacher</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Experience</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Classes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-green-600 dark:text-green-300">
                                {teacher.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{teacher.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">#{teacher.employeeId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{teacher.subject}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{teacher.qualification}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{teacher.email}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{teacher.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{teacher.experience}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Joined: {new Date(teacher.joinDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{teacher.classes} classes</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            variant={teacher.status === 'Active' ? 'success' : 'danger'}
                            dot={teacher.status === 'Active'}
                          >
                            {teacher.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditTeacher(teacher)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTeacher(teacher.id)}
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

      {/* Add Teacher Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Teacher"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <Input
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <Input
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <Input
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <select
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Subject</option>
                {subjects.filter(s => s !== 'all').map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee ID</label>
              <Input
                value={newTeacher.employeeId}
                onChange={(e) => setNewTeacher({...newTeacher, employeeId: e.target.value})}
                placeholder="Enter employee ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Qualification</label>
              <Input
                value={newTeacher.qualification}
                onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                placeholder="Enter qualification"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience</label>
              <Input
                value={newTeacher.experience}
                onChange={(e) => setNewTeacher({...newTeacher, experience: e.target.value})}
                placeholder="e.g., 5 years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salary</label>
              <Input
                value={newTeacher.salary}
                onChange={(e) => setNewTeacher({...newTeacher, salary: e.target.value})}
                placeholder="Enter salary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Join Date</label>
              <Input
                type="date"
                value={newTeacher.joinDate}
                onChange={(e) => setNewTeacher({...newTeacher, joinDate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emergency Contact</label>
              <Input
                value={newTeacher.emergencyContact}
                onChange={(e) => setNewTeacher({...newTeacher, emergencyContact: e.target.value})}
                placeholder="Enter emergency contact name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emergency Phone</label>
              <Input
                value={newTeacher.emergencyPhone}
                onChange={(e) => setNewTeacher({...newTeacher, emergencyPhone: e.target.value})}
                placeholder="Enter emergency phone"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <textarea
              value={newTeacher.address}
              onChange={(e) => setNewTeacher({...newTeacher, address: e.target.value})}
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
              onClick={handleAddTeacher}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Add Teacher
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Teacher Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Teacher"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <Input
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <Input
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <Input
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <select
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Subject</option>
                {subjects.filter(s => s !== 'all').map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee ID</label>
              <Input
                value={newTeacher.employeeId}
                onChange={(e) => setNewTeacher({...newTeacher, employeeId: e.target.value})}
                placeholder="Enter employee ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Qualification</label>
              <Input
                value={newTeacher.qualification}
                onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                placeholder="Enter qualification"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience</label>
              <Input
                value={newTeacher.experience}
                onChange={(e) => setNewTeacher({...newTeacher, experience: e.target.value})}
                placeholder="e.g., 5 years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salary</label>
              <Input
                value={newTeacher.salary}
                onChange={(e) => setNewTeacher({...newTeacher, salary: e.target.value})}
                placeholder="Enter salary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Join Date</label>
              <Input
                type="date"
                value={newTeacher.joinDate}
                onChange={(e) => setNewTeacher({...newTeacher, joinDate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emergency Contact</label>
              <Input
                value={newTeacher.emergencyContact}
                onChange={(e) => setNewTeacher({...newTeacher, emergencyContact: e.target.value})}
                placeholder="Enter emergency contact name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emergency Phone</label>
              <Input
                value={newTeacher.emergencyPhone}
                onChange={(e) => setNewTeacher({...newTeacher, emergencyPhone: e.target.value})}
                placeholder="Enter emergency phone"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <textarea
              value={newTeacher.address}
              onChange={(e) => setNewTeacher({...newTeacher, address: e.target.value})}
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
              onClick={handleUpdateTeacher}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Update Teacher
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeachersPage;
