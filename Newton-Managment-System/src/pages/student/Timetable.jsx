import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  User, 
  Bell,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Download,
  Share2,
  Settings,
  Video,
  BookOpen,
  Coffee,
  Sun,
  Moon,
  AlertCircle,
  CheckCircle,
  MoreVertical,
  Edit,
  Trash2,
  Copy
} from "lucide-react";

const Timetable = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState("week"); // week, day, list
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Get current time for "now" indicator
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      label: "Classes Today",
      value: 3,
      icon: CalendarDays,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "2 completed, 1 upcoming"
    },
    {
      label: "This Week",
      value: "12",
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "32 hours total"
    },
    {
      label: "Attendance Rate",
      value: "92%",
      icon: User,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "↑ 5% from last week"
    },
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  const schedule = [
    { 
      id: 1,
      day: "Monday", 
      unit: "CS101 - Programming Fundamentals", 
      code: "CS101",
      time: "8:00 AM - 10:00 AM",
      startTime: "8:00 AM",
      endTime: "10:00 AM",
      venue: "CS Lab 1",
      lecturer: "Dr. Kamau",
      type: "Lecture",
      color: "bg-blue-100 border-blue-300 text-blue-800",
      meetingLink: "https://zoom.us/meeting/123",
      isOnline: false,
      attendance: 92
    },
    { 
      id: 2,
      day: "Monday", 
      unit: "Physics Lab", 
      code: "PHY101",
      time: "2:00 PM - 5:00 PM",
      startTime: "2:00 PM",
      endTime: "5:00 PM",
      venue: "Science Block, Room 301",
      lecturer: "Dr. Maina",
      type: "Lab",
      color: "bg-green-100 border-green-300 text-green-800",
      meetingLink: null,
      isOnline: false,
      attendance: 88
    },
    { 
      id: 3,
      day: "Tuesday", 
      unit: "CS201 - Database Systems", 
      code: "CS201",
      time: "10:00 AM - 12:00 PM",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      venue: "IT Lab 3",
      lecturer: "Dr. Akinyi",
      type: "Lecture",
      color: "bg-purple-100 border-purple-300 text-purple-800",
      meetingLink: "https://zoom.us/meeting/456",
      isOnline: true,
      attendance: 85
    },
    { 
      id: 4,
      day: "Tuesday", 
      unit: "Mathematics", 
      code: "MATH202",
      time: "2:00 PM - 3:30 PM",
      startTime: "2:00 PM",
      endTime: "3:30 PM",
      venue: "Math Hall",
      lecturer: "Dr. Wanjiku",
      type: "Tutorial",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      meetingLink: null,
      isOnline: false,
      attendance: 78
    },
    { 
      id: 5,
      day: "Wednesday", 
      unit: "CS301 - Networking", 
      code: "CS301",
      time: "2:00 PM - 4:00 PM",
      startTime: "2:00 PM",
      endTime: "4:00 PM",
      venue: "CS Lab 2",
      lecturer: "Prof. Omondi",
      type: "Lecture",
      color: "bg-red-100 border-red-300 text-red-800",
      meetingLink: "https://zoom.us/meeting/789",
      isOnline: false,
      attendance: 95
    },
    { 
      id: 6,
      day: "Thursday", 
      unit: "Web Development", 
      code: "CS401",
      time: "11:00 AM - 1:00 PM",
      startTime: "11:00 AM",
      endTime: "1:00 PM",
      venue: "Web Lab",
      lecturer: "Dr. Otieno",
      type: "Practical",
      color: "bg-indigo-100 border-indigo-300 text-indigo-800",
      meetingLink: "https://zoom.us/meeting/101",
      isOnline: true,
      attendance: 90
    },
    { 
      id: 7,
      day: "Friday", 
      unit: "Research Methods", 
      code: "RES501",
      time: "9:00 AM - 11:00 AM",
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      venue: "Conference Room",
      lecturer: "Prof. Achieng",
      type: "Seminar",
      color: "bg-pink-100 border-pink-300 text-pink-800",
      meetingLink: null,
      isOnline: false,
      attendance: 82
    },
  ];

  const upcomingEvents = [
    { time: "10:00 AM", event: "CS201 - Database Systems", type: "class" },
    { time: "2:00 PM", event: "Mathematics Tutorial", type: "tutorial" },
    { time: "4:00 PM", event: "Study Group", type: "meeting" },
  ];

  const getCurrentDayEvents = () => {
    const today = daysOfWeek[currentWeek.getDay() - 1];
    return schedule.filter(s => s.day === today);
  };

  const getEventsForDay = (day) => {
    return schedule.filter(s => s.day === day);
  };

  const isCurrentTimeSlot = (timeSlot) => {
    const now = currentTime;
    const [hour, minute, period] = timeSlot.match(/(\d+):(\d+) (\w+)/).slice(1);
    let slotHour = parseInt(hour);
    if (period === "PM" && slotHour !== 12) slotHour += 12;
    if (period === "AM" && slotHour === 12) slotHour = 0;
    
    const slotTime = new Date();
    slotTime.setHours(slotHour, parseInt(minute), 0);
    
    return Math.abs(now - slotTime) < 30 * 60000;
  };

  const getWeekDates = () => {
    const dates = [];
    const start = new Date(currentWeek);
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Class Timetable</h1>
          <p className="text-gray-500">Manage your weekly schedule and track attendance</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${s.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={s.color} size={22} />
                </div>
                <span className="text-xs font-medium text-green-600">{s.trend}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <h2 className="text-2xl font-bold text-gray-800">{s.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Toggle & Navigation */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 rounded-xl text-sm transition ${
                viewMode === "week" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`px-4 py-2 rounded-xl text-sm transition ${
                viewMode === "day" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Day View
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-xl text-sm transition ${
                viewMode === "list" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              List View
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateWeek(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-gray-800">
              {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
              {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={() => navigateWeek(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => setCurrentWeek(new Date())}
              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
            >
              Today
            </button>
          </div>
        </div>

        {/* Week Days Header */}
        {viewMode === "week" && (
          <div className="grid grid-cols-7 gap-2 mt-4">
            {daysOfWeek.map((day, index) => (
              <div
                key={day}
                className={`text-center p-2 rounded-lg ${
                  isToday(weekDates[index]) ? "bg-green-100" : "bg-gray-50"
                }`}
              >
                <p className="text-sm font-semibold text-gray-800">{day}</p>
                <p className="text-xs text-gray-500">{weekDates[index].getDate()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Timetable View */}
      {viewMode === "week" && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Time Column Header */}
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="p-3 bg-gray-50 border-r border-gray-200"></div>
                {daysOfWeek.map((day, index) => (
                  <div
                    key={day}
                    className={`p-3 text-center ${
                      isToday(weekDates[index]) ? "bg-green-50" : "bg-gray-50"
                    } border-r border-gray-200`}
                  >
                    <p className="text-sm font-semibold text-gray-800">{day}</p>
                    <p className="text-xs text-gray-500">{weekDates[index].getDate()}</p>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map((timeSlot, slotIndex) => {
                const isNow = isCurrentTimeSlot(timeSlot);
                return (
                  <div key={timeSlot} className="grid grid-cols-8 border-b border-gray-200 hover:bg-gray-50">
                    <div className={`p-3 text-sm font-medium text-gray-600 border-r border-gray-200 ${
                      isNow ? "bg-yellow-50" : ""
                    }`}>
                      <Clock size={14} className="inline mr-1" />
                      {timeSlot}
                    </div>
                    {daysOfWeek.map((day, dayIndex) => {
                      const events = schedule.filter(
                        e => e.day === day && e.startTime === timeSlot
                      );
                      return (
                        <div
                          key={`${day}-${timeSlot}`}
                          className={`p-2 border-r border-gray-200 min-h-[100px] ${
                            isNow && isToday(weekDates[dayIndex]) ? "bg-yellow-50" : ""
                          }`}
                        >
                          {events.map(event => (
                            <div
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`${event.color} p-2 rounded-lg mb-1 cursor-pointer hover:shadow-md transition-all text-xs`}
                            >
                              <p className="font-semibold">{event.unit}</p>
                              <p className="text-xs mt-1">{event.venue}</p>
                              {event.isOnline && (
                                <span className="inline-flex items-center gap-1 mt-1 text-xs">
                                  <Video size={10} /> Online
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Day View */}
      {viewMode === "day" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="space-y-3">
            {schedule
              .filter(s => s.day === daysOfWeek[new Date().getDay() - 1])
              .map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedEvent(s)}
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800">{s.unit}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${s.color}`}>
                        {s.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {s.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {s.venue}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {s.lecturer}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        Attendance: {s.attendance}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="p-2 hover:bg-white rounded-lg transition">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="space-y-6">
            {daysOfWeek.map((day) => {
              const dayEvents = schedule.filter(s => s.day === day);
              if (dayEvents.length === 0) return null;
              return (
                <div key={day}>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <CalendarDays size={16} />
                    {day}
                  </h3>
                  <div className="space-y-2">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{event.unit}</p>
                          <p className="text-xs text-gray-500">{event.lecturer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{event.time}</p>
                          <p className="text-xs text-gray-500">{event.venue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Today's Schedule Sidebar */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Today's Schedule</h3>
          <div className="space-y-3">
            {getCurrentDayEvents().map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">{event.unit}</p>
                    <p className="text-xs text-gray-500">{event.time} • {event.venue}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-white rounded-lg text-sm text-green-600 hover:bg-gray-50">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-5">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Bell size={16} />
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-16 text-xs font-medium text-gray-600">{event.time}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{event.event}</p>
                  <p className="text-xs text-gray-500 capitalize">{event.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedEvent.unit}</h3>
                <button onClick={() => setSelectedEvent(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-700">{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-700">{selectedEvent.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User size={16} className="text-gray-400" />
                  <span className="text-gray-700">{selectedEvent.lecturer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen size={16} className="text-gray-400" />
                  <span className="text-gray-700">Attendance Rate: {selectedEvent.attendance}%</span>
                </div>
              </div>

              {selectedEvent.meetingLink && (
                <button className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                  Join Online Class
                </button>
              )}
              
              <div className="flex gap-2 mt-3">
                <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">
                  Add to Calendar
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Timetable;