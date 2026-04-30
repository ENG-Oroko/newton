import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Users, 
  ClipboardList, 
  ClipboardCheck, 
  FileText, 
  Bell, 
  TrendingUp, 
  Calendar, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
  BookOpen,
  Archive,
  Scale
} from "lucide-react";

const RegistratorDashboard = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const stats = [
    {
      label: "Total Students",
      value: "4,820",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+120 this sem",
      trendUp: true
    },
    {
      label: "Pending Approvals",
      value: "86",
      icon: ClipboardList,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "Needs attention",
      trendUp: false
    },
    {
      label: "Results Approval",
      value: "14",
      icon: ClipboardCheck,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "5 pending review",
      trendUp: false
    },
    {
      label: "Transcripts",
      value: "32",
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "24 processed today",
      trendUp: true
    },
  ];

  const recentApprovals = [
    { student: "John Kamau", regNo: "BIT/2024/001", status: "Approved", time: "10 mins ago" },
    { student: "Mary Wanjiku", regNo: "CS/2023/452", status: "Pending", time: "1h ago" },
    { student: "Alex Otieno", regNo: "ENG/2022/112", status: "Rejected", time: "3h ago" },
    { student: "Grace Akinyi", regNo: "NUR/2024/089", status: "Approved", time: "5h ago" },
  ];

  const quickActions = [
    { name: "Approve Registrations", icon: ClipboardList, color: "bg-green-600", path: "/dashboard/registrar/registration-approvals" },
    { name: "Verify Results", icon: ClipboardCheck, color: "bg-blue-600", path: "/dashboard/registrar/results-approval" },
    { name: "Student Records", icon: Users, color: "bg-purple-600", path: "/dashboard/registrar/students" },
    { name: "Transcript Requests", icon: FileText, color: "bg-orange-600", path: "/dashboard/registrar/transcripts" },
  ];

  const academicHighlights = [
    { title: "Sem 1 2026 Registration", status: "In Progress", progress: 75, deadline: "May 15" },
    { title: "Final Year Results Submission", status: "Pending", progress: 40, deadline: "May 10" },
    { title: "Graduation List Compilation", status: "Starting Soon", progress: 10, deadline: "June 30" },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Header */}
      <div className="mb-8 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {greeting}, Registrar! 👋
            </h1>
            <p className="text-green-100 opacity-90">
              Institutional academic operations are running smoothly today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button 
              onClick={() => toast('Academic Calendar modal opened', { icon: '📅' })}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition flex items-center gap-2 text-sm backdrop-blur-sm"
            >
              <Calendar size={16} />
              Academic Calendar
            </button>
            <button 
              onClick={() => toast.success('Report generation started')}
              className="px-4 py-2 bg-white text-green-700 hover:bg-green-50 rounded-xl transition font-semibold text-sm shadow-sm"
            >
              Generate Report
            </button>
          </div>
        </div>
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
                <span className={`text-xs font-medium ${s.trendUp ? 'text-green-600' : 'text-orange-600'}`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Registration Approvals Table */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <ClipboardList size={18} className="text-green-600" />
                Recent Registration Requests
              </h3>
              <Link 
                to="/dashboard/registrar/registration-approvals" 
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1 font-medium"
              >
                Manage All <ChevronRight size={16} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 bg-gray-50 rounded-lg">
                  <tr>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Reg No</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentApprovals.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition group">
                      <td className="px-4 py-4 font-medium text-gray-800">{a.student}</td>
                      <td className="px-4 py-4 text-gray-500">{a.regNo}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          a.status === 'Approved' ? 'bg-green-100 text-green-600' :
                          a.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right text-gray-400 text-xs">{a.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Progression Summary */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={18} className="text-green-600" />
              <h3 className="font-semibold text-gray-800">Academic Progress Cycle</h3>
            </div>

            <div className="space-y-6">
              {academicHighlights.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-500">Deadline: {item.deadline}</p>
                    </div>
                    <span className="text-xs font-medium text-green-600">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Quick Operational Shortcuts */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">Operational Shortcuts</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, i) => (
                <Link 
                  key={i}
                  to={action.path}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 flex flex-col items-center gap-3 group text-center"
                >
                  <div className={`p-3 rounded-xl ${action.color} text-white group-hover:scale-110 transition-transform shadow-sm`}>
                    <action.icon size={20} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* System Notifications */}
          <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={18} className="text-green-600" />
              <h3 className="font-semibold text-gray-800">Operational Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-1">
                  <AlertCircle size={16} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Senate Meeting Reminder</p>
                  <p className="text-xs text-gray-500">Policy review scheduled for tomorrow at 10:00 AM.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1">
                  <Clock size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">System Maintenance</p>
                  <p className="text-xs text-gray-500">Database backup tonight at 11:00 PM.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Compliance */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Scale size={18} className="text-gray-400" />
              Compliance Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-gray-700">Audit Readiness</span>
                </div>
                <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full">OK</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Archive size={16} className="text-gray-400" />
                  <span className="text-xs font-medium text-gray-700">Archival Progress</span>
                </div>
                <span className="text-[10px] bg-gray-400 text-white px-2 py-0.5 rounded-full">80%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegistratorDashboard;