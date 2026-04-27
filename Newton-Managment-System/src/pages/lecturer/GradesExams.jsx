import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Save, 
  X,
  Check,
  Award,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  BookOpen,
  Calendar,
  AlertCircle,
  ChevronDown,
  Upload,
  Mail,
  Printer,
  Eye,
  Star,
  Trophy,
  PieChart,
  FileText,
  Settings
} from "lucide-react";

const GradesExams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedExam, setSelectedExam] = useState("all");
  const [editingGrade, setEditingGrade] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showStats, setShowStats] = useState(true);
  const [showGradeDistribution, setShowGradeDistribution] = useState(false);

  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", regNo: "CS/2024/001", course: "CS101", courseName: "Introduction to Programming", exam1: 85, exam2: 78, assignment: 90, total: 84.5, grade: "A-", attendance: 92, remarks: "Excellent performance" },
    { id: 2, name: "Mary Wanjiku", regNo: "CS/2024/002", course: "CS202", courseName: "Data Structures", exam1: 72, exam2: 68, assignment: 85, total: 74.2, grade: "B", attendance: 85, remarks: "Good, needs improvement in exams" },
    { id: 3, name: "Peter Kimani", regNo: "CS/2024/003", course: "CS101", courseName: "Introduction to Programming", exam1: 92, exam2: 88, assignment: 95, total: 91.2, grade: "A", attendance: 95, remarks: "Outstanding student" },
    { id: 4, name: "Sarah Odhiambo", regNo: "CS/2024/004", course: "CS303", courseName: "Database Systems", exam1: 78, exam2: 82, assignment: 88, total: 82.3, grade: "B+", attendance: 88, remarks: "Consistent performer" },
    { id: 5, name: "James Mwangi", regNo: "CS/2024/005", course: "CS202", courseName: "Data Structures", exam1: 65, exam2: 58, assignment: 70, total: 64.2, grade: "C+", attendance: 75, remarks: "Needs improvement" },
    { id: 6, name: "Grace Achieng", regNo: "CS/2024/006", course: "CS101", courseName: "Introduction to Programming", exam1: 88, exam2: 85, assignment: 92, total: 88.1, grade: "A-", attendance: 90, remarks: "Very good" },
    { id: 7, name: "Brian Otieno", regNo: "CS/2024/007", course: "CS303", courseName: "Database Systems", exam1: 82, exam2: 79, assignment: 85, total: 82.2, grade: "B+", attendance: 82, remarks: "Good progress" },
    { id: 8, name: "Faith Muthoni", regNo: "CS/2024/008", course: "CS202", courseName: "Data Structures", exam1: 95, exam2: 92, assignment: 98, total: 94.8, grade: "A", attendance: 98, remarks: "Top performer" },
  ]);

  const courses = ["all", ...new Set(students.map(s => s.course))];
  const exams = ["all", "Exam 1", "Exam 2", "Assignment", "Total"];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return "text-green-600";
    if (grade.startsWith('B')) return "text-blue-600";
    if (grade.startsWith('C')) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeBg = (grade) => {
    if (grade.startsWith('A')) return "bg-green-100";
    if (grade.startsWith('B')) return "bg-blue-100";
    if (grade.startsWith('C')) return "bg-yellow-100";
    return "bg-red-100";
  };

  const calculateLetterGrade = (score) => {
    if (score >= 90) return "A";
    if (score >= 80) return "A-";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "B-";
    if (score >= 60) return "C+";
    if (score >= 55) return "C";
    if (score >= 50) return "C-";
    if (score >= 45) return "D+";
    if (score >= 40) return "D";
    return "F";
  };

  const updateStudentGrade = (id, field, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    setStudents(students.map(student => {
      if (student.id === id) {
        const updatedStudent = { ...student, [field]: numValue };
        
        // Recalculate total and grade
        if (field === 'exam1' || field === 'exam2' || field === 'assignment') {
          const exam1Weight = 0.3;
          const exam2Weight = 0.3;
          const assignmentWeight = 0.4;
          
          const newTotal = (
            updatedStudent.exam1 * exam1Weight +
            updatedStudent.exam2 * exam2Weight +
            updatedStudent.assignment * assignmentWeight
          );
          
          updatedStudent.total = Math.round(newTotal * 10) / 10;
          updatedStudent.grade = calculateLetterGrade(updatedStudent.total);
        }
        
        return updatedStudent;
      }
      return student;
    }));
    
    setEditingGrade(null);
  };

  const startEdit = (student, field, currentValue) => {
    setEditingGrade({ studentId: student.id, field });
    setEditValue(currentValue);
  };

  const handleSaveGrade = (studentId, field) => {
    updateStudentGrade(studentId, field, editValue);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.regNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const stats = {
    totalStudents: students.length,
    averageGrade: (students.reduce((sum, s) => sum + s.total, 0) / students.length).toFixed(1),
    highestGrade: Math.max(...students.map(s => s.total)),
    lowestGrade: Math.min(...students.map(s => s.total)),
    passRate: ((students.filter(s => s.total >= 50).length / students.length) * 100).toFixed(1),
    gradeDistribution: {
      A: students.filter(s => s.grade === 'A').length,
      'A-': students.filter(s => s.grade === 'A-').length,
      'B+': students.filter(s => s.grade === 'B+').length,
      B: students.filter(s => s.grade === 'B').length,
      'C+': students.filter(s => s.grade === 'C+').length,
      'Below C': students.filter(s => !['A', 'A-', 'B+', 'B', 'C+'].includes(s.grade)).length,
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Registration No", "Course", "Exam 1", "Exam 2", "Assignment", "Total", "Grade", "Attendance", "Remarks"];
    const csvData = filteredStudents.map(s => [
      s.name, s.regNo, s.courseName, s.exam1, s.exam2, s.assignment, s.total, s.grade, `${s.attendance}%`, s.remarks
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grades_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const bulkUpdateGrades = () => {
    // Placeholder for bulk update functionality
    alert("Bulk update feature - Select students and update grades in batch");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HEADER SECTION */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <ClipboardCheck className="text-green-600" size={28} />
                Grades & Exams Management
              </h1>
              <p className="text-gray-500">Manage student grades, exam scores, and academic performance</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={bulkUpdateGrades}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <Upload size={16} />
                Bulk Update
              </button>
              <button 
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <Download size={16} />
                Export Grades
              </button>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users size={20} className="text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats.totalStudents}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Students</p>
            <p className="text-xs text-blue-600 mt-1">Enrolled</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <Award size={20} className="text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{stats.averageGrade}%</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Average Grade</p>
            <p className="text-xs text-green-600 mt-1">Class average</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <TrendingUp size={20} className="text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{stats.highestGrade}%</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Highest Grade</p>
            <p className="text-xs text-purple-600 mt-1">Top performer</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <TrendingDown size={20} className="text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-yellow-600">{stats.lowestGrade}%</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Lowest Grade</p>
            <p className="text-xs text-yellow-600 mt-1">Needs attention</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-200 rounded-xl">
                <Trophy size={20} className="text-green-700" />
              </div>
              <span className="text-2xl font-bold text-green-700">{stats.passRate}%</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">Pass Rate</p>
            <p className="text-xs text-green-700 mt-1">Above 50%</p>
          </div>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Search size={16} />
                Search Student
              </label>
              <input
                type="text"
                placeholder="Search by name or registration number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <BookOpen size={16} />
                Filter by Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {courses.map(course => (
                  <option key={course} value={course}>
                    {course === "all" ? "All Courses" : course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <BarChart3 size={16} />
                View Options
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex-1 px-3 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition-colors"
                >
                  {showStats ? "Hide" : "Show"} Stats
                </button>
                <button
                  onClick={() => setShowGradeDistribution(!showGradeDistribution)}
                  className="flex-1 px-3 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition-colors"
                >
                  Distribution
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* GRADE DISTRIBUTION CHART */}
        {showGradeDistribution && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <PieChart size={18} className="text-green-600" />
              Grade Distribution
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.gradeDistribution).map(([grade, count]) => (
                <div key={grade}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{grade}</span>
                    <span className="text-gray-600">{count} students</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(count / stats.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GRADES TABLE */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Student Info</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Exam 1<br/>(30%)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Exam 2<br/>(30%)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Assignment<br/>(40%)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Total<br/>(100%)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Grade</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Attendance</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.regNo}</p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-gray-600">{student.courseName}</td>
                    
                    {/* Editable Exam 1 */}
                    <td className="px-6 py-4 text-center">
                      {editingGrade?.studentId === student.id && editingGrade?.field === 'exam1' ? (
                        <div className="flex items-center gap-2 justify-center">
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-20 px-2 py-1 border rounded-lg text-center"
                            min="0"
                            max="100"
                          />
                          <button onClick={() => handleSaveGrade(student.id, 'exam1')} className="text-green-600">
                            <Save size={16} />
                          </button>
                          <button onClick={() => setEditingGrade(null)} className="text-red-600">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-medium">{student.exam1}</span>
                          <button onClick={() => startEdit(student, 'exam1', student.exam1)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit size={14} className="text-gray-400 hover:text-green-600" />
                          </button>
                        </div>
                      )}
                    </td>
                    
                    {/* Editable Exam 2 */}
                    <td className="px-6 py-4 text-center">
                      {editingGrade?.studentId === student.id && editingGrade?.field === 'exam2' ? (
                        <div className="flex items-center gap-2 justify-center">
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-20 px-2 py-1 border rounded-lg text-center"
                            min="0"
                            max="100"
                          />
                          <button onClick={() => handleSaveGrade(student.id, 'exam2')} className="text-green-600">
                            <Save size={16} />
                          </button>
                          <button onClick={() => setEditingGrade(null)} className="text-red-600">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-medium">{student.exam2}</span>
                          <button onClick={() => startEdit(student, 'exam2', student.exam2)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit size={14} className="text-gray-400 hover:text-green-600" />
                          </button>
                        </div>
                      )}
                    </td>
                    
                    {/* Editable Assignment */}
                    <td className="px-6 py-4 text-center">
                      {editingGrade?.studentId === student.id && editingGrade?.field === 'assignment' ? (
                        <div className="flex items-center gap-2 justify-center">
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-20 px-2 py-1 border rounded-lg text-center"
                            min="0"
                            max="100"
                          />
                          <button onClick={() => handleSaveGrade(student.id, 'assignment')} className="text-green-600">
                            <Save size={16} />
                          </button>
                          <button onClick={() => setEditingGrade(null)} className="text-red-600">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-medium">{student.assignment}</span>
                          <button onClick={() => startEdit(student, 'assignment', student.assignment)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit size={14} className="text-gray-400 hover:text-green-600" />
                          </button>
                        </div>
                      )}
                    </td>
                    
                    {/* Total */}
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-gray-800">{student.total}%</span>
                    </td>
                    
                    {/* Grade */}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getGradeBg(student.grade)} ${getGradeColor(student.grade)}`}>
                        {student.grade}
                      </span>
                    </td>
                    
                    {/* Attendance */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-sm font-semibold ${student.attendance >= 80 ? 'text-green-600' : student.attendance >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {student.attendance}%
                        </span>
                        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${student.attendance >= 80 ? 'bg-green-500' : student.attendance >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Mail size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <FileText size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredStudents.length} of {students.length} students
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS AND TIPS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <AlertCircle size={18} />
              Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Click on the edit icon next to any score to update grades</li>
              <li>• Grades are automatically calculated based on weights</li>
              <li>• Weight distribution: Exam 1 (30%), Exam 2 (30%), Assignment (40%)</li>
              <li>• Export grades to CSV for record keeping</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
            <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
              <Settings size={18} />
              Grade Scale
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>90-100%:</span>
                <span className="font-semibold text-green-600">A</span>
              </div>
              <div className="flex justify-between">
                <span>80-89%:</span>
                <span className="font-semibold text-blue-600">A-</span>
              </div>
              <div className="flex justify-between">
                <span>75-79%:</span>
                <span className="font-semibold text-blue-600">B+</span>
              </div>
              <div className="flex justify-between">
                <span>70-74%:</span>
                <span className="font-semibold text-blue-600">B</span>
              </div>
              <div className="flex justify-between">
                <span>60-69%:</span>
                <span className="font-semibold text-yellow-600">C+</span>
              </div>
              <div className="flex justify-between">
                <span>Below 50%:</span>
                <span className="font-semibold text-red-600">F (Fail)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default GradesExams;