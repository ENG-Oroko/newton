import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Users, 
  Building2, 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Settings, 
  Bell, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronRight,
  School,
  BadgeDollarSign,
  UserCog,
  FileSearch,
  Activity
} from "lucide-react";

const SuperAdminDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [alertsCleared, setAlertsCleared] = useState(false);

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
      trend: "+12.5%",
      trendUp: true
    },
    {
      label: "Institutional Staff",
      value: "312",
      icon: UserCog,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "+2 this month",
      trendUp: true
    },
    {
      label: "Term Revenue",
      value: "KES 18.4M",
      icon: BadgeDollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "85% Collected",
      trendUp: true
    },
    {
      label: "System Health",
      value: "99.9%",
      icon: Activity,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      trend: "All systems GO",
      trendUp: true
    },
  ];

  const recentActivities = [
    { user: "Dr. David Okello", action: "Approved 156 Registrations", time: "15 mins ago", role: "Registrar" },
    { user: "Mary Wanjiku", action: "Verified Tuition Payments", time: "1h ago", role: "Finance" },
    { user: "System", action: "Automated Backup Completed", time: "3h ago", role: "Server" },
    { user: "Prof. Kamau", action: "Submitted Final Results", time: "5h ago", role: "Lecturer" },
  ];

  const departmentPerformance = [
    { name: "Computer Science", students: 850, performance: 92, revenue: "KES 4.2M" },
    { name: "Engineering", students: 450, performance: 88, revenue: "KES 3.8M" },
    { name: "Nursing", students: 620, performance: 95, revenue: "KES 3.1M" },
    { name: "Business", students: 920, performance: 84, revenue: "KES 2.9M" },
  ];

  return (
    <DashboardLayout>
      {/* Executive Welcome */}
      <div className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest animate-pulse">Live</span>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Directorate Oversight</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {greeting}, Director! 🏢
            </h1>
            <p className="text-gray-400 max-w-md">
              Institutional health is optimal. Revenue collection is 5% higher than the previous term.
            </p>
          </div>
          <div className="flex gap-3">
            <Link 
              to="/dashboard/director/audit-logs"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 rounded-2xl transition font-bold text-sm backdrop-blur-md border border-white/10 flex items-center gap-2"
            >
              <FileSearch size={18} />
              Audit Logs
            </Link>
            <Link 
              to="/dashboard/director/settings"
              className="px-5 py-3 bg-green-600 hover:bg-green-700 rounded-2xl transition font-bold text-sm shadow-lg shadow-green-600/30 flex items-center gap-2"
            >
              <Settings size={18} />
              System Config
            </Link>
          </div>
        </div>
        <Building2 size={200} className="absolute -bottom-20 -right-20 text-white/5 rotate-12" />
      </div>

      {/* Institutional KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group p-6 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-2xl ${s.bg} ${s.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon size={24} />
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold flex items-center gap-1 ${s.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {s.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {s.trend}
                  </span>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">v. Prev Term</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1 tracking-wider">{s.label}</p>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                  {s.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section: Departmental Insights */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                  <School size={20} className="text-green-600" />
                  Departmental Performance
                </h3>
                <p className="text-xs text-gray-400">Academic health vs. Revenue across faculties</p>
              </div>
              <Link 
                to="/dashboard/director/academic-performance"
                className="text-xs font-bold text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-xl transition inline-block"
              >
                Detailed Report
              </Link>
            </div>

            <div className="space-y-6">
              {departmentPerformance.map((dept, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm group-hover:text-green-600 transition">{dept.name}</h4>
                      <p className="text-[10px] text-gray-400">{dept.students} Students • {dept.revenue}</p>
                    </div>
                    <span className="text-xs font-black text-gray-800">{dept.performance}% Health</span>
                  </div>
                  <div className="w-full bg-gray-50 rounded-full h-3 p-0.5 border border-gray-100">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        dept.performance > 90 ? 'bg-green-500' : dept.performance > 85 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${dept.performance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between h-48 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold">Financial Health</h3>
                <p className="text-blue-100 text-xs opacity-80 mt-1">Tuition collection status</p>
              </div>
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black">92%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Goal: 95%</p>
                </div>
                <Link to="/dashboard/director/financial-overview" className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition block">
                  <ChevronRight size={20} />
                </Link>
              </div>
              <TrendingUp size={100} className="absolute -bottom-4 -right-4 text-white/10" />
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between h-48 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold">Admissions Trend</h3>
                <p className="text-purple-100 text-xs opacity-80 mt-1">Growth vs. Previous Term</p>
              </div>
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black">+18%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200">Steady Growth</p>
                </div>
                <Link to="/dashboard/director/students" className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition block">
                  <ChevronRight size={20} />
                </Link>
              </div>
              <Users size={100} className="absolute -bottom-4 -right-4 text-white/10" />
            </div>
          </div>

        </div>

        {/* Right Section: Activity & Notifications */}
        <div className="space-y-8">
          
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-fit">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Activity size={18} className="text-green-600" />
              Live System Activity
            </h3>
            <div className="space-y-6">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] group-hover:scale-150 transition-transform" />
                    {i !== recentActivities.length - 1 && <div className="w-0.5 h-full bg-gray-50" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{act.action}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">{act.user} • {act.role}</p>
                    <p className="text-[9px] text-gray-300 font-bold uppercase mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/dashboard/director/audit-logs"
              className="w-full mt-8 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-xs font-bold text-gray-500 transition block text-center"
            >
              View All Logs
            </Link>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell size={18} className="text-red-500" />
              Director Alerts
            </h3>
            <div className="space-y-3">
              {alertsCleared ? (
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-center">
                  <p className="text-xs font-bold text-gray-500">All caught up!</p>
                  <p className="text-[10px] text-gray-400 mt-1">No pending alerts at this time.</p>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                    <p className="text-xs font-bold text-red-800 mb-1">Tuition Deadline Imminent</p>
                    <p className="text-[10px] text-red-600/70 leading-relaxed">650 students still have balances above KES 50,000.</p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                    <p className="text-xs font-bold text-orange-800 mb-1">Senate Policy Pending</p>
                    <p className="text-[10px] text-orange-600/70 leading-relaxed">The new grading policy draft needs your signature.</p>
                  </div>
                  <div 
                    onClick={() => {
                      setAlertsCleared(true);
                      toast.success("Alerts marked as read");
                    }}
                    className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-center cursor-pointer hover:bg-blue-100 transition"
                  >
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Clear All Alerts</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Institutional Compliance */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-xl shadow-sm text-green-600">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Compliance Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Government Audit</span>
                <span className="font-bold text-green-600">Passed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="flex items-center justify-between text-xs mt-4">
                <span className="text-gray-500">ISO Certification</span>
                <span className="font-bold text-blue-600">Active</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;