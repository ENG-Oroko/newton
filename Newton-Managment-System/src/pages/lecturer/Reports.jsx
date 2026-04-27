import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  BarChart3,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Printer,
  Mail,
  Share2,
  Eye,
  PieChart,
  LineChart,
  Activity,
  Target,
  Zap,
  Star,
  Trophy,
  GraduationCap,
  CreditCard,
  DollarSign,
  ChevronDown,
  X,
  RefreshCw,
  Settings,
  Info
} from "lucide-react";
import {
  LineChart as ReLineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';

const Reports = () => {
  const [dateRange, setDateRange] = useState("semester");
  const [reportType, setReportType] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showNotification, setShowNotification] = useState(null);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [isLoading, setIsLoading] = useState(false);

  // Course data
  const courses = [
    { id: 1, name: "Introduction to Programming", code: "CS101", students: 45, avgGrade: 78.5, passRate: 88, attendance: 85 },
    { id: 2, name: "Data Structures", code: "CS202", students: 38, avgGrade: 82.3, passRate: 92, attendance: 87 },
    { id: 3, name: "Database Systems", code: "CS303", students: 42, avgGrade: 75.8, passRate: 84, attendance: 82 },
    { id: 4, name: "Web Development", code: "CS404", students: 35, avgGrade: 85.2, passRate: 94, attendance: 90 },
    { id: 5, name: "Machine Learning", code: "CS505", students: 28, avgGrade: 79.6, passRate: 86, attendance: 83 }
  ];

  // Grade distribution data
  const gradeDistribution = [
    { grade: "A", count: 45, percentage: 18, color: "#10B981" },
    { grade: "A-", count: 52, percentage: 21, color: "#34D399" },
    { grade: "B+", count: 48, percentage: 19, color: "#60A5FA" },
    { grade: "B", count: 38, percentage: 15, color: "#3B82F6" },
    { grade: "B-", count: 25, percentage: 10, color: "#FBBF24" },
    { grade: "C+", count: 20, percentage: 8, color: "#F59E0B" },
    { grade: "C", count: 12, percentage: 5, color: "#F97316" },
    { grade: "D", count: 8, percentage: 3, color: "#EF4444" },
    { grade: "F", count: 5, percentage: 2, color: "#DC2626" }
  ];

  // Monthly performance trend
  const performanceTrend = [
    { month: "Jan", avgGrade: 72, attendance: 78, submissions: 65 },
    { month: "Feb", avgGrade: 74, attendance: 80, submissions: 70 },
    { month: "Mar", avgGrade: 76, attendance: 82, submissions: 75 },
    { month: "Apr", avgGrade: 78, attendance: 84, submissions: 78 },
    { month: "May", avgGrade: 80, attendance: 86, submissions: 82 },
    { month: "Jun", avgGrade: 82, attendance: 87, submissions: 85 },
    { month: "Jul", avgGrade: 81, attendance: 86, submissions: 83 },
    { month: "Aug", avgGrade: 83, attendance: 88, submissions: 87 },
    { month: "Sep", avgGrade: 84, attendance: 89, submissions: 88 },
    { month: "Oct", avgGrade: 85, attendance: 90, submissions: 90 },
    { month: "Nov", avgGrade: 84, attendance: 89, submissions: 88 },
    { month: "Dec", avgGrade: 86, attendance: 91, submissions: 91 }
  ];

  // Weekly activity data
  const weeklyActivity = [
    { day: "Mon", assignments: 12, quizzes: 5, attendance: 85 },
    { day: "Tue", assignments: 8, quizzes: 3, attendance: 87 },
    { day: "Wed", assignments: 10, quizzes: 4, attendance: 86 },
    { day: "Thu", assignments: 7, quizzes: 2, attendance: 88 },
    { day: "Fri", assignments: 5, quizzes: 1, attendance: 84 }
  ];

  // Top performing students
  const topStudents = [
    { rank: 1, name: "Faith Muthoni", regNo: "CS/2024/008", avgGrade: 94.8, course: "Data Structures", trend: "up" },
    { rank: 2, name: "Peter Kimani", regNo: "CS/2024/003", avgGrade: 91.2, course: "Programming", trend: "up" },
    { rank: 3, name: "Grace Achieng", regNo: "CS/2024/006", avgGrade: 88.1, course: "Programming", trend: "stable" },
    { rank: 4, name: "John Doe", regNo: "CS/2024/001", avgGrade: 84.5, course: "Programming", trend: "up" },
    { rank: 5, name: "Sarah Odhiambo", regNo: "CS/2024/004", avgGrade: 82.3, course: "Database", trend: "down" }
  ];

  // At-risk students
  const atRiskStudents = [
    { name: "James Mwangi", regNo: "CS/2024/005", avgGrade: 64.2, attendance: 75, missingAssignments: 3 },
    { name: "Mary Wanjiku", regNo: "CS/2024/002", avgGrade: 74.2, attendance: 85, missingAssignments: 1 }
  ];

  // Department stats
  const departmentStats = {
    totalStudents: 188,
    totalCourses: 5,
    totalAssignments: 24,
    averageAttendance: 86.4,
    overallPassRate: 88.8,
    averageGrade: 80.2,
    completionRate: 92,
    satisfactionRate: 4.6
  };

  // Report options
  const reportTypes = [
    { id: "overview", label: "Overview Dashboard", icon: Activity },
    { id: "academic", label: "Academic Performance", icon: GraduationCap },
    { id: "attendance", label: "Attendance Report", icon: Clock },
    { id: "financial", label: "Financial Summary", icon: DollarSign }
  ];

  const dateRanges = [
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "semester", label: "This Semester" },
    { id: "year", label: "This Year" },
    { id: "custom", label: "Custom Range" }
  ];

  const filteredCourses = useMemo(() => {
    if (selectedCourse === "all") return courses;
    return courses.filter(c => c.id.toString() === selectedCourse);
  }, [selectedCourse, courses]);

  const filteredTrend = useMemo(() => {
    let data = [...performanceTrend];
    if (dateRange === "semester") {
      data = data.slice(0, 6);
    } else if (dateRange === "month") {
      data = data.slice(-1);
    }
    return data;
  }, [dateRange]);

  const overallStats = useMemo(() => {
    const totalStudents = departmentStats.totalStudents;
    const passedStudents = Math.round(totalStudents * (departmentStats.overallPassRate / 100));
    const avgGrade = departmentStats.averageGrade;
    
    return {
      totalStudents,
      passedStudents,
      failedStudents: totalStudents - passedStudents,
      avgGrade,
      gradeLetter: avgGrade >= 80 ? "A-" : avgGrade >= 75 ? "B+" : avgGrade >= 70 ? "B" : "C+",
      trend: "+5.2%"
    };
  }, [departmentStats]);

  const showNotificationMessage = (message, type) => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showNotificationMessage(`Report exported as ${exportFormat.toUpperCase()} successfully`, "success");
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
    showNotificationMessage("Preparing print view...", "info");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotificationMessage("Report link copied to clipboard", "success");
  };

  const getTrendIcon = (trend) => {
    if (trend === "up") return <TrendingUp size={14} className="text-green-500" />;
    if (trend === "down") return <TrendingDown size={14} className="text-red-500" />;
    return <Activity size={14} className="text-gray-500" />;
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2 bg-${color}-50 rounded-lg`}>
          <Icon size={20} className={`text-${color}-600`} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-medium">
            {trend}
            <TrendingUp size={12} className="text-green-500" />
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Notification Toast */}
        {showNotification && (
          <div className="fixed top-20 right-4 z-50 animate-slide-in">
            <div className={`rounded-lg shadow-lg p-4 ${
              showNotification.type === "success" ? "bg-green-50 border border-green-200" :
              showNotification.type === "error" ? "bg-red-50 border border-red-200" :
              "bg-blue-50 border border-blue-200"
            }`}>
              <div className="flex items-center gap-2">
                {showNotification.type === "success" && <CheckCircle size={18} className="text-green-600" />}
                {showNotification.type === "error" && <AlertCircle size={18} className="text-red-600" />}
                <span className="text-sm font-medium">{showNotification.message}</span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 className="text-green-600" size={28} />
              Reports & Analytics
            </h1>
            <p className="text-gray-500 mt-1">Comprehensive academic insights and performance metrics</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
            >
              <Printer size={16} />
              Print
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
            >
              <Share2 size={16} />
              Share
            </button>
            <button
              onClick={handleExport}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-2 shadow-md"
            >
              {isLoading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              Export Report
            </button>
          </div>
        </div>

        {/* Report Type Tabs */}
        <div className="bg-white border border-gray-200 rounded-xl p-2 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {reportTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    reportType === type.id
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent size={16} />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-3">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.code} - {course.name}</option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
              >
                <Filter size={14} />
                More Filters
                {showFilters && <ChevronDown size={14} className="transform rotate-180" />}
              </button>
            </div>

            <div className="flex gap-2">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <option value="pdf">PDF Format</option>
                <option value="excel">Excel Format</option>
                <option value="csv">CSV Format</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white">
                  <option>All Departments</option>
                  <option>Computer Science</option>
                  <option>Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Academic Year</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white">
                  <option>2024/2025</option>
                  <option>2023/2024</option>
                  <option>2022/2023</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Semester</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white">
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                  <option>Both</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Student Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white">
                  <option>All Students</option>
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Overview Dashboard */}
        {reportType === "overview" && (
          <>
            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Students"
                value={overallStats.totalStudents}
                icon={Users}
                color="blue"
                trend="+12%"
              />
              <StatCard
                title="Pass Rate"
                value={`${departmentStats.overallPassRate}%`}
                subtitle={`${overallStats.passedStudents} passed, ${overallStats.failedStudents} failed`}
                icon={Award}
                color="green"
                trend="+5%"
              />
              <StatCard
                title="Average Grade"
                value={`${departmentStats.averageGrade}%`}
                subtitle={`Grade: ${overallStats.gradeLetter}`}
                icon={BarChart3}
                color="purple"
              />
              <StatCard
                title="Attendance Rate"
                value={`${departmentStats.averageAttendance}%`}
                icon={Clock}
                color="orange"
                trend="+3%"
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Performance Trend */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <TrendingUp size={18} className="text-green-600" />
                      Performance Trend
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Average grade over time</p>
                  </div>
                  <select className="text-sm border rounded-lg px-2 py-1">
                    <option>2024</option>
                    <option>2023</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <ReLineChart data={filteredTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgGrade" stroke="#10B981" name="Avg Grade" strokeWidth={2} />
                    <Line type="monotone" dataKey="attendance" stroke="#3B82F6" name="Attendance %" strokeWidth={2} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>

              {/* Grade Distribution */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <PieChart size={18} className="text-purple-600" />
                  Grade Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="count"
                      label={({ grade, percent }) => `${grade} ${(percent * 100).toFixed(0)}%`}
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Course Performance */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-600" />
                  Course Performance
                </h3>
                <div className="space-y-4">
                  {filteredCourses.map((course) => (
                    <div key={course.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{course.code} - {course.name}</span>
                        <span className="text-gray-600">{course.avgGrade}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.avgGrade}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Students: {course.students}</span>
                        <span>Pass Rate: {course.passRate}%</span>
                        <span>Attendance: {course.attendance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <Activity size={18} className="text-orange-600" />
                  Weekly Activity
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ReBarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="assignments" fill="#10B981" name="Assignments" />
                    <Bar dataKey="quizzes" fill="#3B82F6" name="Quizzes" />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Academic Performance Report */}
        {reportType === "academic" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Top Students */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 lg:col-span-2">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Trophy size={18} className="text-yellow-500" />
                  Top Performing Students
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Rank</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Student Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Reg No</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Avg Grade</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {topStudents.map((student) => (
                        <tr key={student.rank} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-2 text-sm font-semibold text-gray-800">#{student.rank}</td>
                          <td className="px-4 py-2 text-sm text-gray-800">{student.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{student.regNo}</td>
                          <td className="px-4 py-2 text-sm font-semibold text-green-600">{student.avgGrade}%</td>
                          <td className="px-4 py-2">{getTrendIcon(student.trend)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* At Risk Students */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-500" />
                  At-Risk Students
                </h3>
                <div className="space-y-4">
                  {atRiskStudents.map((student, idx) => (
                    <div key={idx} className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.regNo}</p>
                      <div className="flex justify-between mt-2 text-xs">
                        <span className="text-red-600">Grade: {student.avgGrade}%</span>
                        <span className="text-orange-600">Attendance: {student.attendance}%</span>
                        <span className="text-purple-600">Missing: {student.missingAssignments}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  Generate Intervention Plan
                </button>
              </div>
            </div>

            {/* Grade Comparison */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Target size={18} className="text-blue-600" />
                Grade Distribution by Course
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <ReBarChart data={courses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="code" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgGrade" fill="#10B981" name="Average Grade %" />
                  <Bar dataKey="passRate" fill="#3B82F6" name="Pass Rate %" />
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Attendance Report */}
        {reportType === "attendance" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                Attendance Overview
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" domain={[60, 100]} />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="attendance" fill="#3B82F6" stroke="#2563EB" fillOpacity={0.3} name="Attendance %" />
                  <Line yAxisId="right" type="monotone" dataKey="submissions" stroke="#10B981" name="Submissions %" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">{course.code} - {course.name}</h4>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Attendance Rate</span>
                      <span className="font-semibold text-green-600">{course.attendance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: `${course.attendance}%` }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                    <div>
                      <p className="text-gray-500">Total Students</p>
                      <p className="font-semibold">{course.students}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Present (Avg)</p>
                      <p className="font-semibold">{Math.round(course.students * course.attendance / 100)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Options and Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <Zap size={18} />
              Quick Export Options
            </h3>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-white text-green-700 rounded-lg text-sm font-medium hover:bg-green-50 transition flex items-center justify-center gap-2 border border-green-200">
                <FileText size={14} />
                PDF Report
              </button>
              <button className="flex-1 px-4 py-2 bg-white text-green-700 rounded-lg text-sm font-medium hover:bg-green-50 transition flex items-center justify-center gap-2 border border-green-200">
                <Download size={14} />
                Excel Data
              </button>
              <button className="flex-1 px-4 py-2 bg-white text-green-700 rounded-lg text-sm font-medium hover:bg-green-50 transition flex items-center justify-center gap-2 border border-green-200">
                <Mail size={14} />
                Email Report
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Info size={18} />
              Report Insights
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Overall performance has improved by 5.2% compared to last semester</li>
              <li>• Attendance rates are highest in Web Development (90%)</li>
              <li>• 8 students are currently at risk of failing</li>
              <li>• Average submission rate is 87% across all courses</li>
            </ul>
          </div>
        </div>

        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Reports;