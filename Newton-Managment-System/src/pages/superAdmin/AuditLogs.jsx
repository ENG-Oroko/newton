import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  FileSearch, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  ShieldAlert, 
  Clock, 
  User, 
  Globe, 
  Monitor, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MoreVertical,
  ChevronRight
} from "lucide-react";

const AuditLogs = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isExporting, setIsExporting] = useState(false);

  const logs = [
    { id: "LOG-4821", user: "Dr. David Okello", action: "Approved 156 unit registrations", module: "Registrar", ip: "192.168.1.10", status: "Success", time: "10 mins ago" },
    { id: "LOG-4822", user: "Mary Wanjiku", action: "Updated financial ledger for Sem 1", module: "Finance", ip: "192.168.1.45", status: "Success", time: "1h ago" },
    { id: "LOG-4823", user: "System", action: "Automated database backup completed", module: "Server", ip: "localhost", status: "Success", time: "3h ago" },
    { id: "LOG-4824", user: "Unknown", action: "Failed login attempt (3 times)", module: "Security", ip: "45.12.88.92", status: "Failed", time: "5h ago" },
    { id: "LOG-4825", user: "Prof. James", action: "Deleted exam results draft", module: "Academic", ip: "192.168.1.12", status: "Warning", time: "8h ago" },
    { id: "LOG-4826", user: "Director Admin", action: "Changed system permissions for 'Finance'", module: "Admin", ip: "10.0.0.5", status: "Success", time: "1 day ago" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">System Audit Logs</h1>
          <p className="text-sm text-gray-500">Monitor all institutional activities, user actions, and security events</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsExporting(true);
              const tId = toast.loading("Exporting audit logs...");
              setTimeout(() => {
                toast.success("Logs exported successfully", { id: tId });
                setIsExporting(false);
              }, 1500);
            }}
            disabled={isExporting}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <Download size={16} />
            {isExporting ? "Exporting..." : "Export Logs"}
          </button>
          <button 
            onClick={() => toast.success('Cleared logs older than 30 days')}
            className="flex-1 md:flex-none px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Trash2 size={16} />
            Clear Old Logs
          </button>
        </div>
      </div>

      {/* Security Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
            <CheckCircle size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800">2,450</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Successful Actions (24h)</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl">
            <AlertCircle size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800">12</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Warnings Flagged</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center gap-6">
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800">3</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Critical Security Alerts</p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center bg-gray-50/30">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by user, action, or module..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:border-green-500 focus:outline-none transition text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            {["All", "Success", "Failed", "Warning"].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeFilter === f ? "bg-gray-900 text-white shadow-lg" : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
            <button 
              onClick={() => toast.success("Advanced filters applied")}
              className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-green-600 rounded-xl transition shadow-sm"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-black border-b border-gray-50">
                <th className="px-6 py-5">Event ID</th>
                <th className="px-6 py-5">User</th>
                <th className="px-6 py-5">Action Performed</th>
                <th className="px-6 py-5 text-center">Module</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Time / IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.filter(l => activeFilter === "All" || l.status === activeFilter).map((log, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition group">
                  <td className="px-6 py-5 text-xs font-bold text-gray-400">{log.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${
                        log.user === 'System' ? 'bg-gray-800 text-white' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {log.user === 'System' ? <Monitor size={14} /> : log.user[0]}
                      </div>
                      <span className="font-bold text-gray-700">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-600 font-medium">
                    {log.action}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-black uppercase rounded-lg">
                      {log.module}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex justify-center">
                      {log.status === 'Success' && <CheckCircle size={18} className="text-green-500" />}
                      {log.status === 'Failed' && <XCircle size={18} className="text-red-500 animate-pulse" />}
                      {log.status === 'Warning' && <AlertCircle size={18} className="text-orange-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div>
                      <p className="text-xs font-bold text-gray-800">{log.time}</p>
                      <p className="text-[10px] text-gray-400 flex items-center justify-end gap-1">
                        <Globe size={10} /> {log.ip}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex justify-center">
          <button 
            onClick={() => toast('Loading older logs...', { icon: '🔄' })}
            className="text-xs font-black text-gray-400 hover:text-green-600 transition uppercase tracking-widest flex items-center gap-2"
          >
            Load Older Logs <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Security Insights */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ShieldAlert size={20} className="text-red-500" />
              Real-time Threat Monitoring
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-sm font-medium">SSL Certificate Status</span>
                </div>
                <span className="text-[10px] font-bold text-green-400 uppercase">Secure</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Active Database Connections</span>
                </div>
                <span className="text-[10px] font-bold text-white uppercase">42 Active</span>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-sm font-medium">External API Access Attempts</span>
                </div>
                <span className="text-[10px] font-bold text-red-400 uppercase">3 Blocked</span>
              </div>
            </div>
          </div>
          <Globe size={150} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock size={18} className="text-blue-600" />
            Top Activity Modules
          </h3>
          <div className="space-y-6">
            {[
              { label: "Registrar Operations", percentage: 45, color: "bg-green-500" },
              { label: "Finance & Payments", percentage: 28, color: "bg-blue-500" },
              { label: "Lecturer Grading", percentage: 15, color: "bg-purple-500" },
              { label: "Student Services", percentage: 12, color: "bg-orange-500" },
            ].map((mod, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>{mod.label}</span>
                  <span>{mod.percentage}%</span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                  <div className={`${mod.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${mod.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;
