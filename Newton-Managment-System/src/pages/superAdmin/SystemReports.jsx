import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  FileText, 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  School, 
  BadgeDollarSign, 
  Search, 
  Filter, 
  ChevronRight, 
  PieChart, 
  Activity, 
  ArrowUpRight 
} from "lucide-react";

const SystemReports = () => {
  const [activeTab, setActiveTab] = useState("Academic");
  const [isRequesting, setIsRequesting] = useState(false);

  const reports = [
    { title: "Institutional Growth 2026", type: "Strategic", date: "Today", size: "4.8 MB" },
    { title: "Financial Audit Q1", type: "Compliance", date: "Yesterday", size: "12.2 MB" },
    { title: "Staff Distribution Analysis", type: "HR", date: "Apr 28, 2026", size: "2.1 MB" },
    { title: "Student Retention Report", type: "Academic", date: "Apr 25, 2026", size: "3.5 MB" },
    { title: "Senate Policy Impact Study", type: "Legal", date: "Apr 20, 2026", size: "1.2 MB" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Executive System Reports</h1>
          <p className="text-sm text-gray-500">Access high-level institutional analytics, strategic audits, and cross-departmental reports</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => toast('Fiscal year selection coming soon', { icon: '📅' })}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <Calendar size={16} />
            Fiscal Year 2026
          </button>
          <button 
            onClick={() => {
              setIsRequesting(true);
              const tId = toast.loading("Opening report builder...");
              setTimeout(() => {
                toast.success("Custom report builder ready", { id: tId });
                setIsRequesting(false);
              }, 1000);
            }}
            disabled={isRequesting}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <TrendingUp size={16} />
            {isRequesting ? "Loading..." : "Request Custom Report"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Report Categories */}
        <div className="lg:col-span-1 space-y-4">
          {[
            { label: "Academic Metrics", icon: BarChart3, count: 12 },
            { label: "Financial Audits", icon: BadgeDollarSign, count: 8 },
            { label: "Institutional HR", icon: Users, count: 5 },
            { label: "Strategic Planning", icon: School, count: 4 },
            { label: "System Health", icon: Activity, count: 3 },
          ].map((cat, i) => (
            <button
              key={i}
              onClick={() => toast.success(`Filtering by ${cat.label}`)}
              className="w-full p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-between group hover:border-green-600 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 rounded-xl transition">
                  <cat.icon size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">{cat.label}</span>
              </div>
              <span className="text-[10px] font-black bg-gray-100 text-gray-400 px-2 py-1 rounded-lg group-hover:bg-green-100 group-hover:text-green-600 transition">
                {cat.count}
              </span>
            </button>
          ))}

          <div className="bg-gray-900 rounded-3xl p-6 text-white mt-8 relative overflow-hidden">
            <h3 className="text-lg font-bold mb-2">Automated Insights</h3>
            <p className="text-[10px] text-gray-400 leading-relaxed mb-6">Our AI engine generates weekly executive summaries of institutional performance.</p>
            <button 
              onClick={() => toast.success('Loading weekly AI summary...')}
              className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold border border-white/10 transition"
            >
              View Weekly Summary
            </button>
            <PieChart size={80} className="absolute -bottom-4 -right-4 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Right Column: Report List */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center bg-gray-50/20">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search reports by title or type..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:border-green-500 focus:outline-none transition text-sm shadow-sm"
                />
              </div>
              <button 
                onClick={() => toast.success('Filters applied')}
                className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-green-600 rounded-xl transition shadow-sm"
              >
                <Filter size={18} />
              </button>
            </div>

            <div className="divide-y divide-gray-50">
              {reports.map((report, i) => (
                <div key={i} className="p-6 hover:bg-green-50/20 transition group flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-green-600 rounded-2xl shadow-sm transition">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg group-hover:text-green-600 transition tracking-tight">{report.title}</h4>
                      <div className="flex flex-wrap gap-4 mt-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-lg">{report.type}</span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
                          <Calendar size={10} /> {report.date}
                        </span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
                          <Activity size={10} /> {report.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toast.success(`Downloading ${report.title}...`)}
                      className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:text-green-600 hover:border-green-600 transition flex items-center gap-2"
                    >
                      <Download size={14} /> Download
                    </button>
                    <button 
                      onClick={() => toast.success('Viewing report details')}
                      className="p-2 hover:bg-white rounded-xl transition text-gray-300"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => toast('Loading archive reports...', { icon: '📂' })}
              className="w-full py-4 bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-green-600 hover:bg-green-50 transition"
            >
              Show Archive Reports
            </button>
          </div>

          {/* Quick Analytics Chart Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-bold text-gray-800">Financial Trend</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">v. Previous Quarter</p>
                </div>
                <span className="text-xs font-black text-green-600 flex items-center gap-1">
                  <ArrowUpRight size={14} /> +12.5%
                </span>
              </div>
              <div className="flex items-end gap-1 h-32">
                {[40, 60, 45, 90, 65, 80, 100].map((h, i) => (
                  <div 
                    key={i} 
                    onClick={() => toast('Viewing detailed trend analysis', { icon: '📈' })}
                    className="flex-1 bg-gray-50 rounded-t-lg group relative cursor-pointer"
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t-lg transition-all duration-1000 group-hover:bg-green-600 shadow-sm" 
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-bold text-gray-800">Enrollment Trend</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Student Growth Index</p>
                </div>
                <span className="text-xs font-black text-blue-600 flex items-center gap-1">
                  <ArrowUpRight size={14} /> +8.4%
                </span>
              </div>
              <div className="flex items-end gap-1 h-32">
                {[30, 50, 70, 60, 85, 75, 95].map((h, i) => (
                  <div 
                    key={i} 
                    onClick={() => toast('Viewing detailed trend analysis', { icon: '📈' })}
                    className="flex-1 bg-gray-50 rounded-t-lg group relative cursor-pointer"
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg transition-all duration-1000 group-hover:bg-blue-600 shadow-sm" 
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemReports;
