import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  BookOpen, 
  ClipboardList, 
  CreditCard, 
  TrendingUp, 
  Bell, 
  Calendar, 
  Clock, 
  ArrowRight,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Award,
  Users,
  FileText,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

const StudentDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Dynamic greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const stats = [
    {
      label: "Active Courses",
      value: 6,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+2 this semester",
      trendUp: true
    },
    {
      label: "Pending Assignments",
      value: 3,
      icon: ClipboardList,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "2 due this week",
      trendUp: false
    },
    {
      label: "Current GPA",
      value: "3.8",
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "↑ 0.2 from last sem",
      trendUp: true
    },
    {
      label: "Fees Balance",
      value: "KES 12,000",
      icon: CreditCard,
      color: "text-red-600",
      bg: "bg-red-50",
      trend: "Due: May 15, 2026",
      trendUp: false
    },
  ];

  const activities = [
    { 
      text: "Assignment submitted for Mathematics", 
      time: "2h ago",
      type: "success",
      icon: CheckCircle
    },
    { 
      text: "Fee payment received", 
      time: "1 day ago",
      type: "info",
      icon: CreditCard
    },
    { 
      text: "New grade published in Physics", 
      time: "2 days ago",
      type: "warning",
      icon: AlertCircle
    },
    { 
      text: "Discussion forum post in Database Systems", 
      time: "3 days ago",
      type: "default",
      icon: MessageCircle
    },
  ];

  const deadlines = [
    { title: "Database Project", date: "28 Apr 2026", priority: "high", submissions: 45 },
    { title: "Math Assignment", date: "30 Apr 2026", priority: "medium", submissions: 32 },
    { title: "Final Exams", date: "10 May 2026", priority: "high", submissions: 120 },
  ];

  const courses = [
    { 
      name: "Database Systems", 
      code: "CS301", 
      progress: 75, 
      nextClass: "Today, 2:00 PM",
      grade: "A-",
      instructor: "Dr. Sarah Kim"
    },
    { 
      name: "Advanced Mathematics", 
      code: "MATH202", 
      progress: 60, 
      nextClass: "Tomorrow, 10:00 AM",
      grade: "B+",
      instructor: "Prof. James Otieno"
    },
    { 
      name: "Physics Laboratory", 
      code: "PHY101", 
      progress: 90, 
      nextClass: "Wed, 9:00 AM",
      grade: "A",
      instructor: "Dr. Mary Wanjiku"
    },
  ];

  const announcements = [
    { title: "Library Hours Extended", date: "Apr 20, 2026", important: true },
    { title: "Scholarship Applications Open", date: "Apr 18, 2026", important: false },
    { title: "Guest Lecture: AI in Healthcare", date: "Apr 25, 2026", important: true },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {greeting}, John! 👋
            </h1>
          </div>
        </div>
      </div>

      {/* Stats Grid with Animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
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
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Courses */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen size={18} className="text-green-600" />
                Active Courses
              </h3>
              <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {courses.map((course, i) => (
                <div 
                  key={i} 
                  className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">{course.name}</h4>
                      <p className="text-xs text-gray-500">{course.code} • {course.instructor}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-green-600">{course.grade}</span>
                      <p className="text-xs text-gray-500">{course.nextClass}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={18} className="text-green-600" />
              <h3 className="font-semibold text-gray-800">Recent Activity</h3>
            </div>

            <div className="space-y-3">
              {activities.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-xl group hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Icon size={16} className="text-green-600" />
                      </div>
                      <p className="text-sm text-gray-700">{a.text}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{a.time}</span>
                      <button className="opacity-0 group-hover:opacity-100 transition">
                        <Eye size={14} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          
          {/* Upcoming Deadlines with Progress */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-red-500" />
              Upcoming Deadlines
            </h3>

            <div className="space-y-3">
              {deadlines.map((d, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border ${getPriorityColor(d.priority)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium">{d.title}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/50">
                      {d.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>{d.submissions} submissions</span>
                    <button className="text-xs font-medium hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition-all hover:scale-105 flex flex-col items-center gap-2">
                <BookOpen size={20} />
                <span>View Courses</span>
              </button>

              <button className="p-3 rounded-xl bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-all hover:scale-105 flex flex-col items-center gap-2">
                <ClipboardList size={20} />
                <span>Assignments</span>
              </button>

              <button className="p-3 rounded-xl bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-all hover:scale-105 flex flex-col items-center gap-2">
                <TrendingUp size={20} />
                <span>Results</span>
              </button>

              <button className="p-3 rounded-xl bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-all hover:scale-105 flex flex-col items-center gap-2">
                <CreditCard size={20} />
                <span>Pay Fees</span>
              </button>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Bell size={18} className="text-green-600" />
              Announcements
            </h3>
            <div className="space-y-3">
              {announcements.map((ann, i) => (
                <div key={i} className="p-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-sm font-medium ${ann.important ? 'text-red-600' : 'text-gray-700'}`}>
                        {ann.title}
                      </p>
                      <p className="text-xs text-gray-500">{ann.date}</p>
                    </div>
                    {ann.important && (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Progress Summary */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Award size={18} className="text-yellow-500" />
              Academic Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Attendance Rate</span>
                <span className="font-semibold text-gray-800">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 rounded-full h-2" style={{ width: '92%' }} />
              </div>
              <div className="flex justify-between text-sm mt-3">
                <span className="text-gray-600">Credits Completed</span>
                <span className="font-semibold text-gray-800">48/120</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 rounded-full h-2" style={{ width: '40%' }} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal for Course Details (if selected) */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCourse(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedCourse.name}</h3>
              <button onClick={() => setSelectedCourse(null)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <p><span className="font-semibold">Course Code:</span> {selectedCourse.code}</p>
              <p><span className="font-semibold">Instructor:</span> {selectedCourse.instructor}</p>
              <p><span className="font-semibold">Current Grade:</span> {selectedCourse.grade}</p>
              <p><span className="font-semibold">Progress:</span> {selectedCourse.progress}%</p>
              <p><span className="font-semibold">Next Class:</span> {selectedCourse.nextClass}</p>
              <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                Go to Course
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;