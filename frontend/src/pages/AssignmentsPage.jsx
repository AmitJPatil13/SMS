import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard, Badge, Modal, Input } from '../components/ui';
import { getMenuItemsByRole } from '../utils/menuConfig';

const AssignmentsPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [submissionFile, setSubmissionFile] = useState(null);

  const menuItems = getMenuItemsByRole(user?.role, '/assignments');

  useEffect(() => {
    const mockAssignments = [
      { id: 1, title: 'Math Chapter 5 Exercises', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', assignedDate: '2024-10-15', dueDate: '2024-10-25', status: 'pending', grade: null, totalMarks: 50, description: 'Complete exercises 1-20 from Chapter 5', attachments: ['chapter5.pdf'] },
      { id: 2, title: 'Physics Lab Report', subject: 'Physics', teacher: 'Mr. Michael Brown', assignedDate: '2024-10-12', dueDate: '2024-10-22', status: 'submitted', grade: 45, totalMarks: 50, description: 'Write a detailed lab report on the pendulum experiment', attachments: ['lab_instructions.pdf'] },
      { id: 3, title: 'English Essay - Shakespeare', subject: 'English', teacher: 'Ms. Emily Davis', assignedDate: '2024-10-10', dueDate: '2024-10-28', status: 'pending', grade: null, totalMarks: 100, description: 'Write a 1000-word essay on Macbeth', attachments: [] },
      { id: 4, title: 'Chemistry Assignment', subject: 'Chemistry', teacher: 'Prof. James Wilson', assignedDate: '2024-10-08', dueDate: '2024-10-20', status: 'graded', grade: 42, totalMarks: 50, description: 'Answer questions on organic chemistry', attachments: ['questions.pdf'] },
      { id: 5, title: 'History Project', subject: 'History', teacher: 'Mr. John Doe', assignedDate: '2024-10-18', dueDate: '2024-11-05', status: 'pending', grade: null, totalMarks: 100, description: 'Create a presentation on World War II', attachments: ['project_guidelines.pdf'] },
      { id: 6, title: 'Biology Diagram', subject: 'Biology', teacher: 'Dr. Lisa Smith', assignedDate: '2024-10-14', dueDate: '2024-10-19', status: 'overdue', grade: null, totalMarks: 30, description: 'Draw and label the human digestive system', attachments: [] }
    ];
    setAssignments(mockAssignments);
    setFilteredAssignments(mockAssignments);
  }, []);

  useEffect(() => {
    let filtered = assignments.filter(assignment =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus !== 'all') {
      filtered = filtered.filter(assignment => assignment.status === filterStatus);
    }

    setFilteredAssignments(filtered);
  }, [searchTerm, filterStatus, assignments]);

  const handleSubmit = () => {
    if (!submissionFile) {
      alert('Please select a file to submit');
      return;
    }
    setAssignments(assignments.map(a =>
      a.id === selectedAssignment.id ? { ...a, status: 'submitted' } : a
    ));
    setIsSubmitModalOpen(false);
    setSubmissionFile(null);
    alert('Assignment submitted successfully!');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'yellow',
      submitted: 'blue',
      graded: 'green',
      overdue: 'red'
    };
    return colors[status] || 'gray';
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'graded').length;
  const overdueCount = assignments.filter(a => a.status === 'overdue').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="flex-1 lg:ml-64">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">View and submit assignments, track deadlines and grades.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">📤</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{submittedCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Graded</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{gradedCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{overdueCount}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Input
                    type="text"
                    placeholder="Search assignments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="graded">Graded</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAssignments.map((assignment) => {
                const daysRemaining = getDaysRemaining(assignment.dueDate);
                return (
                  <Card key={assignment.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{assignment.title}</h3>
                          <Badge color={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                          {assignment.status === 'overdue' && <Badge color="red">Urgent</Badge>}
                        </div>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300">📚 Subject: <span className="font-medium">{assignment.subject}</span></p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">👨‍🏫 Teacher: <span className="font-medium">{assignment.teacher}</span></p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">📅 Assigned: {assignment.assignedDate}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">⏰ Due: <span className={`font-medium ${daysRemaining < 3 && daysRemaining >= 0 ? 'text-orange-600' : daysRemaining < 0 ? 'text-red-600' : ''}`}>{assignment.dueDate} ({daysRemaining >= 0 ? `${daysRemaining} days left` : 'Overdue'})</span></p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">🎯 Marks: {assignment.totalMarks}</p>
                          {assignment.grade !== null && (
                            <p className="text-sm text-gray-600 dark:text-gray-300">⭐ Grade: <span className="font-bold text-green-600">{assignment.grade}/{assignment.totalMarks}</span></p>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{assignment.description}</p>
                        {assignment.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {assignment.attachments.map((file, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full flex items-center gap-1">
                                📎 {file}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          onClick={() => { setSelectedAssignment(assignment); setIsViewModalOpen(true); }}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                        >
                          View Details
                        </Button>
                        {assignment.status === 'pending' && (
                          <Button
                            onClick={() => { setSelectedAssignment(assignment); setIsSubmitModalOpen(true); }}
                            className="bg-green-600 hover:bg-green-700 text-white text-sm"
                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredAssignments.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Assignments Found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search term.</p>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Submit Modal */}
      <Modal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} title="Submit Assignment">
        {selectedAssignment && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{selectedAssignment.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAssignment.description}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Your Work</label>
              <input
                type="file"
                onChange={(e) => setSubmissionFile(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {submissionFile && (
                <p className="text-sm text-green-600 mt-2">✔ {submissionFile.name}</p>
              )}
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button onClick={() => setIsSubmitModalOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                Submit Assignment
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Details Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Assignment Details">
        {selectedAssignment && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{selectedAssignment.title}</h3>
              <Badge color={getStatusColor(selectedAssignment.status)}>{selectedAssignment.status}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Subject:</span> {selectedAssignment.subject}</p>
              <p className="text-sm"><span className="font-medium">Teacher:</span> {selectedAssignment.teacher}</p>
              <p className="text-sm"><span className="font-medium">Assigned:</span> {selectedAssignment.assignedDate}</p>
              <p className="text-sm"><span className="font-medium">Due Date:</span> {selectedAssignment.dueDate}</p>
              <p className="text-sm"><span className="font-medium">Total Marks:</span> {selectedAssignment.totalMarks}</p>
              {selectedAssignment.grade !== null && (
                <p className="text-sm"><span className="font-medium">Your Grade:</span> <span className="text-green-600 font-bold">{selectedAssignment.grade}/{selectedAssignment.totalMarks}</span></p>
              )}
            </div>
            <div>
              <p className="font-medium mb-2">Description:</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{selectedAssignment.description}</p>
            </div>
            {selectedAssignment.attachments.length > 0 && (
              <div>
                <p className="font-medium mb-2">Attachments:</p>
                <div className="space-y-2">
                  {selectedAssignment.attachments.map((file, index) => (
                    <button key={index} className="w-full text-left px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40">
                      📎 {file}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AssignmentsPage;
