import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Bell, AlertTriangle, Info, Calendar, CheckCircle, Clock, Filter, Archive, BookOpen, DollarSign, AlertCircle } from "lucide-react";

const Notices = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Exam timetable released",
      description: "Final examination schedule for Semester 2 has been published on the portal",
      category: "Exam",
      date: "Today",
      time: "9:00 AM",
      priority: "high",
      read: false,
    },
    {
      id: 2,
      title: "Fee payment deadline approaching",
      description: "Last date for fee submission is 30th April 2026. Late fee penalty applicable after deadline.",
      category: "Fees",
      date: "2 days ago",
      time: "3:30 PM",
      priority: "high",
      read: false,
    },
    {
      id: 3,
      title: "Library will be closed on Friday",
      description: "Due to maintenance work, library will remain closed on Friday from 9 AM to 2 PM",
      category: "Admin",
      date: "1 week ago",
      time: "11:00 AM",
      priority: "normal",
      read: true,
    },
    {
      id: 4,
      title: "Guest Lecture: AI in Modern World",
      description: "Dr. Sarah Johnson from MIT will be conducting a guest lecture on Friday",
      category: "Event",
      date: "3 days ago",
      time: "2:00 PM",
      priority: "normal",
      read: false,
    },
    {
      id: 5,
      title: "Scholarship Application Open",
      description: "Merit-based scholarship applications are now open for current students",
      category: "Scholarship",
      date: "5 days ago",
      time: "10:00 AM",
      priority: "high",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const stats = [
    { 
      label: "New Notices", 
      value: notices.filter(n => !n.read).length,
      icon: Bell,
      color: "blue",
      change: "+2 since yesterday"
    },
    { 
      label: "Total Notices", 
      value: notices.length,
      icon: Archive,
      color: "green",
      change: "Last 30 days"
    },
    { 
      label: "High Priority", 
      value: notices.filter(n => n.priority === "high").length,
      icon: AlertTriangle,
      color: "red",
      change: "Requires attention"
    },
    { 
      label: "Categories", 
      value: [...new Set(notices.map(n => n.category))].length,
      icon: Filter,
      color: "purple",
      change: "Different types"
    },
  ];

  const categories = ["all", ...new Set(notices.map(n => n.category))];

  const getPriorityStyles = (priority) => {
    switch(priority) {
      case "high":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          badge: "bg-red-100 text-red-700",
          label: "High Priority"
        };
      case "normal":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          badge: "bg-blue-100 text-blue-700",
          label: "Normal"
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          iconBg: "bg-gray-100",
          iconColor: "text-gray-600",
          badge: "bg-gray-100 text-gray-700",
          label: "Low"
        };
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case "Exam": return BookOpen;
      case "Fees": return DollarSign;
      case "Event": return Calendar;
      default: return AlertCircle;
    }
  };

  const markAsRead = (id) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, read: true } : notice
    ));
  };

  const markAllAsRead = () => {
    setNotices(notices.map(notice => ({ ...notice, read: true })));
  };

  const filteredNotices = notices.filter(notice => {
    if (filter === "unread") return !notice.read;
    if (filter === "read") return notice.read;
    return true;
  }).filter(notice => {
    if (selectedCategory === "all") return true;
    return notice.category === selectedCategory;
  });

  const unreadCount = notices.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HEADER SECTION */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Bell size={28} className="text-green-600" />
                Notices & Announcements
              </h1>
              <p className="text-gray-500">Official announcements from administration</p>
            </div>
            
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <CheckCircle size={16} />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            const colorClasses = {
              blue: "bg-blue-50 text-blue-600",
              green: "bg-green-50 text-green-600",
              red: "bg-red-50 text-red-600",
              purple: "bg-purple-50 text-purple-600",
            };
            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-xl ${colorClasses[s.color]}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{s.value}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">{s.label}</p>
                <p className="text-xs text-gray-400">{s.change}</p>
              </div>
            );
          })}
        </div>

        {/* FILTERS SECTION */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Status Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === "all"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Notices
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === "unread"
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter("read")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === "read"
                    ? "bg-gray-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Read
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NOTICES FEED */}
        {filteredNotices.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No notices found</h3>
            <p className="text-gray-400">Try changing your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((n) => {
              const priorityStyle = getPriorityStyles(n.priority);
              const CategoryIcon = getCategoryIcon(n.category);
              
              return (
                <div
                  key={n.id}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-lg ${
                    n.read
                      ? "bg-white border-gray-200"
                      : `${priorityStyle.bg} ${priorityStyle.border}`
                  } ${!n.read ? "cursor-pointer" : ""}`}
                  onClick={() => !n.read && markAsRead(n.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    
                    {/* LEFT SECTION */}
                    <div className="flex gap-4 flex-1">
                      {/* Icon Container */}
                      <div className={`p-3 rounded-xl ${priorityStyle.iconBg} transition-all duration-200 group-hover:scale-105`}>
                        <CategoryIcon className={priorityStyle.iconColor} size={22} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className={`font-semibold text-gray-800 ${!n.read ? "text-base" : "text-sm"}`}>
                            {n.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityStyle.badge}`}>
                            {priorityStyle.label}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                            <CategoryIcon size={12} />
                            {n.category}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {n.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {n.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {n.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* STATUS BADGE */}
                    <div className="flex flex-col items-end gap-2">
                      {!n.read && (
                        <span className="text-xs px-3 py-1.5 bg-red-500 text-white rounded-full font-medium animate-pulse shadow-sm">
                          New
                        </span>
                      )}
                      {n.read && (
                        <span className="text-xs px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full flex items-center gap-1">
                          <CheckCircle size={12} />
                          Read
                        </span>
                      )}
                      
                      {/* Quick action for unread */}
                      {!n.read && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(n.id);
                          }}
                          className="text-xs text-green-600 hover:text-green-700 font-medium mt-1"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress indicator for unread */}
                  {!n.read && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-300 rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* FOOTER NOTE */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
          <div className="flex items-center gap-3">
            <Info size={18} className="text-blue-600" />
            <p className="text-xs text-blue-700">
              Important: Notices marked as "High Priority" require your immediate attention.
              Please check your email for more details.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notices;