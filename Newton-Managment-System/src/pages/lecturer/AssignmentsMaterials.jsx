import React, { useState, useMemo, useRef, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Send,
  Calendar,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Paperclip,
  File,
  Archive,
  MoreVertical,
  Plus,
  TrendingUp,
  Target,
  X,
  Edit,
  Copy,
  Share2,
  MessageCircle,
  BarChart3,
  Award,
  ChevronDown,
  Link2,
  Video,
  FileAudio,
  FileImage,
  Zap,
  Bell,
  Settings,
  RefreshCw,
  FolderOpen,
  Grid,
  List,
  Sparkles,
  Clock as ClockIcon,
  GraduationCap,
  Mail,
  Printer,
  ExternalLink,
  Star,
  Flag,
  ThumbsUp,
  MessageSquare,
  PieChart,
  TrendingDown,
  Info
} from "lucide-react";

const AssignmentsMaterials = () => {
  const [activeTab, setActiveTab] = useState("assignments");
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showNotification, setShowNotification] = useState(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharingItem, setSharingItem] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsItem, setAnalyticsItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    course: "",
    dueDate: "",
    dueTime: "",
    totalPoints: 100,
    priority: "medium",
    attachments: [],
    allowLateSubmissions: false,
    latePenalty: 10,
    rubric: ""
  });

  const fileInputRef = useRef(null);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals Assignment",
      description: "Build a DOM-based interactive web application using vanilla JavaScript. Implement event handling, DOM manipulation, and local storage.",
      type: "Assignment",
      course: "CS101",
      courseName: "Introduction to Programming",
      dueDate: "2026-05-15",
      dueTime: "23:59",
      totalPoints: 100,
      submissions: 32,
      totalStudents: 45,
      status: "active",
      priority: "high",
      createdAt: "2026-05-01",
      attachments: ["assignment_spec.pdf", "starter_code.zip"],
      rubric: "rubric_js.pdf",
      gradesReleased: false,
      averageGrade: 78.5,
      lateSubmissions: 3
    },
    {
      id: 2,
      title: "Database Design Project",
      description: "Design a normalized database for a library management system. Submit ER diagram, relational schema, and SQL queries.",
      type: "Assignment",
      course: "CS303",
      courseName: "Database Systems",
      dueDate: "2026-05-20",
      dueTime: "23:59",
      totalPoints: 150,
      submissions: 18,
      totalStudents: 42,
      status: "active",
      priority: "medium",
      createdAt: "2026-05-05",
      attachments: ["project_requirements.pdf", "sample_er_diagram.png"],
      rubric: "db_rubric.pdf",
      gradesReleased: false,
      averageGrade: 0,
      lateSubmissions: 2
    },
    {
      id: 3,
      title: "Data Structures Implementation",
      description: "Implement linked lists, stacks, and queues with all basic operations including edge cases.",
      type: "Assignment",
      course: "CS202",
      courseName: "Data Structures",
      dueDate: "2026-05-10",
      dueTime: "23:59",
      totalPoints: 100,
      submissions: 38,
      totalStudents: 38,
      status: "closed",
      priority: "high",
      createdAt: "2026-04-25",
      attachments: ["implementation_guide.pdf", "test_cases.zip"],
      rubric: "ds_rubric.pdf",
      gradesReleased: true,
      averageGrade: 82.3,
      lateSubmissions: 5
    }
  ]);

  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Complete Lecture Notes - Weeks 1-6",
      description: "Comprehensive notes covering all programming fundamentals including variables, loops, functions, and arrays.",
      type: "Material",
      course: "CS101",
      courseName: "Introduction to Programming",
      contentType: "PDF",
      fileSize: "2.5 MB",
      downloads: 89,
      createdAt: "2026-04-01",
      tags: ["lecture", "notes", "beginner"],
      fileUrl: "/notes/week1-6.pdf",
      isPinned: true
    },
    {
      id: 2,
      title: "SQL Video Tutorial Series",
      description: "15 video tutorials covering SELECT, JOIN, subqueries, and optimization techniques.",
      type: "Material",
      course: "CS303",
      courseName: "Database Systems",
      contentType: "Video",
      fileSize: "1.2 GB",
      downloads: 56,
      createdAt: "2026-04-10",
      tags: ["video", "sql", "tutorial"],
      fileUrl: "/videos/sql_tutorials",
      isPinned: false
    },
    {
      id: 3,
      title: "Practice Problems with Solutions",
      description: "100+ coding problems with detailed solutions for interviews and exams.",
      type: "Material",
      course: "CS202",
      courseName: "Data Structures",
      contentType: "PDF",
      fileSize: "3.8 MB",
      downloads: 112,
      createdAt: "2026-04-15",
      tags: ["practice", "problems", "solutions"],
      fileUrl: "/problems/practice.pdf",
      isPinned: false
    }
  ]);

  const courses = useMemo(() => {
    const allCourses = activeTab === "assignments" 
      ? [...new Set(assignments.map(i => i.course))]
      : [...new Set(materials.map(i => i.course))];
    return ["all", ...allCourses];
  }, [activeTab, assignments, materials]);

  const filteredAndSorted = useMemo(() => {
    let items = activeTab === "assignments" ? assignments : materials;
    
    items = items.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                         item.description.toLowerCase().includes(search.toLowerCase());
      const matchCourse = course === "all" || item.course === course;
      const matchPriority = priorityFilter === "all" || item.priority === priorityFilter;
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      
      return matchSearch && matchCourse && matchPriority && matchStatus;
    });
    
    items = [...items].sort((a, b) => {
      let comparison = 0;
      switch(sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "date":
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case "submissions":
          comparison = (a.submissions || 0) - (b.submissions || 0);
          break;
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
    
    return items;
  }, [activeTab, assignments, materials, search, course, priorityFilter, statusFilter, sortBy, sortOrder]);

  const stats = useMemo(() => {
    const totalAssignments = assignments.length;
    const activeAssignments = assignments.filter(a => a.status === "active").length;
    const totalSubmissions = assignments.reduce((sum, a) => sum + a.submissions, 0);
    const totalStudents = assignments.reduce((sum, a) => sum + a.totalStudents, 0);
    const averageSubmissionRate = totalStudents > 0 ? Math.round((totalSubmissions / totalStudents) * 100) : 0;
    const pendingGrading = assignments.filter(a => a.status === "active" && !a.gradesReleased).length;
    const highPriorityCount = assignments.filter(a => a.priority === "high" && a.status === "active").length;
    const totalDownloads = materials.reduce((sum, m) => sum + m.downloads, 0);
    const pinnedCount = materials.filter(m => m.isPinned).length;
    
    return {
      totalAssignments,
      activeAssignments,
      totalSubmissions,
      averageSubmissionRate,
      pendingGrading,
      highPriorityCount,
      totalDownloads,
      pinnedCount,
      totalMaterials: materials.length
    };
  }, [assignments, materials]);

  const getPriorityColor = (priority) => {
    const map = {
      high: { bg: "bg-red-100", text: "text-red-700", icon: "🔴", border: "border-red-200" },
      medium: { bg: "bg-yellow-100", text: "text-yellow-700", icon: "🟡", border: "border-yellow-200" },
      low: { bg: "bg-green-100", text: "text-green-700", icon: "🟢", border: "border-green-200" }
    };
    return map[priority] || { bg: "bg-gray-100", text: "text-gray-700", icon: "⚪", border: "border-gray-200" };
  };

  const getStatusColor = (status) => {
    const map = {
      active: { bg: "bg-green-100", text: "text-green-700", label: "Active", icon: "✅" },
      closed: { bg: "bg-red-100", text: "text-red-700", label: "Closed", icon: "🔒" },
      draft: { bg: "bg-gray-100", text: "text-gray-700", label: "Draft", icon: "📝" }
    };
    return map[status] || map.draft;
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.course || !newAssignment.dueDate) {
      showNotificationMessage("Please fill all required fields", "error");
      return;
    }
    
    const assignment = {
      id: Date.now(), // Better unique ID generation
      ...newAssignment,
      submissions: 0,
      status: "active",
      createdAt: new Date().toISOString().split('T')[0],
      courseName: courses.find(c => c === newAssignment.course) || newAssignment.course,
      gradesReleased: false,
      averageGrade: 0,
      lateSubmissions: 0,
      type: "Assignment"
    };
    
    setAssignments([assignment, ...assignments]);
    setShowSendModal(false);
    setNewAssignment({
      title: "",
      description: "",
      course: "",
      dueDate: "",
      dueTime: "",
      totalPoints: 100,
      priority: "medium",
      attachments: [],
      allowLateSubmissions: false,
      latePenalty: 10,
      rubric: ""
    });
    showNotificationMessage("Assignment created successfully!", "success");
  };

  const handleDeleteItem = (id, type) => {
    if (type === "assignment") {
      setAssignments(assignments.filter(a => a.id !== id));
    } else {
      setMaterials(materials.filter(m => m.id !== id));
    }
    setShowDeleteConfirm(null);
    showNotificationMessage("Item deleted successfully", "success");
  };

  const handleBulkDelete = () => {
    if (activeTab === "assignments") {
      setAssignments(assignments.filter(a => !selectedItems.includes(a.id)));
    } else {
      setMaterials(materials.filter(m => !selectedItems.includes(m.id)));
    }
    setSelectedItems([]);
    setShowBulkActions(false);
    showNotificationMessage(`${selectedItems.length} items deleted`, "success");
  };

  const handleDuplicate = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      title: `${item.title} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      submissions: 0
    };
    
    if (activeTab === "assignments") {
      setAssignments([newItem, ...assignments]);
    } else {
      setMaterials([newItem, ...materials]);
    }
    showNotificationMessage("Item duplicated successfully", "success");
  };

  const handleTogglePin = (id) => {
    setMaterials(materials.map(m => 
      m.id === id ? { ...m, isPinned: !m.isPinned } : m
    ));
    showNotificationMessage("Pin status updated", "info");
  };

  const handleSendReminder = (assignmentId) => {
    showNotificationMessage("Reminder sent to all students", "success");
  };

  const handleExportGrades = (assignmentId) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    const csvContent = "Student Name,Student ID,Score,Grade\nJohn Doe,CS001,85,A\nJane Smith,CS002,92,A+";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grades_${assignment.title.replace(/\s/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showNotificationMessage("Grades exported successfully", "success");
  };

  const showNotificationMessage = (message, type) => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredAndSorted.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredAndSorted.map(item => item.id));
    }
  };

  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDeleteConfirm = (item) => {
    setShowDeleteConfirm({
      id: item.id,
      type: item.type === "Assignment" ? "assignment" : "material",
      title: item.title
    });
  };

  const renderGridView = (items) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => renderCard(item))}
    </div>
  );

  const renderListView = (items) => (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 w-10">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredAndSorted.length && filteredAndSorted.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 focus:ring-green-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Course</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="rounded border-gray-300 focus:ring-green-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{item.courseName}</td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{item.dueDate || item.createdAt}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority).bg} ${getPriorityColor(item.priority).text}`}>
                    {getPriorityColor(item.priority).icon} {item.priority || item.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleDuplicate(item)} 
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Duplicate"
                    >
                      <Copy size={14} className="text-gray-500" />
                    </button>
                    <button 
                      onClick={() => handleDeleteConfirm(item)} 
                      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCard = (item) => {
    const priorityStyle = getPriorityColor(item.priority);
    const statusStyle = getStatusColor(item.status);
    const submissionRate = item.submissions ? Math.round((item.submissions / item.totalStudents) * 100) : 0;
    const daysRemaining = item.dueDate ? getDaysRemaining(item.dueDate) : null;
    
    return (
      <div
        key={item.id}
        className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
      >
        {item.isPinned && (
          <div className="absolute top-3 right-3">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
        )}
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {item.type === "Assignment" ? (
                <FileText size={18} className="text-blue-500" />
              ) : (
                <File size={18} className="text-purple-500" />
              )}
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {item.type}
              </span>
              {item.priority && (
                <span className={`text-xs px-2 py-1 rounded-full ${priorityStyle.bg} ${priorityStyle.text}`}>
                  {priorityStyle.icon} {item.priority}
                </span>
              )}
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-1">
                <BookOpen size={12} />
                {item.courseName}
              </span>
              {item.type === "Assignment" && (
                <span className="text-gray-500 flex items-center gap-1">
                  <Users size={12} />
                  {item.submissions}/{item.totalStudents}
                </span>
              )}
            </div>

            {item.type === "Assignment" && (
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    Due: {item.dueDate}
                  </span>
                  <span className="text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {item.dueTime}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Submission Rate</span>
                    <span className="text-green-600 font-semibold">{submissionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${submissionRate}%` }}
                    />
                  </div>
                </div>

                {item.status === "active" && daysRemaining !== null && daysRemaining <= 3 && daysRemaining >= 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded-lg flex items-center gap-2 border border-yellow-200">
                    <AlertCircle size={12} className="text-yellow-600" />
                    <span className="text-xs text-yellow-700 font-medium">
                      {daysRemaining === 0 ? "Due today!" : `${daysRemaining} days left`}
                    </span>
                  </div>
                )}
              </>
            )}

            {item.type === "Material" && (
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-gray-500 flex items-center gap-1">
                  <Download size={12} />
                  {item.downloads.toLocaleString()} downloads
                </span>
                <span className="text-gray-500 px-2 py-0.5 bg-gray-100 rounded">{item.contentType}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <button className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-1 shadow-sm">
              <Eye size={12} />
              View
            </button>
            <button 
              onClick={() => handleDuplicate(item)}
              className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all duration-200"
              title="Duplicate"
            >
              <Copy size={12} />
            </button>
            <button 
              onClick={() => handleDeleteConfirm(item)}
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200"
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          </div>

          {item.type === "Assignment" && (
            <div className="mt-2 pt-2 border-t border-gray-100 flex justify-around">
              <button 
                onClick={() => handleSendReminder(item.id)}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                <Bell size={12} />
                Remind
              </button>
              <button 
                onClick={() => handleExportGrades(item.id)}
                className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1 transition-colors"
              >
                <Download size={12} />
                Export
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

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
                {showNotification.type === "info" && <Info size={18} className="text-blue-600" />}
                <span className="text-sm font-medium">{showNotification.message}</span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="text-green-600" size={28} />
              Assignments & Materials
            </h1>
            <p className="text-gray-500 mt-1">Create, manage, and distribute course content</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAnalytics(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <BarChart3 size={16} />
              Analytics
            </button>
            <button
              onClick={() => setShowSendModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              New Assignment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-gray-500 font-medium">Total</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalAssignments}</h2>
            <p className="text-xs text-green-600 mt-1">Assignments</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-gray-500 font-medium">Active</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">{stats.activeAssignments}</h2>
            <p className="text-xs text-gray-500 mt-1">In progress</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-gray-500 font-medium">Submission Rate</p>
            <h2 className="text-2xl font-bold text-blue-600 mt-1">{stats.averageSubmissionRate}%</h2>
            <p className="text-xs text-gray-500 mt-1">Overall</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-gray-500 font-medium">Pending Grading</p>
            <h2 className="text-2xl font-bold text-yellow-600 mt-1">{stats.pendingGrading}</h2>
            <p className="text-xs text-gray-500 mt-1">Need review</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <p className="text-xs text-gray-500 font-medium">High Priority</p>
            <h2 className="text-2xl font-bold text-red-600 mt-1">{stats.highPriorityCount}</h2>
            <p className="text-xs text-gray-500 mt-1">Urgent</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 transition-all duration-200">
            <p className="text-xs text-purple-600 font-medium">Materials</p>
            <h2 className="text-2xl font-bold text-purple-700 mt-1">{stats.totalMaterials}</h2>
            <p className="text-xs text-purple-600 mt-1">{stats.totalDownloads.toLocaleString()} downloads</p>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="Search by title or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Courses" : c}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="submissions">Sort by Submissions</option>
              <option value="priority">Sort by Priority</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
            >
              <Filter size={14} />
              Filters
              {showFilters && <ChevronDown size={14} className="transform rotate-180" />}
            </button>

            <div className="flex gap-1 border border-gray-300 rounded-lg p-1 bg-white">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-all duration-200 ${
                  viewMode === "grid" ? "bg-green-100 text-green-600" : "text-gray-400 hover:text-gray-600"
                }`}
                title="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-all duration-200 ${
                  viewMode === "list" ? "bg-green-100 text-green-600" : "text-gray-400 hover:text-gray-600"
                }`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>

            {selectedItems.length > 0 && (
              <button
                onClick={() => setShowBulkActions(true)}
                className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700 transition-all duration-200"
              >
                <Trash2 size={14} />
                Delete ({selectedItems.length})
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>

              <select
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>

              <button
                onClick={() => {
                  setPriorityFilter("all");
                  setStatusFilter("all");
                }}
                className="px-3 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => {
              setActiveTab("assignments");
              setSelectedItems([]);
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "assignments"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FileText size={16} />
            Assignments ({assignments.length})
          </button>

          <button
            onClick={() => {
              setActiveTab("materials");
              setSelectedItems([]);
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "materials"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Archive size={16} />
            Materials ({materials.length})
          </button>
        </div>

        {/* Content Grid/List */}
        {filteredAndSorted.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          viewMode === "grid" ? renderGridView(filteredAndSorted) : renderListView(filteredAndSorted)
        )}

        {/* Create Assignment Modal */}
        {showSendModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Send size={20} className="text-green-600" />
                  Create New Assignment
                </h2>
                <button 
                  onClick={() => setShowSendModal(false)} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., JavaScript Project"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Detailed instructions..."
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
                      value={newAssignment.course}
                      onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                    >
                      <option value="">Select Course</option>
                      <option value="CS101">CS101 - Introduction to Programming</option>
                      <option value="CS202">CS202 - Data Structures</option>
                      <option value="CS303">CS303 - Database Systems</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
                      value={newAssignment.priority}
                      onChange={(e) => setNewAssignment({...newAssignment, priority: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      value={newAssignment.dueTime}
                      onChange={(e) => setNewAssignment({...newAssignment, dueTime: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Points</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    value={newAssignment.totalPoints}
                    onChange={(e) => setNewAssignment({...newAssignment, totalPoints: parseInt(e.target.value)})}
                  />
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newAssignment.allowLateSubmissions}
                      onChange={(e) => setNewAssignment({...newAssignment, allowLateSubmissions: e.target.checked})}
                      className="rounded border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Allow Late Submissions</span>
                  </label>

                  {newAssignment.allowLateSubmissions && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700">Penalty:</label>
                      <input
                        type="number"
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        value={newAssignment.latePenalty}
                        onChange={(e) => setNewAssignment({...newAssignment, latePenalty: parseInt(e.target.value)})}
                      />
                      <span className="text-sm text-gray-500">% per day</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 transition-all duration-200"
                  >
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload files</p>
                    <p className="text-xs text-gray-400">PDF, DOC, ZIP (Max 10MB)</p>
                    <input ref={fileInputRef} type="file" multiple className="hidden" />
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
                <button
                  onClick={() => setShowSendModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAssignment}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
                >
                  <Send size={16} />
                  Create Assignment
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
                Are you sure you want to delete "<span className="font-semibold">{showDeleteConfirm.title}</span>"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteItem(showDeleteConfirm.id, showDeleteConfirm.type)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Actions Modal */}
        {showBulkActions && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Bulk Actions</h3>
              <p className="text-gray-600 mb-4">
                You have selected <span className="font-semibold text-green-600">{selectedItems.length}</span> items. What would you like to do?
              </p>
              <div className="space-y-2">
                <button
                  onClick={handleBulkDelete}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete All Selected
                </button>
                <button
                  onClick={() => setShowBulkActions(false)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
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

export default AssignmentsMaterials;