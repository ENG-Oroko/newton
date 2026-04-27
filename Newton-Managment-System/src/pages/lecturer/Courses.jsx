import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  BookOpen, 
  Plus, 
  Users, 
  Search, 
  Filter, 
  MoreVertical,
  Clock,
  Calendar,
  BarChart3,
  Download,
  Edit,
  Trash2,
  Eye,
  Share2,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  X,
  ChevronRight,
  GraduationCap,
  FileText,
  Video,
  MessageCircle,
  Settings
} from "lucide-react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [courses, setCourses] = useState([
    { 
      id: 1,
      code: "CS101", 
      name: "Introduction to Programming", 
      students: 45,
      credits: 3,
      semester: "Fall 2025",
      schedule: "Mon/Wed 10:00 AM - 11:30 AM",
      room: "Lab 301",
      status: "active",
      progress: 75,
      assignments: 8,
      averageGrade: 78.5,
      description: "Fundamentals of programming using Python",
      instructor: "Prof. John Doe",
      department: "Computer Science"
    },
    { 
      id: 2,
      code: "CS202", 
      name: "Data Structures", 
      students: 38,
      credits: 4,
      semester: "Fall 2025",
      schedule: "Tue/Thu 1:00 PM - 2:30 PM",
      room: "Hall 205",
      status: "active",
      progress: 68,
      assignments: 6,
      averageGrade: 74.2,
      description: "Advanced data structures and algorithms",
      instructor: "Prof. Jane Smith",
      department: "Computer Science"
    },
    { 
      id: 3,
      code: "CS303", 
      name: "Database Systems", 
      students: 42,
      credits: 3,
      semester: "Fall 2025",
      schedule: "Fri 9:00 AM - 12:00 PM",
      room: "Lab 102",
      status: "active",
      progress: 82,
      assignments: 5,
      averageGrade: 81.3,
      description: "Database design and SQL programming",
      instructor: "Dr. Robert Johnson",
      department: "Computer Science"
    },
    { 
      id: 4,
      code: "CS404", 
      name: "Web Development", 
      students: 35,
      credits: 3,
      semester: "Spring 2026",
      schedule: "Mon/Wed 2:00 PM - 3:30 PM",
      room: "Lab 205",
      status: "upcoming",
      progress: 0,
      assignments: 0,
      averageGrade: 0,
      description: "Modern web development with React and Node.js",
      instructor: "Prof. Sarah Wilson",
      department: "Computer Science"
    },
  ]);

  const stats = {
    total: courses.length,
    active: courses.filter(c => c.status === "active").length,
    totalStudents: courses.reduce((sum, c) => sum + c.students, 0),
    averageProgress: Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length),
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    setShowDeleteConfirm(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "active": return "green";
      case "upcoming": return "blue";
      case "completed": return "gray";
      default: return "gray";
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "active": return "bg-green-100 text-green-700";
      case "upcoming": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HEADER SECTION */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <BookOpen className="text-green-600" size={28} />
                My Courses
              </h1>
              <p className="text-gray-500">Manage and monitor all your teaching courses</p>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <BookOpen size={20} className="text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Courses</p>
            <p className="text-xs text-blue-600 mt-1">This semester</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{stats.active}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Active Courses</p>
            <p className="text-xs text-green-600 mt-1">Currently running</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Users size={20} className="text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{stats.totalStudents}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Students</p>
            <p className="text-xs text-purple-600 mt-1">Enrolled across courses</p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-orange-200 rounded-xl">
                <TrendingUp size={20} className="text-orange-700" />
              </div>
              <span className="text-2xl font-bold text-orange-700">{stats.averageProgress}%</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">Average Progress</p>
            <p className="text-xs text-orange-700 mt-1">Course completion rate</p>
          </div>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Search size={16} />
                Search Courses
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by course name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Filter size={16} />
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Export Button */}
            <div className="md:w-auto flex items-end">
              <button className="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
                <Download size={16} />
                Export List
              </button>
            </div>
          </div>
        </div>

        {/* COURSES GRID */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const statusColor = getStatusColor(course.status);
              const statusBadge = getStatusBadge(course.status);
              
              return (
                <div 
                  key={course.id} 
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Course Header */}
                  <div className="relative h-32 bg-gradient-to-r from-green-600 to-green-700 p-5">
                    <div className="flex justify-between items-start">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                        <BookOpen size={24} className="text-white" />
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                          <Edit size={14} className="text-white" />
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(course.id)}
                          className="p-1.5 bg-white/20 rounded-lg hover:bg-red-500/50 transition-colors"
                        >
                          <Trash2 size={14} className="text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusBadge} font-medium`}>
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-5">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                          {course.code}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span>4.5</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {course.description}
                      </p>
                    </div>

                    {/* Course Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users size={14} />
                          <span>{course.students} Students</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <GraduationCap size={14} />
                          <span>{course.credits} Credits</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        <span>{course.schedule}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span>{course.semester}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {course.status === "active" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Course Progress</span>
                          <span className="text-green-600 font-semibold">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stats Row */}
                    {course.status === "active" && (
                      <div className="grid grid-cols-2 gap-3 mb-4 pt-3 border-t border-gray-100">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Assignments</p>
                          <p className="text-sm font-semibold text-gray-700">{course.assignments}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Avg. Grade</p>
                          <p className="text-sm font-semibold text-gray-700">{course.averageGrade}%</p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                        <Eye size={14} />
                        View Details
                      </button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                        <MessageCircle size={14} />
                      </button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                        <Settings size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* QUICK ACTIONS SECTION */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-blue-200 rounded-xl">
                <FileText size={20} className="text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Recent Assignments</h3>
                <p className="text-sm text-blue-700">5 pending submissions to grade</p>
                <button className="mt-3 text-sm text-blue-700 font-medium hover:text-blue-800 flex items-center gap-1">
                  View all <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-purple-200 rounded-xl">
                <Video size={20} className="text-purple-700" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-800 mb-1">Upcoming Lectures</h3>
                <p className="text-sm text-purple-700">Next class in 2 hours</p>
                <button className="mt-3 text-sm text-purple-700 font-medium hover:text-purple-800 flex items-center gap-1">
                  Join now <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-green-200 rounded-xl">
                <BarChart3 size={20} className="text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Analytics</h3>
                <p className="text-sm text-green-700">Attendance rate: 85% this week</p>
                <button className="mt-3 text-sm text-green-700 font-medium hover:text-green-800 flex items-center gap-1">
                  View report <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DELETE CONFIRMATION MODAL */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Delete Course</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this course? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteCourse(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD COURSE MODAL (Placeholder) */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Create New Course</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Course creation form would go here with all necessary fields.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                  Create Course
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Courses;