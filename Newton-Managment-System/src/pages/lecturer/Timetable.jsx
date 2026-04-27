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
  const [viewMode, setViewMode] = useState("week"); // week, month, list
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editingClass, setEditingClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showNotification, setShowNotification] = useState(null);

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
      blue: "bg-blue-100 border-blue-300 text-blue-700",
      green: "bg-green-100 border-green-300 text-green-700",
      purple: "bg-purple-100 border-purple-300 text-purple-700",
      orange: "bg-orange-100 border-orange-300 text-orange-700",
      red: "bg-red-100 border-red-300 text-red-700",
      pink: "bg-pink-100 border-pink-300 text-pink-700",
      indigo: "bg-indigo-100 border-indigo-300 text-indigo-700"
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
      id: schedule.length + 1,
      ...newClass,
      students: 0,
      attendance: 0,
      materials: []
    };

    setSchedule([...schedule, classItem]);
    setShowModal(false);
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
    showNotificationMessage("Class added successfully", "success");
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
    setEditingClass(null);
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
    showNotificationMessage("Class updated successfully", "success");
  };

  const showNotificationMessage = (message, type) => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  const exportTimetable = () => {
    const csvData = schedule.map(s => `${s.day},${s.class},${s.code},${s.time},${s.endTime},${s.room},${s.building},${s.instructor}`);
    const csvContent = "Day,Class,Code,Start Time,End Time,Room,Building,Instructor\n" + csvData.join("\n");
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

  // Week View
  const renderWeekView = () => (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          <div className="p-3 bg-gray-50 rounded-lg font-semibold text-gray-600">Time</div>
          {weekDays.map((day, idx) => (
            <div key={day} className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="font-semibold text-gray-800">{day}</p>
              <p className="text-xs text-gray-500">{weekDates[idx].toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {timeSlots.map(time => (
          <div key={time} className="grid grid-cols-6 gap-2 mb-2">
            <div className="p-2 bg-gray-50 rounded-lg text-sm text-gray-600 flex items-center justify-center">
              <Clock size={12} className="mr-1" />
              {time}
            </div>
            {weekDays.map(day => {
              const classItem = schedule.find(c => c.day === day && c.time === time);
              return (
                <div key={`${day}-${time}`} className="min-h-[80px]">
                  {classItem && (
                    <div 
                      className={`p-2 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getColorClasses(classItem.color)}`}
                      onClick={() => handleEditClass(classItem)}
                    >
                      <p className="font-semibold text-xs">{classItem.code}</p>
                      <p className="text-xs truncate">{classItem.class}</p>
                      <p className="text-xs mt-1">{classItem.room}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        {getTypeIcon(classItem.type)}
                        <span>{classItem.type}</span>
                      </div>
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

  // List View
  const renderListView = () => (
    <div className="space-y-4">
      {filteredSchedule.map((classItem) => (
        <div key={classItem.id} className={`p-4 rounded-xl border-2 ${getColorClasses(classItem.color)} shadow-sm hover:shadow-md transition-all`}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-800">{classItem.class}</h3>
                <span className="text-xs px-2 py-1 bg-white/50 rounded-full">{classItem.code}</span>
              </div>
              <p className="text-sm text-gray-600">{classItem.description}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleEditClass(classItem)}
                className="p-1.5 bg-white rounded-lg hover:bg-gray-100 transition"
              >
                <Edit size={14} />
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(classItem.id)}
                className="p-1.5 bg-white rounded-lg hover:bg-red-50 transition"
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} />
              <span>{classItem.day}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{classItem.time} - {classItem.endTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{classItem.room}, {classItem.building}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>{classItem.instructor}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/30 flex justify-between items-center">
            <div className="flex gap-3">
              <span className="text-xs flex items-center gap-1">
                <Users size={12} />
                {classItem.attendance}/{classItem.students} present
              </span>
              {classItem.zoomLink && (
                <a href={classItem.zoomLink} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 text-blue-600 hover:underline">
                  <Video size={12} />
                  Join Zoom
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white rounded-lg text-xs font-medium hover:bg-gray-50">
                View Materials
              </button>
              <button className="px-3 py-1 bg-white rounded-lg text-xs font-medium hover:bg-gray-50">
                Take Attendance
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Notification Toast */}
        {showNotification && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className={`rounded-lg shadow-lg p-4 ${
              showNotification.type === "success" ? "bg-green-50 border border-green-200" :
              showNotification.type === "error" ? "bg-red-50 border border-red-200" :
              "bg-blue-50 border border-blue-200"
            }`}>
              <div className="flex items-center gap-2">
                {showNotification.type === "success" && <CheckCircle size={18} className="text-green-600" />}
                {showNotification.type === "error" && <AlertCircle size={18} className="text-red-600" />}
                <span className="text-sm">{showNotification.message}</span>
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
            <p className="text-gray-500 mt-1">Manage your weekly class schedule</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportTimetable}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition flex items-center gap-2 shadow-md"
            >
              <Plus size={18} />
              Add Class
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs text-gray-500">Total Classes</p>
            <h2 className="text-2xl font-bold">{schedule.length}</h2>
            <p className="text-xs text-green-600 mt-1">This week</p>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs text-gray-500">Today's Classes</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {schedule.filter(c => c.day === weekDays[new Date().getDay() - 1]).length}
            </h2>
            <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs text-gray-500">Total Students</p>
            <h2 className="text-2xl font-bold text-purple-600">
              {schedule.reduce((sum, c) => sum + c.students, 0)}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Enrolled</p>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <p className="text-xs text-gray-500">Avg. Attendance</p>
            <h2 className="text-2xl font-bold text-green-600">
              {Math.round(schedule.reduce((sum, c) => sum + c.attendance, 0) / schedule.reduce((sum, c) => sum + c.students, 0) * 100)}%
            </h2>
            <p className="text-xs text-gray-500 mt-1">This week</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
            <p className="text-xs text-orange-600">Today's Schedule</p>
            <h2 className="text-2xl font-bold text-orange-700">
              {schedule.filter(c => c.day === weekDays[new Date().getDay() - 1]).length}
            </h2>
            <p className="text-xs text-orange-600 mt-1">Classes remaining</p>
          </div>
        </div>

        {/* View Controls */}
        <div className="bg-white border rounded-xl p-4 mb-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("week")}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  viewMode === "week" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid size={16} />
                Week View
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  viewMode === "list" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List size={16} />
                List View
              </button>
            </div>

            {viewMode === "week" && (
              <div className="flex items-center gap-3">
                <button onClick={() => navigateWeek(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft size={20} />
                </button>
                <span className="font-medium">
                  {weekDates[0].toLocaleDateString()} - {weekDates[4].toLocaleDateString()}
                </span>
                <button onClick={() => navigateWeek(1)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight size={20} />
                </button>
                <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-sm bg-gray-100 rounded-lg">
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
                  className="pl-9 pr-3 py-2 border rounded-lg text-sm w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border rounded-lg text-sm"
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

        {/* Today's Schedule Sidebar */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Bell size={18} />
              Upcoming Classes
            </h3>
            <div className="space-y-3">
              {schedule.filter(c => c.day === weekDays[new Date().getDay() - 1]).slice(0, 3).map(classItem => (
                <div key={classItem.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-medium">{classItem.class}</p>
                    <p className="text-xs text-gray-500">{classItem.time} - {classItem.endTime} | {classItem.room}</p>
                  </div>
                  {classItem.zoomLink && (
                    <a href={classItem.zoomLink} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1">
                      <Video size={12} />
                      Join
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
            <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
              <Award size={18} />
              Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-purple-700">
              <li>• Click on any class to edit details</li>
              <li>• Use week view to see full schedule</li>
              <li>• Export timetable for printing</li>
              <li>• Add Zoom links for online classes</li>
            </ul>
          </div>
        </div>

        {/* Add/Edit Class Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CalendarDays size={20} className="text-green-600" />
                  {editingClass ? "Edit Class" : "Add New Class"}
                </h2>
                <button onClick={() => {
                  setShowModal(false);
                  setEditingClass(null);
                }} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Day *</label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg"
                      value={newClass.day}
                      onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                    >
                      {days.map(day => <option key={day} value={day}>{day}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class Type</label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg"
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
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., Introduction to Programming"
                    value={newClass.class}
                    onChange={(e) => setNewClass({...newClass, class: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="e.g., CS101"
                      value={newClass.code}
                      onChange={(e) => setNewClass({...newClass, code: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={newClass.time}
                      onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={newClass.endTime}
                      onChange={(e) => setNewClass({...newClass, endTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="e.g., Lab 301"
                      value={newClass.room}
                      onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
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
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., Prof. John Doe"
                    value={newClass.instructor}
                    onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zoom Link (Optional)</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://zoom.us/..."
                    value={newClass.zoomLink}
                    onChange={(e) => setNewClass({...newClass, zoomLink: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Course description..."
                    value={newClass.description}
                    onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t p-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingClass(null);
                  }}
                  className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={editingClass ? handleUpdateClass : handleAddClass}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this class? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteClass(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Timetable;