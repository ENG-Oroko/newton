import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Video,
  Bell,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Printer,
  Share2,
  Sun,
  Moon,
  Coffee,
  Laptop,
  AlertCircle,
  CheckCircle,
  X,
  Search,
  Grid,
  List,
  Calendar as CalendarIcon,
  Settings,
  RefreshCw,
  MessageCircle,
  FileText,
  Award
} from "lucide-react";

const Timetable = () => {
  const [viewMode, setViewMode] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showNotification, setShowNotification] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const [schedule, setSchedule] = useState([
    {
      id: 1,
      day: "Monday",
      class: "Introduction to Programming",
      code: "CS101",
      time: "09:00",
      endTime: "10:30",
      room: "Lab 301",
      building: "Science Block",
      instructor: "Prof. John Doe",
      type: "Lecture",
      color: "blue",
      zoomLink: "https://zoom.us/123456",
      description: "Weekly programming fundamentals lecture",
      students: 45,
      attendance: 42,
      materials: ["slides.pdf", "code_examples.zip"]
    },
    {
      id: 2,
      day: "Tuesday",
      class: "Data Structures",
      code: "CS202",
      time: "11:00",
      endTime: "12:30",
      room: "Hall 205",
      building: "Main Building",
      instructor: "Prof. Jane Smith",
      type: "Lecture",
      color: "green",
      zoomLink: "https://zoom.us/789012",
      description: "Advanced data structures and algorithms",
      students: 38,
      attendance: 35,
      materials: ["ds_notes.pdf"]
    },
    {
      id: 3,
      day: "Wednesday",
      class: "Database Systems",
      code: "CS303",
      time: "14:00",
      endTime: "15:30",
      room: "Lab 102",
      building: "Science Block",
      instructor: "Dr. Robert Johnson",
      type: "Lab",
      color: "purple",
      zoomLink: "https://zoom.us/345678",
      description: "SQL and database design practical session",
      students: 42,
      attendance: 40,
      materials: ["lab_manual.pdf", "sql_scripts.sql"]
    },
    {
      id: 4,
      day: "Thursday",
      class: "Web Development",
      code: "CS404",
      time: "13:00",
      endTime: "15:00",
      room: "Lab 205",
      building: "Tech Hub",
      instructor: "Prof. Sarah Wilson",
      type: "Practical",
      color: "orange",
      zoomLink: "https://zoom.us/901234",
      description: "Hands-on web development with React",
      students: 35,
      attendance: 33,
      materials: ["react_tutorial.pdf"]
    },
    {
      id: 5,
      day: "Friday",
      class: "Research Seminar",
      code: "CS500",
      time: "10:00",
      endTime: "12:00",
      room: "Conference Room A",
      building: "Admin Block",
      instructor: "Dr. Michael Brown",
      type: "Seminar",
      color: "red",
      zoomLink: "https://zoom.us/567890",
      description: "Weekly research presentations and discussions",
      students: 50,
      attendance: 48,
      materials: ["research_papers.pdf"]
    }
  ]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  
  const [newClass, setNewClass] = useState({
    day: "Monday",
    class: "",
    code: "",
    time: "09:00",
    endTime: "10:30",
    room: "",
    building: "",
    instructor: "",
    type: "Lecture",
    color: "blue",
    zoomLink: "",
    description: ""
  });

  const getDayClasses = (day) => {
    return schedule.filter(c => c.day === day);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 border-blue-300 text-blue-700 hover:shadow-blue-200",
      green: "bg-green-100 border-green-300 text-green-700 hover:shadow-green-200",
      purple: "bg-purple-100 border-purple-300 text-purple-700 hover:shadow-purple-200",
      orange: "bg-orange-100 border-orange-300 text-orange-700 hover:shadow-orange-200",
      red: "bg-red-100 border-red-300 text-red-700 hover:shadow-red-200",
      pink: "bg-pink-100 border-pink-300 text-pink-700 hover:shadow-pink-200",
      indigo: "bg-indigo-100 border-indigo-300 text-indigo-700 hover:shadow-indigo-200"
    };
    return colors[color] || colors.blue;
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case "Lecture": return <BookOpen size={14} />;
      case "Lab": return <Laptop size={14} />;
      case "Practical": return <Coffee size={14} />;
      case "Seminar": return <Users size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  const handleAddClass = () => {
    if (!newClass.class || !newClass.code || !newClass.room) {
      showNotificationMessage("Please fill all required fields", "error");
      return;
    }

    const classItem = {
      id: Date.now(),
      ...newClass,
      students: 0,
      attendance: 0,
      materials: []
    };

    setSchedule([...schedule, classItem]);
    setShowModal(false);
    resetForm();
    showNotificationMessage("Class added successfully", "success");
  };

  const resetForm = () => {
    setNewClass({
      day: "Monday",
      class: "",
      code: "",
      time: "09:00",
      endTime: "10:30",
      room: "",
      building: "",
      instructor: "",
      type: "Lecture",
      color: "blue",
      zoomLink: "",
      description: ""
    });
    setEditingClass(null);
  };

  const handleDeleteClass = (id) => {
    setSchedule(schedule.filter(c => c.id !== id));
    setShowDeleteConfirm(null);
    showNotificationMessage("Class deleted successfully", "success");
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setNewClass(classItem);
    setShowModal(true);
  };

  const handleUpdateClass = () => {
    setSchedule(schedule.map(c => 
      c.id === editingClass.id ? { ...newClass, id: c.id } : c
    ));
    setShowModal(false);
    resetForm();
    showNotificationMessage("Class updated successfully", "success");
  };

  const showNotificationMessage = (message, type) => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  const exportTimetable = () => {
    const headers = ["Day", "Class", "Code", "Start Time", "End Time", "Room", "Building", "Instructor", "Type"];
    const csvData = schedule.map(s => [
      s.day, s.class, s.code, s.time, s.endTime, s.room, s.building, s.instructor, s.type
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timetable_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showNotificationMessage("Timetable exported successfully", "success");
  };

  const getCurrentWeekDates = () => {
    const dates = [];
    const today = new Date(currentDate);
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getCurrentWeekDates();
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const filteredSchedule = useMemo(() => {
    let filtered = schedule;
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType !== "all") {
      filtered = filtered.filter(c => c.type === filterType);
    }
    return filtered;
  }, [schedule, searchTerm, filterType]);

  const getTodayClasses = () => {
    const today = new Date();
    const todayName = weekDays[today.getDay() - 1];
    return schedule.filter(c => c.day === todayName);
  };

  const renderWeekView = () => (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Header */}
        <div className="grid grid-cols-6 gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl font-semibold text-gray-600 text-center">
            Time
          </div>
          {weekDays.map((day, idx) => (
            <div key={day} className="p-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl text-center">
              <p className="font-semibold text-gray-800">{day}</p>
              <p className="text-xs text-gray-500 mt-1">{weekDates[idx].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {timeSlots.map(time => (
          <div key={time} className="grid grid-cols-6 gap-3 mb-3">
            <div className="p-2 bg-gray-50 rounded-xl text-sm text-gray-600 flex items-center justify-center font-medium">
              <Clock size={14} className="mr-2" />
              {time}
            </div>
            {weekDays.map(day => {
              const classItem = schedule.find(c => c.day === day && c.time === time);
              return (
                <div key={`${day}-${time}`} className="min-h-[100px]">
                  {classItem && (
                    <div 
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${getColorClasses(classItem.color)}`}
                      onClick={() => handleEditClass(classItem)}
                    >
                      <p className="font-bold text-xs uppercase">{classItem.code}</p>
                      <p className="text-sm font-semibold mt-1 line-clamp-2">{classItem.class}</p>
                      <p className="text-xs mt-2 flex items-center gap-1">
                        <MapPin size={10} />
                        {classItem.room}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs">
                        {getTypeIcon(classItem.type)}
                        <span className="font-medium">{classItem.type}</span>
                      </div>
                      {classItem.zoomLink && (
                        <div className="mt-2 text-xs flex items-center gap-1 text-blue-600">
                          <Video size={10} />
                          Online Available
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredSchedule.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <CalendarDays size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No classes found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        filteredSchedule.map((classItem) => (
          <div key={classItem.id} className={`p-5 rounded-xl border-2 ${getColorClasses(classItem.color)} shadow-sm hover:shadow-md transition-all duration-200 group`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">{classItem.class}</h3>
                  <span className="text-xs px-2 py-1 bg-white/60 rounded-full font-mono">{classItem.code}</span>
                  <span className={`text-xs px-2 py-1 rounded-full bg-white/60`}>
                    {classItem.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{classItem.description}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditClass(classItem)}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm"
                  title="Edit Class"
                >
                  <Edit size={16} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(classItem.id)}
                  className="p-2 bg-white rounded-lg hover:bg-red-50 transition-all duration-200 shadow-sm"
                  title="Delete Class"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <CalendarDays size={14} className="text-gray-500" />
                <span>{classItem.day}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={14} className="text-gray-500" />
                <span>{classItem.time} - {classItem.endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={14} className="text-gray-500" />
                <span>{classItem.room}, {classItem.building}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Users size={14} className="text-gray-500" />
                <span>Instructor: {classItem.instructor}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-wrap gap-3">
                <span className="text-xs flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full">
                  <Users size={12} />
                  {classItem.attendance}/{classItem.students} Present
                </span>
                <span className="text-xs flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full">
                  <FileText size={12} />
                  {classItem.materials.length} Materials
                </span>
              </div>
              <div className="flex gap-2">
                {classItem.zoomLink && (
                  <a 
                    href={classItem.zoomLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-all duration-200 flex items-center gap-1"
                  >
                    <Video size={12} />
                    Join Zoom
                  </a>
                )}
                <button className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-1 shadow-sm">
                  <FileText size={12} />
                  Materials
                </button>
                <button className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-1 shadow-sm">
                  <Users size={12} />
                  Attendance
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const todayClasses = getTodayClasses();
  const totalStudents = schedule.reduce((sum, c) => sum + c.students, 0);
  const totalAttendance = schedule.reduce((sum, c) => sum + c.attendance, 0);
  const avgAttendanceRate = totalStudents > 0 ? Math.round((totalAttendance / totalStudents) * 100) : 0;

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
              <CalendarDays className="text-green-600" size={28} />
              Academic Timetable
            </h1>
            <p className="text-gray-500 mt-1">Manage your weekly class schedule and track attendance</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportTimetable}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              Add Class
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-gray-500 font-medium">Total Classes</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-1">{schedule.length}</h2>
            <p className="text-xs text-green-600 mt-1">This week</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-gray-500 font-medium">Today's Classes</p>
            <h2 className="text-2xl font-bold text-blue-600 mt-1">{todayClasses.length}</h2>
            <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-gray-500 font-medium">Total Students</p>
            <h2 className="text-2xl font-bold text-purple-600 mt-1">{totalStudents}</h2>
            <p className="text-xs text-gray-500 mt-1">Enrolled</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-gray-500 font-medium">Avg. Attendance</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">{avgAttendanceRate}%</h2>
            <p className="text-xs text-gray-500 mt-1">Overall rate</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 transition-all duration-200">
            <p className="text-xs text-orange-600 font-medium">Today's Schedule</p>
            <h2 className="text-2xl font-bold text-orange-700 mt-1">
              {todayClasses.filter(c => {
                const now = new Date();
                const classTime = new Date();
                const [hours, minutes] = c.time.split(':');
                classTime.setHours(parseInt(hours), parseInt(minutes));
                return classTime > now;
              }).length}
            </h2>
            <p className="text-xs text-orange-600 mt-1">Classes remaining</p>
          </div>
        </div>

        {/* View Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("week")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  viewMode === "week" 
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid size={16} />
                Week View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  viewMode === "list" 
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List size={16} />
                List View
              </button>
            </div>

            {viewMode === "week" && (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigateWeek(-1)} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  title="Previous Week"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-medium text-gray-700">
                  {weekDates[0].toLocaleDateString()} - {weekDates[4].toLocaleDateString()}
                </span>
                <button 
                  onClick={() => navigateWeek(1)} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  title="Next Week"
                >
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date())} 
                  className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
                >
                  Today
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Lecture">Lectures</option>
                <option value="Lab">Labs</option>
                <option value="Practical">Practicals</option>
                <option value="Seminar">Seminars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === "week" ? renderWeekView() : renderListView()}

        {/* Today's Schedule & Quick Tips */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <Bell size={18} />
              Today's Schedule
            </h3>
            {todayClasses.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No classes scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {todayClasses.map(classItem => (
                  <div key={classItem.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-semibold text-gray-800">{classItem.class}</p>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{classItem.code}</span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <Clock size={12} />
                        {classItem.time} - {classItem.endTime} | 
                        <MapPin size={12} />
                        {classItem.room}
                      </p>
                    </div>
                    {classItem.zoomLink && (
                      <a 
                        href={classItem.zoomLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-blue-700 transition-all duration-200"
                      >
                        <Video size={14} />
                        Join Now
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
              <Award size={18} />
              Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-purple-700">
              <li className="flex items-start gap-2">• Click on any class to edit details</li>
              <li className="flex items-start gap-2">• Use week view to see full schedule</li>
              <li className="flex items-start gap-2">• Export timetable for record keeping</li>
              <li className="flex items-start gap-2">• Add Zoom links for online classes</li>
              <li className="flex items-start gap-2">• Track attendance from class details</li>
            </ul>
          </div>
        </div>

        {/* Add/Edit Class Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CalendarDays size={20} className="text-green-600" />
                  {editingClass ? "Edit Class" : "Add New Class"}
                </h2>
                <button 
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Day *</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                      value={newClass.day}
                      onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                    >
                      {days.map(day => <option key={day} value={day}>{day}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Type *</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                      value={newClass.type}
                      onChange={(e) => setNewClass({...newClass, type: e.target.value})}
                    >
                      <option value="Lecture">Lecture</option>
                      <option value="Lab">Lab</option>
                      <option value="Practical">Practical</option>
                      <option value="Seminar">Seminar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., Introduction to Programming"
                    value={newClass.class}
                    onChange={(e) => setNewClass({...newClass, class: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="e.g., CS101"
                      value={newClass.code}
                      onChange={(e) => setNewClass({...newClass, code: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                      value={newClass.color}
                      onChange={(e) => setNewClass({...newClass, color: e.target.value})}
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                      <option value="red">Red</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      value={newClass.time}
                      onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      value={newClass.endTime}
                      onChange={(e) => setNewClass({...newClass, endTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="e.g., Lab 301"
                      value={newClass.room}
                      onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="e.g., Science Block"
                      value={newClass.building}
                      onChange={(e) => setNewClass({...newClass, building: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="e.g., Prof. John Doe"
                    value={newClass.instructor}
                    onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zoom Link (Optional)</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="https://zoom.us/..."
                    value={newClass.zoomLink}
                    onChange={(e) => setNewClass({...newClass, zoomLink: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                    placeholder="Course description..."
                    value={newClass.description}
                    onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={editingClass ? handleUpdateClass : handleAddClass}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md"
                >
                  {editingClass ? "Update Class" : "Add Class"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this class? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteClass(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Timetable;