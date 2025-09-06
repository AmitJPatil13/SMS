// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent'
};

// User object structure
export const createUser = (userData) => ({
  id: userData.id || Date.now(),
  name: userData.name || '',
  email: userData.email || '',
  role: userData.role || USER_ROLES.STUDENT,
  avatar: userData.avatar || '/default-avatar.png',
  phone: userData.phone || '',
  address: userData.address || '',
  dateOfBirth: userData.dateOfBirth || '',
  createdAt: userData.createdAt || new Date().toISOString(),
  ...userData
});

// Student object structure
export const createStudent = (studentData) => ({
  id: studentData.id || Date.now(),
  name: studentData.name || '',
  email: studentData.email || '',
  rollNumber: studentData.rollNumber || '',
  class: studentData.class || '',
  section: studentData.section || '',
  dateOfBirth: studentData.dateOfBirth || '',
  phone: studentData.phone || '',
  address: studentData.address || '',
  parentName: studentData.parentName || '',
  parentPhone: studentData.parentPhone || '',
  parentEmail: studentData.parentEmail || '',
  avatar: studentData.avatar || '/default-avatar.png',
  admissionDate: studentData.admissionDate || new Date().toISOString(),
  isActive: studentData.isActive !== undefined ? studentData.isActive : true,
  ...studentData
});

// Teacher object structure
export const createTeacher = (teacherData) => ({
  id: teacherData.id || Date.now(),
  name: teacherData.name || '',
  email: teacherData.email || '',
  employeeId: teacherData.employeeId || '',
  phone: teacherData.phone || '',
  address: teacherData.address || '',
  subjects: teacherData.subjects || [],
  classes: teacherData.classes || [],
  qualification: teacherData.qualification || '',
  experience: teacherData.experience || 0,
  avatar: teacherData.avatar || '/default-avatar.png',
  joiningDate: teacherData.joiningDate || new Date().toISOString(),
  isActive: teacherData.isActive !== undefined ? teacherData.isActive : true,
  ...teacherData
});

// Class object structure
export const createClass = (classData) => ({
  id: classData.id || Date.now(),
  name: classData.name || '',
  section: classData.section || '',
  capacity: classData.capacity || 30,
  teacherId: classData.teacherId || null,
  subjects: classData.subjects || [],
  roomNumber: classData.roomNumber || '',
  ...classData
});

// Subject object structure
export const createSubject = (subjectData) => ({
  id: subjectData.id || Date.now(),
  name: subjectData.name || '',
  code: subjectData.code || '',
  description: subjectData.description || '',
  teacherId: subjectData.teacherId || null,
  classId: subjectData.classId || null,
  ...subjectData
});

// Attendance object structure
export const createAttendance = (attendanceData) => ({
  id: attendanceData.id || Date.now(),
  studentId: attendanceData.studentId,
  classId: attendanceData.classId,
  date: attendanceData.date || new Date().toISOString().split('T')[0],
  status: attendanceData.status || 'present', // present, absent, late
  remarks: attendanceData.remarks || '',
  ...attendanceData
});

// Exam object structure
export const createExam = (examData) => ({
  id: examData.id || Date.now(),
  name: examData.name || '',
  type: examData.type || 'unit', // unit, midterm, final
  classId: examData.classId,
  subjectId: examData.subjectId,
  date: examData.date || new Date().toISOString().split('T')[0],
  maxMarks: examData.maxMarks || 100,
  passingMarks: examData.passingMarks || 33,
  ...examData
});

// Marks object structure
export const createMarks = (marksData) => ({
  id: marksData.id || Date.now(),
  studentId: marksData.studentId,
  examId: marksData.examId,
  subjectId: marksData.subjectId,
  marksObtained: marksData.marksObtained || 0,
  maxMarks: marksData.maxMarks || 100,
  grade: marksData.grade || '',
  remarks: marksData.remarks || '',
  ...marksData
});

// Notification object structure
export const createNotification = (notificationData) => ({
  id: notificationData.id || Date.now(),
  title: notificationData.title || '',
  message: notificationData.message || '',
  type: notificationData.type || 'info', // info, warning, success, error
  targetRole: notificationData.targetRole || 'all',
  targetUserId: notificationData.targetUserId || null,
  isRead: notificationData.isRead || false,
  createdAt: notificationData.createdAt || new Date().toISOString(),
  ...notificationData
});

// Timetable object structure
export const createTimetable = (timetableData) => ({
  id: timetableData.id || Date.now(),
  classId: timetableData.classId,
  day: timetableData.day || 'monday',
  periods: timetableData.periods || [],
  ...timetableData
});

// Period object structure
export const createPeriod = (periodData) => ({
  id: periodData.id || Date.now(),
  startTime: periodData.startTime || '09:00',
  endTime: periodData.endTime || '10:00',
  subjectId: periodData.subjectId || null,
  teacherId: periodData.teacherId || null,
  roomNumber: periodData.roomNumber || '',
  ...periodData
});
