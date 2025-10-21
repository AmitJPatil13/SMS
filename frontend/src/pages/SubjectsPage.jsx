import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard, Input, Modal, Badge } from '../components/ui';
import { getMenuItemsByRole } from '../utils/menuConfig';

const SubjectsPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    grade: '',
    credits: '',
    teacher: '',
    description: '',
    classesPerWeek: '',
    totalHours: ''
  });

  const menuItems = getMenuItemsByRole(user?.role, '/subjects');

  useEffect(() => {
    const mockSubjects = [
      { id: 1, name: 'Mathematics', code: 'MATH101', grade: 'Grade 10', credits: 4, teacher: 'Dr. Sarah Johnson', description: 'Advanced mathematics covering algebra, geometry, and calculus', classesPerWeek: 5, totalHours: 200, status: 'Active', students: 120 },
      { id: 2, name: 'Physics', code: 'PHY101', grade: 'Grade 10', credits: 4, teacher: 'Mr. Michael Brown', description: 'Fundamental physics principles and laboratory work', classesPerWeek: 4, totalHours: 160, status: 'Active', students: 115 },
      { id: 3, name: 'Chemistry', code: 'CHEM101', grade: 'Grade 10', credits: 4, teacher: 'Prof. James Wilson', description: 'General chemistry with practical experiments', classesPerWeek: 4, totalHours: 160, status: 'Active', students: 110 },
      { id: 4, name: 'English Literature', code: 'ENG101', grade: 'Grade 10', credits: 3, teacher: 'Ms. Emily Davis', description: 'Study of classic and modern literature', classesPerWeek: 4, totalHours: 120, status: 'Active', students: 125 },
      { id: 5, name: 'Biology', code: 'BIO101', grade: 'Grade 11', credits: 4, teacher: 'Dr. Lisa Smith', description: 'Life sciences and biological systems', classesPerWeek: 4, totalHours: 160, status: 'Active', students: 95 },
      { id: 6, name: 'Computer Science', code: 'CS101', grade: 'Grade 11', credits: 3, teacher: 'Mr. John Anderson', description: 'Programming fundamentals and algorithms', classesPerWeek: 3, totalHours: 120, status: 'Active', students: 80 },
      { id: 7, name: 'History', code: 'HIST101', grade: 'Grade 10', credits: 2, teacher: 'Mr. John Doe', description: 'World history and civilizations', classesPerWeek: 3, totalHours: 80, status: 'Active', students: 118 },
      { id: 8, name: 'Physical Education', code: 'PE101', grade: 'Grade 10', credits: 2, teacher: 'Coach Mike', description: 'Sports and physical fitness training', classesPerWeek: 2, totalHours: 80, status: 'Active', students: 130 }
    ];
    setSubjects(mockSubjects);
    setFilteredSubjects(mockSubjects);
  }, []);

  useEffect(() => {
    let filtered = subjects.filter(subject =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedGrade !== 'all') {
      filtered = filtered.filter(subject => subject.grade === selectedGrade);
    }

    setFilteredSubjects(filtered);
  }, [searchTerm, selectedGrade, subjects]);

  const handleAddSubject = () => {
    const subject = {
      id: subjects.length + 1,
      ...newSubject,
      credits: parseInt(newSubject.credits),
      classesPerWeek: parseInt(newSubject.classesPerWeek),
      totalHours: parseInt(newSubject.totalHours),
      status: 'Active',
      students: 0
    };
    setSubjects([...subjects, subject]);
    setIsAddModalOpen(false);
    setNewSubject({
      name: '',
      code: '',
      grade: '',
      credits: '',
      teacher: '',
      description: '',
      classesPerWeek: '',
      totalHours: ''
    });
  };

  const handleEditSubject = () => {
    setSubjects(subjects.map(subject =>
      subject.id === editingSubject.id ? {
        ...editingSubject,
        credits: parseInt(editingSubject.credits),
        classesPerWeek: parseInt(editingSubject.classesPerWeek),
        totalHours: parseInt(editingSubject.totalHours)
      } : subject
    ));
    setIsEditModalOpen(false);
    setEditingSubject(null);
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const openEditModal = (subject) => {
    setEditingSubject({ ...subject });
    setIsEditModalOpen(true);
  };

  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
  const totalStudents = subjects.reduce((sum, subject) => sum + subject.students, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="flex-1 lg:ml-64">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subjects Management</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Manage subjects, curriculum, and teacher assignments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <span className="text-2xl">📖</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Subjects</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{subjects.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Credits</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalCredits}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Teachers</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{new Set(subjects.map(s => s.teacher)).size}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Students</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalStudents}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Input
                    type="text"
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64"
                  />
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Grades</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                {user?.role === 'admin' && (
                  <Button onClick={() => setIsAddModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto">
                    Add Subject
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map((subject) => (
                <Card key={subject.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{subject.code}</p>
                    </div>
                    <Badge color={subject.status === 'Active' ? 'green' : 'red'}>{subject.status}</Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-24">🎯 Grade:</span>
                      <span>{subject.grade}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-24">🎓 Credits:</span>
                      <span>{subject.credits}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-24">👨‍🏫 Teacher:</span>
                      <span>{subject.teacher}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-24">👥 Students:</span>
                      <span>{subject.students}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-24">📅 Classes/Week:</span>
                      <span>{subject.classesPerWeek}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium w-24">⏱️ Total Hours:</span>
                      <span>{subject.totalHours}h</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{subject.description}</p>
                    {user?.role === 'admin' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(subject)}
                          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(subject.id)}
                          className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {filteredSubjects.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Subjects Found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search term.</p>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Add Subject Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Subject">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Name</label>
              <Input
                type="text"
                value={newSubject.name}
                onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                placeholder="e.g., Mathematics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Code</label>
              <Input
                type="text"
                value={newSubject.code}
                onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                placeholder="e.g., MATH101"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade</label>
              <select
                value={newSubject.grade}
                onChange={(e) => setNewSubject({ ...newSubject, grade: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Grade</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credits</label>
              <Input
                type="number"
                value={newSubject.credits}
                onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
                placeholder="e.g., 4"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teacher</label>
            <Input
              type="text"
              value={newSubject.teacher}
              onChange={(e) => setNewSubject({ ...newSubject, teacher: e.target.value })}
              placeholder="Teacher name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Classes Per Week</label>
              <Input
                type="number"
                value={newSubject.classesPerWeek}
                onChange={(e) => setNewSubject({ ...newSubject, classesPerWeek: e.target.value })}
                placeholder="e.g., 5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Hours</label>
              <Input
                type="number"
                value={newSubject.totalHours}
                onChange={(e) => setNewSubject({ ...newSubject, totalHours: e.target.value })}
                placeholder="e.g., 200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={newSubject.description}
              onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
              placeholder="Subject description"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button onClick={() => setIsAddModalOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white">
              Cancel
            </Button>
            <Button onClick={handleAddSubject} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Add Subject
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Subject Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Subject">
        {editingSubject && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Name</label>
                <Input
                  type="text"
                  value={editingSubject.name}
                  onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Code</label>
                <Input
                  type="text"
                  value={editingSubject.code}
                  onChange={(e) => setEditingSubject({ ...editingSubject, code: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade</label>
                <select
                  value={editingSubject.grade}
                  onChange={(e) => setEditingSubject({ ...editingSubject, grade: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credits</label>
                <Input
                  type="number"
                  value={editingSubject.credits}
                  onChange={(e) => setEditingSubject({ ...editingSubject, credits: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teacher</label>
              <Input
                type="text"
                value={editingSubject.teacher}
                onChange={(e) => setEditingSubject({ ...editingSubject, teacher: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Classes Per Week</label>
                <Input
                  type="number"
                  value={editingSubject.classesPerWeek}
                  onChange={(e) => setEditingSubject({ ...editingSubject, classesPerWeek: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Hours</label>
                <Input
                  type="number"
                  value={editingSubject.totalHours}
                  onChange={(e) => setEditingSubject({ ...editingSubject, totalHours: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={editingSubject.description}
                onChange={(e) => setEditingSubject({ ...editingSubject, description: e.target.value })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white">
                Cancel
              </Button>
              <Button onClick={handleEditSubject} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SubjectsPage;
