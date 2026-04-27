import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  ClipboardList, 
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  Bell,
  ChevronRight,
  Download,
  Eye,
  Award,
  Target,
  PieChart,
  BarChart3,
  Activity,
  UserCheck,
  GraduationCap,
  Star,
  Mail,
  Settings,
  Plus,
  MoreVertical,
  Play,
  Video,
  FileSpreadsheet,
  ExternalLink
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

const LecturerDashboard = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [attendanceData, setAttendanceData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  // Enhanced stats with trends
  const stats = [
    { 
      label: "Active Classes", 
      value: 4, 
      icon: BookOpen,
      change: "+1",
      trend: "up",
      color: "blue",
      details: "This semester"
    },
    { 
      label: "Total Students", 
      value: 128, 
      icon: Users,
      change: "+12",
      trend: "up",
      color: "green",
      details: "Enrolled across all classes"
    },
    { 
      label: "Pending Assessments", 
      value: 23, 
      icon: ClipboardList,
      change: "-5",
      trend: "down",
      color: "yellow",
      details: "Need grading"
    },
    { 
      label: "Avg. Attendance", 
      value: "87%", 
      icon: UserCheck,
      change: "+3%",
      trend: "up",
      color: "purple",
      details: "This week"
    },
    { 
      label: "Completion Rate", 
      value: "92%", 
      icon: Target,
      change: "+5%",
      trend: "up",
      color: "indigo",
      details: "Course progress"
    },
    { 
      label: "Student Satisfaction", 
      value: "4.8", 
      icon: Star,
      change: "+0.3",
      trend: "up",
      color: "orange",
      details: "Out of 5"
    },
  ];

  // Course data
  const courses = [
    { 
      id: 1, 
      name: "Software Engineering", 
      code: "SE301",
      time: "10:00 AM - 12:00 PM", 
      day: "Monday & Wednesday",
      room: "Lab 204",
      students: 35,
      progress: 75,
      nextClass: "Today",
      upcomingAssignments: 2,
      gradesSubmitted: 18,
      totalGrades: 35,
      averageScore: 82,
      attendance: 89
    },
    { 
      id: 2, 
      name: "Database Systems", 
      code: "CS303",
      time: "2:00 PM - 4:00 PM", 
      day: "Tuesday & Thursday",
      room: "Hall B",
      students: 42,
      progress: 60,
      nextClass: "Tomorrow",
      upcomingAssignments: 3,
      gradesSubmitted: 25,
      totalGrades: 42,
      averageScore: 78,
      attendance: 85
    },
    { 
      id: 3, 
      name: "Web Development", 
      code: "CS401",
      time: "9:00 AM - 11:00 AM", 
      day: "Friday",
      room: "Lab 101",
      students: 28,
      progress: 85,
      nextClass: "Tomorrow",
      upcomingAssignments: 1,
      gradesSubmitted: 28,
      totalGrades: 28,
      averageScore: 88,
      attendance: 94
    },
    { 
      id: 4, 
      name: "Machine Learning", 
      code: "CS505",
      time: "1:00 PM - 3:00 PM", 
      day: "Monday & Friday",
      room: "Lab 305",
      students: 23,
      progress: 45,
      nextClass: "Monday",
      upcomingAssignments: 4,
      gradesSubmitted: 12,
      totalGrades: 23,
      averageScore: 75,
      attendance: 82
    },
  ];

  // Chart data for performance trends
  const performanceTrendData = {
    week: [
      { day: "Mon", avgScore: 78, attendance: 85 },
      { day: "Tue", avgScore: 82, attendance: 87 },
      { day: "Wed", avgScore: 79, attendance: 84 },
      { day: "Thu", avgScore: 85, attendance: 88 },
      { day: "Fri", avgScore: 83, attendance: 86 },
    ],
    month: [
      { week: "Week 1", avgScore: 76, attendance: 82 },
      { week: "Week 2", avgScore: 79, attendance: 85 },
      { week: "Week 3", avgScore: 81, attendance: 86 },
      { week: "Week 4", avgScore: 83, attendance: 88 },
    ],
    semester: [
      { month: "Jan", avgScore: 72, attendance: 80 },
      { month: "Feb", avgScore: 75, attendance: 83 },
      { month: "Mar", avgScore: 78, attendance: 85 },
      { month: "Apr", avgScore: 81, attendance: 87 },
    ]
  };

  // Grade distribution data
  const gradeDistribution = [
    { grade: "A", count: 28, color: "#10B981" },
    { grade: "B", count: 42, color: "#3B82F6" },
    { grade: "C", count: 35, color: "#F59E0B" },
    { grade: "D", count: 15, color: "#F97316" },
    { grade: "F", count: 8, color: "#EF4444" },
  ];

  // Upcoming tasks/assignments
  const tasks = [
    { id: 1, title: "Grade SE301 Midterm Exam", due: "Today", priority: "high", type: "grading", course: "Software Engineering" },
    { id: 2, title: "Prepare Database Systems Lecture", due: "Tomorrow", priority: "medium", type: "preparation", course: "Database Systems" },
    { id: 3, title: "Review Web Development Projects", due: "Dec 15", priority: "low", type: "review", course: "Web Development" },
    { id: 4, title: "Submit Exam Questions", due: "Dec 18", priority: "high", type: "exam", course: "Machine Learning" },
  ];

  // Recent announcements
  const announcements = [
    { id: 1, title: "Final Exam Schedule Released", date: "2024-12-01", views: 45, posted: "2 days ago" },
    { id: 2, title: "Guest Lecture on AI", date: "2024-12-05", views: 32, posted: "3 days ago" },
    { id: 3, title: "Holiday Schedule Changes", date: "2024-12-20", views: 28, posted: "5 days ago" },
  ];

  // Quick actions
  const quickActions = [
    { label: "Take Attendance", icon: UserCheck, color: "green", action: () => alert("Open attendance modal") },
    { label: "Upload Grades", icon: FileSpreadsheet, color: "blue", action: () => alert("Open grade upload") },
    { label: "Schedule Meeting", icon: Video, color: "purple", action: () => alert("Schedule meeting") },
    { label: "Create Assignment", icon: Plus, color: "orange", action: () => alert("Create assignment") },
    { label: "Send Announcement", icon: Mail, color: "indigo", action: () => alert("Send announcement") },
    { label: "Generate Report", icon: Download, color: "red", action: () => alert("Generate report") },
  ];

  // Load initial data
  useEffect(() => {
    // Simulate loading data
    setAttendanceData(performanceTrendData[selectedTimeframe]);
    setPerformanceData(performanceTrendData[selectedTimeframe]);
    setUpcomingTasks(tasks);
    
    // Simulate real-time notifications
    setNotifications([
      { id: 1, message: "New assignment submission from SE301", time: "5 mins ago", read: false },
      { id: 2, message: "Student query: Database Systems project", time: "1 hour ago", read: false },
      { id: 3, message: "Classroom changed for Web Development", time: "3 hours ago", read: true },
    ]);
  }, [selectedTimeframe]);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp size={14} className="text-green-500" /> : 
      <TrendingDown size={14} className="text-red-500" />;
  };

  const StatCard = ({ stat }) => {
    const IconComponent = stat.icon;
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group">
        <div className="flex justify-between items-start mb-3">
          <div className={`p-3 bg-${stat.color}-50 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent size={22} className={`text-${stat.color}-600`} />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            {stat.change}
            {getTrendIcon(stat.trend)}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
        <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
        <p className="text-xs text-gray-400 mt-2">{stat.details}</p>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header with Welcome Message and Notifications */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, Prof. Johnson! 👋
              </h1>
              <p className="text-gray-500">Here's what's happening with your courses today.</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-gray-200">
            <div className="flex flex-wrap gap-3 justify-center">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.action}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 text-sm font-medium text-gray-700 hover:scale-105"
                >
                  <action.icon size={16} className={`text-${action.color}-600`} />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Performance Trends */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <TrendingUp size={18} className="text-green-600" />
                    Performance Trends
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Student performance over time</p>
                </div>
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="semester">This Semester</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrendData[selectedTimeframe]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={selectedTimeframe === 'week' ? 'day' : selectedTimeframe === 'month' ? 'week' : 'month'} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="avgScore" stroke="#3B82F6" name="Avg. Score" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="attendance" stroke="#10B981" name="Attendance %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Grade Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
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
                    outerRadius={100}
                    paddingAngle={5}
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

          {/* Courses Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
              <button className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{course.name}</h3>
                        <p className="text-sm text-gray-500">{course.code}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>{course.time}</span>
                        <span className="text-gray-300">|</span>
                        <Calendar size={14} />
                        <span>{course.day}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={14} />
                        <span>{course.students} Students</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-green-600">{course.attendance}% Attendance</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Course Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Grades Info */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Grades Submitted</p>
                        <p className="text-sm font-semibold text-gray-800">{course.gradesSubmitted}/{course.totalGrades}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Average Score</p>
                        <p className="text-sm font-semibold text-green-600">{course.averageScore}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Upcoming</p>
                        <p className="text-sm font-semibold text-orange-600">{course.upcomingAssignments} tasks</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                    <div className="flex gap-3">
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                        View Details <ChevronRight size={14} />
                      </button>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Take Attendance
                      </button>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      course.nextClass === 'Today' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {course.nextClass}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks and Announcements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Tasks */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <AlertCircle size={18} className="text-orange-600" />
                  Pending Tasks
                </h3>
                <button className="text-xs text-green-600 hover:text-green-700">View All</button>
              </div>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-500' : 
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-gray-500">{task.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <MessageSquare size={18} className="text-blue-600" />
                  Recent Announcements
                </h3>
                <button className="text-xs text-green-600 hover:text-green-700">New Announcement</button>
              </div>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-gray-800">{announcement.title}</p>
                      <Eye size={14} className="text-gray-400" />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">{announcement.posted}</p>
                      <p className="text-xs text-gray-400">{announcement.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LecturerDashboard;