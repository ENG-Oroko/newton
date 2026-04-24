import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Award, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  LineChart,
  Download,
  Calendar,
  Filter,
  ChevronRight,
  Star,
  Target,
  BookOpen,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Printer,
  Share2,
  FileText,
  PieChart
} from "lucide-react";

const Results = () => {
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // overview, detailed, analytics

  const stats = [
    {
      label: "Current GPA",
      value: "3.6",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+0.2 from last sem",
      trendUp: true,
      rank: "Top 15%"
    },
    {
      label: "CGPA",
      value: "3.4",
      icon: Target,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "Overall performance",
      trendUp: true,
      rank: "Second Class Upper"
    },
    {
      label: "Best Grade",
      value: "A",
      icon: Award,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "CS301 - Networking",
      trendUp: true,
      rank: "Excellent"
    },
    {
      label: "Credits Earned",
      value: "48",
      icon: BookOpen,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "Out of 120",
      trendUp: true,
      rank: "40% Complete"
    },
  ];

  const semesters = [
    { id: "all", name: "All Semesters", year: "2024-2026" },
    { id: "sem1", name: "Semester 1", year: "2024" },
    { id: "sem2", name: "Semester 2", year: "2025" },
    { id: "sem3", name: "Semester 3", year: "2025" },
    { id: "sem4", name: "Semester 4", year: "2026" },
  ];

  const allResults = [
    { 
      id: 1,
      course: "CS101 - Programming Fundamentals", 
      code: "CS101",
      grade: "A-", 
      marks: 85,
      semester: "sem1",
      year: "2024",
      credits: 3,
      lecturer: "Dr. Kamau",
      attendance: 92,
      performance: "Excellent",
      remarks: "Pass",
      assignments: [90, 85, 88],
      examScore: 82
    },
    { 
      id: 2,
      course: "CS201 - Database Systems", 
      code: "CS201",
      grade: "B+", 
      marks: 78,
      semester: "sem2",
      year: "2025",
      credits: 3,
      lecturer: "Dr. Akinyi",
      attendance: 85,
      performance: "Good",
      remarks: "Pass",
      assignments: [80, 75, 82],
      examScore: 75
    },
    { 
      id: 3,
      course: "CS301 - Networking", 
      code: "CS301",
      grade: "A", 
      marks: 92,
      semester: "sem3",
      year: "2025",
      credits: 3,
      lecturer: "Prof. Omondi",
      attendance: 95,
      performance: "Excellent",
      remarks: "Pass",
      assignments: [95, 90, 92],
      examScore: 91
    },
    { 
      id: 4,
      course: "MATH202 - Discrete Mathematics", 
      code: "MATH202",
      grade: "B", 
      marks: 72,
      semester: "sem2",
      year: "2025",
      credits: 3,
      lecturer: "Dr. Wanjiku",
      attendance: 78,
      performance: "Satisfactory",
      remarks: "Pass",
      assignments: [75, 70, 74],
      examScore: 70
    },
    { 
      id: 5,
      course: "PHY101 - Physics Laboratory", 
      code: "PHY101",
      grade: "A", 
      marks: 88,
      semester: "sem1",
      year: "2024",
      credits: 2,
      lecturer: "Dr. Maina",
      attendance: 88,
      performance: "Excellent",
      remarks: "Pass",
      assignments: [85, 90, 87],
      examScore: 89
    },
    { 
      id: 6,
      course: "ENG202 - Technical Writing", 
      code: "ENG202",
      grade: "C+", 
      marks: 65,
      semester: "sem3",
      year: "2025",
      credits: 2,
      lecturer: "Prof. Achieng",
      attendance: 70,
      performance: "Average",
      remarks: "Pass",
      assignments: [70, 65, 68],
      examScore: 62
    },
  ];

  const filteredResults = selectedSemester === "all" 
    ? allResults 
    : allResults.filter(r => r.semester === selectedSemester);

  const calculateSemesterGPA = (results) => {
    const totalPoints = results.reduce((sum, course) => {
      const gradePoints = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
      };
      return sum + (gradePoints[course.grade] || 0) * course.credits;
    }, 0);
    const totalCredits = results.reduce((sum, course) => sum + course.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-700";
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-700";
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getPerformanceIcon = (grade) => {
    if (grade.startsWith("A")) return <CheckCircle size={16} className="text-green-600" />;
    if (grade.startsWith("B")) return <TrendingUp size={16} className="text-blue-600" />;
    if (grade.startsWith("C")) return <AlertCircle size={16} className="text-yellow-600" />;
    return <XCircle size={16} className="text-red-600" />;
  };

  const gradeDistribution = {
    'A': allResults.filter(r => r.grade === 'A').length,
    'A-': allResults.filter(r => r.grade === 'A-').length,
    'B+': allResults.filter(r => r.grade === 'B+').length,
    'B': allResults.filter(r => r.grade === 'B').length,
    'C+': allResults.filter(r => r.grade === 'C+').length,
  };

  const topPerformers = [...allResults].sort((a, b) => b.marks - a.marks).slice(0, 3);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Academic Results</h1>
            <p className="text-gray-500">Track your academic performance and grades</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition flex items-center gap-2">
              <Download size={16} />
              Export Results
            </button>
            <button 
              onClick={() => setShowTranscript(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700 transition flex items-center gap-2"
            >
              <FileText size={16} />
              View Transcript
            </button>
          </div>
        </div>

        {/* Semester Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {semesters.map((sem) => (
            <button
              key={sem.id}
              onClick={() => setSelectedSemester(sem.id)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                selectedSemester === sem.id
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {sem.name}
              <span className="text-xs ml-1 opacity-75">{sem.year}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${s.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={s.color} size={22} />
                </div>
                <span className={`text-xs font-medium ${s.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {s.trend}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {s.value}
                </h2>
                <p className="text-xs text-gray-400 mt-1">{s.rank}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { id: "overview", label: "Overview", icon: BarChart3 },
          { id: "detailed", label: "Detailed Results", icon: FileText },
          { id: "analytics", label: "Analytics", icon: PieChart }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Performance Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-2xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Academic Standing</h3>
                <p className="text-3xl font-bold text-green-600 mb-1">Good Standing</p>
                <p className="text-sm text-gray-600">You are eligible for progression to next semester</p>
              </div>
              <div className="text-center">
                <div className="relative inline-block">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-green-600"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 56}
                      strokeDashoffset={2 * Math.PI * 56 * (1 - 72/100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-2xl font-bold text-gray-800">72%</div>
                    <div className="text-xs text-gray-500">Percentile</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Top 28% of class</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={14} className="text-gray-400" />
                  <span>Current Semester: Semester 4, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target size={14} className="text-gray-400" />
                  <span>Target GPA: 3.8</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star size={14} className="text-gray-400" />
                  <span>Dean's List: Eligible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Award size={18} />
              Top Performing Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topPerformers.map((course, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{course.course}</p>
                      <p className="text-xs text-gray-500">{course.code}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${getGradeColor(course.grade)}`}>
                      {course.grade}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-gray-600">Score: {course.marks}%</span>
                    <span className="text-gray-600">Credits: {course.credits}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Results Summary */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Course Results Summary</h3>
            <div className="space-y-3">
              {filteredResults.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => setSelectedCourse(r)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-800">{r.course}</p>
                      {getPerformanceIcon(r.grade)}
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>{r.code}</span>
                      <span>Credits: {r.credits}</span>
                      <span>Semester {r.semester}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getGradeColor(r.grade)}`}>
                      {r.grade}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{r.marks}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Detailed Results Tab */}
      {activeTab === "detailed" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600">
                  <th className="py-3 px-4">Course Code</th>
                  <th className="py-3 px-4">Course Name</th>
                  <th className="py-3 px-4">Credits</th>
                  <th className="py-3 px-4">Semester</th>
                  <th className="py-3 px-4">Assignments</th>
                  <th className="py-3 px-4">Exam Score</th>
                  <th className="py-3 px-4">Total Marks</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-medium text-gray-800">{r.code}</td>
                    <td className="py-3 px-4 text-gray-600">{r.course.split(' - ')[1]}</td>
                    <td className="py-3 px-4 text-gray-600">{r.credits}</td>
                    <td className="py-3 px-4 text-gray-600">Sem {r.semester.slice(-1)}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {r.assignments.reduce((a, b) => a + b, 0) / r.assignments.length}%
                    </td>
                    <td className="py-3 px-4 text-gray-600">{r.examScore}%</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{r.marks}%</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getGradeColor(r.grade)}`}>
                        {r.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => setSelectedCourse(r)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* Grade Distribution */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Grade Distribution</h3>
            <div className="space-y-3">
              {Object.entries(gradeDistribution).map(([grade, count]) => (
                <div key={grade}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Grade {grade}</span>
                    <span className="text-gray-800 font-semibold">{count} courses</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        grade === 'A' || grade === 'A-' ? 'bg-green-500' :
                        grade === 'B+' || grade === 'B' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(count / allResults.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-800 mb-3">GPA Trend</h3>
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-xl">
                <LineChart size={48} className="text-gray-400" />
                <p className="text-sm text-gray-500 ml-2">GPA visualization chart would appear here</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-800 mb-3">Credit Distribution</h3>
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-xl">
                <PieChart size={48} className="text-gray-400" />
                <p className="text-sm text-gray-500 ml-2">Credit distribution chart would appear here</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Target size={18} />
              Academic Recommendations
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <p>Your performance in core CS courses is excellent - consider taking advanced electives</p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
                <p>Focus more on Mathematics to improve your overall GPA</p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <TrendingUp size={16} className="text-blue-600 mt-0.5" />
                <p>You're on track for Dean's List - maintain current performance</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCourse(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Course Details</h3>
              <button onClick={() => setSelectedCourse(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-800">{selectedCourse.course}</h4>
                <p className="text-sm text-gray-600">{selectedCourse.code} • {selectedCourse.credits} Credits</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Final Grade</p>
                  <p className={`text-2xl font-bold ${selectedCourse.grade === 'A' ? 'text-green-600' : 'text-blue-600'}`}>
                    {selectedCourse.grade}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Total Marks</p>
                  <p className="text-2xl font-bold text-gray-800">{selectedCourse.marks}%</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">Assessment Breakdown</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assignments Average</span>
                    <span className="font-semibold">
                      {selectedCourse.assignments.reduce((a, b) => a + b, 0) / selectedCourse.assignments.length}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Exam Score</span>
                    <span className="font-semibold">{selectedCourse.examScore}%</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">Additional Information</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-500">Lecturer:</span> {selectedCourse.lecturer}</p>
                  <p><span className="text-gray-500">Attendance:</span> {selectedCourse.attendance}%</p>
                  <p><span className="text-gray-500">Performance:</span> {selectedCourse.performance}</p>
                  <p><span className="text-gray-500">Remarks:</span> {selectedCourse.remarks}</p>
                </div>
              </div>

              <button className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
                Download Detailed Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transcript Modal */}
      {showTranscript && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowTranscript(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Academic Transcript</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                  <Printer size={16} />
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                  <Download size={16} />
                </button>
                <button onClick={() => setShowTranscript(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <XCircle size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">University of Technology</h2>
                <p className="text-gray-600">Office of the Registrar</p>
                <h3 className="text-xl font-semibold text-gray-800 mt-4">Academic Transcript</h3>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p><span className="text-gray-500">Student Name:</span> John Doe</p>
                    <p><span className="text-gray-500">Student ID:</span> STU-2024-001</p>
                    <p><span className="text-gray-500">Program:</span> Bachelor of Science in Computer Science</p>
                  </div>
                  <div>
                    <p><span className="text-gray-500">CGPA:</span> 3.4</p>
                    <p><span className="text-gray-500">Credits Earned:</span> 48/120</p>
                    <p><span className="text-gray-500">Classification:</span> Second Class Upper</p>
                  </div>
                </div>
              </div>

              {semesters.filter(s => s.id !== "all").map((sem) => {
                const semResults = allResults.filter(r => r.semester === sem.id);
                if (semResults.length === 0) return null;
                const semGPA = calculateSemesterGPA(semResults);
                return (
                  <div key={sem.id} className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">{sem.name} {sem.year} - GPA: {semGPA}</h4>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr className="text-left">
                          <th className="py-2 px-3">Course Code</th>
                          <th className="py-2 px-3">Course Name</th>
                          <th className="py-2 px-3">Credits</th>
                          <th className="py-2 px-3">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semResults.map((r) => (
                          <tr key={r.id} className="border-b">
                            <td className="py-2 px-3">{r.code}</td>
                            <td className="py-2 px-3">{r.course.split(' - ')[1]}</td>
                            <td className="py-2 px-3">{r.credits}</td>
                            <td className="py-2 px-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${getGradeColor(r.grade)}`}>
                                {r.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Results;