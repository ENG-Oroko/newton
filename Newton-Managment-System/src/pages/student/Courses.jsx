import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  BookOpen, 
  CreditCard, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  FileText, 
  Video, 
  Calendar,
  ChevronRight,
  Star,
  Bell,
  Download,
  ExternalLink,
  Menu,
  X,
  Loader,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const MyCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Simulated loading effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      label: "Active Courses",
      value: 5,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+2 this semester",
      detail: "3 completed, 2 in progress"
    },
    {
      label: "Total Credits",
      value: 15,
      icon: CreditCard,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "Required: 120",
      detail: "Completed: 45 credits"
    },
    {
      label: "Current GPA",
      value: "3.8",
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      trend: "↑ 0.2 from last sem",
      detail: "Dean's List candidate"
    },
    {
      label: "Study Hours",
      value: "42",
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "This week",
      detail: "Avg: 6 hrs/day"
    },
  ];

  const courses = [
    { 
      id: 1,
      code: "CS101", 
      name: "Programming Fundamentals", 
      lecturer: "Dr. Kamau",
      email: "dkamau@university.edu",
      schedule: "Mon/Wed 10:00 AM - 11:30 AM",
      venue: "CS Lab 1",
      progress: 75,
      assignments: 3,
      nextDeadline: "Apr 28, 2026",
      materials: 12,
      videos: 8,
      grade: "A-",
      attendance: 90,
      description: "Introduction to programming concepts, algorithms, and problem-solving using Python.",
      tags: ["Programming", "Python", "Beginner"]
    },
    { 
      id: 2,
      code: "CS201", 
      name: "Database Systems", 
      lecturer: "Dr. Akinyi",
      email: "akinyi@university.edu",
      schedule: "Tue/Thu 2:00 PM - 3:30 PM",
      venue: "IT Lab 3",
      progress: 60,
      assignments: 2,
      nextDeadline: "Apr 30, 2026",
      materials: 15,
      videos: 6,
      grade: "B+",
      attendance: 85,
      description: "Database design, SQL, normalization, and implementation of database systems.",
      tags: ["SQL", "Databases", "Data Modeling"]
    },
    { 
      id: 3,
      code: "CS301", 
      name: "Web Development", 
      lecturer: "Prof. Omondi",
      email: "pomondi@university.edu",
      schedule: "Mon/Wed 1:00 PM - 2:30 PM",
      venue: "Web Lab",
      progress: 45,
      assignments: 4,
      nextDeadline: "May 5, 2026",
      materials: 20,
      videos: 10,
      grade: "B",
      attendance: 78,
      description: "Modern web development with React, Node.js, and MongoDB.",
      tags: ["React", "Node.js", "MongoDB"]
    },
    { 
      id: 4,
      code: "MATH202", 
      name: "Discrete Mathematics", 
      lecturer: "Dr. Wanjiku",
      email: "mwanjiku@university.edu",
      schedule: "Tue/Thu 9:00 AM - 10:30 AM",
      venue: "Math Hall",
      progress: 80,
      assignments: 2,
      nextDeadline: "May 2, 2026",
      materials: 10,
      videos: 5,
      grade: "A",
      attendance: 95,
      description: "Mathematical structures, logic, combinatorics, and graph theory.",
      tags: ["Mathematics", "Logic", "Graph Theory"]
    },
  ];

  const filters = [
    { id: "all", label: "All Courses", color: "bg-gray-100 text-gray-700" },
    { id: "in-progress", label: "In Progress", color: "bg-blue-100 text-blue-700" },
    { id: "completed", label: "Completed", color: "bg-green-100 text-green-700" },
    { id: "high-grade", label: "High Grade", color: "bg-yellow-100 text-yellow-700" },
  ];

  const filteredCourses = courses.filter(course => {
    // Search filter
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.lecturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    let matchesFilter = true;
    if (selectedFilter === "in-progress") matchesFilter = course.progress < 100 && course.progress > 0;
    else if (selectedFilter === "completed") matchesFilter = course.progress === 100;
    else if (selectedFilter === "high-grade") matchesFilter = course.grade === "A" || course.grade === "A-";
    
    return matchesSearch && matchesFilter;
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-600";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getGradeColor = (grade) => {
    if (grade === "A" || grade === "A-") return "text-green-600 bg-green-50";
    if (grade === "B+" || grade === "B") return "text-blue-600 bg-blue-50";
    return "text-yellow-600 bg-yellow-50";
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Courses</h1>
        <p className="text-gray-500">Manage and track all your enrolled courses</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${s.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={s.color} size={22} />
                </div>
                <span className="text-xs font-medium text-gray-500">{s.trend}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {s.value}
                </h2>
                <p className="text-xs text-gray-400">{s.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by course name, code, or lecturer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  selectedFilter === filter.id
                    ? filter.color + " ring-2 ring-offset-1 ring-green-500"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition ${
                viewMode === "grid" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Menu size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition ${
                viewMode === "list" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>
        <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
          Download Report <Download size={14} />
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin text-green-600" size={40} />
        </div>
      )}

      {/* Courses Grid/List View */}
      {!loading && (
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Course Header */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 border-b border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-white text-green-700 font-medium">
                    {course.code}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getGradeColor(course.grade)}`}>
                    Grade: {course.grade}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Users size={14} />
                  {course.lecturer}
                </p>
              </div>

              {/* Course Body */}
              <div className="p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${getProgressColor(course.progress)} rounded-full h-2 transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Course Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar size={14} />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock size={14} />
                    <span>Next: {course.nextDeadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <FileText size={14} />
                    <span>{course.assignments} Assignments</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Video size={14} />
                    <span>{course.videos} Videos</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 px-3 py-2 text-sm rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    View Course <ChevronRight size={14} />
                  </button>
                  <button className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                    <FileText size={16} />
                  </button>
                  <button className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                    <Video size={16} />
                  </button>
                </div>
              </div>

              {/* Quick Stats Footer */}
              <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-500">Attendance: {course.attendance}%</span>
                <span className="text-gray-500">{course.materials} Materials</span>
                <button className="text-green-600 hover:text-green-700 flex items-center gap-1">
                  Details <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("all");
            }}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCourse(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{selectedCourse.name}</h3>
              <button onClick={() => setSelectedCourse(null)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-gray-600">Course Code</p>
                    <p className="font-semibold text-gray-800">{selectedCourse.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Current Grade</p>
                    <p className={`font-semibold ${selectedCourse.grade === "A" ? "text-green-600" : "text-blue-600"}`}>
                      {selectedCourse.grade}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lecturer</p>
                  <p className="font-medium text-gray-800">{selectedCourse.lecturer}</p>
                  <p className="text-xs text-gray-500">{selectedCourse.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Schedule</p>
                  <p className="font-medium text-gray-800">{selectedCourse.schedule}</p>
                  <p className="text-xs text-gray-500">Venue: {selectedCourse.venue}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Course Description</p>
                <p className="text-gray-700">{selectedCourse.description}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">Course Resources</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm">Lecture Notes</span>
                    <span className="text-xs text-gray-500">{selectedCourse.materials} files</span>
                    <button className="text-green-600 text-sm">Download</button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm">Video Lectures</span>
                    <span className="text-xs text-gray-500">{selectedCourse.videos} videos</span>
                    <button className="text-green-600 text-sm">Watch</button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm">Assignments</span>
                    <span className="text-xs text-gray-500">{selectedCourse.assignments} pending</span>
                    <button className="text-green-600 text-sm">Submit</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                  Go to Course
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">
                  Contact Lecturer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyCourses;