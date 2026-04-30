import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Archive, 
  Search, 
  Filter, 
  TrendingUp, 
  Award, 
  History, 
  ChevronRight, 
  FileText, 
  Download,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Calendar
} from "lucide-react";

const AcademicRecords = () => {
  const [activeTab, setActiveTab] = useState("Records");
  const [isExporting, setIsExporting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const records = [
    { student: "John Kamau", regNo: "BIT/2024/001", sem: "Sem 1 2025", gpa: "3.85", units: 18, standing: "First Class", date: "Jan 2026", program: "BSc. IT" },
    { student: "Mary Wanjiku", regNo: "CS/2023/452", sem: "Sem 1 2025", gpa: "3.92", units: 18, standing: "First Class", date: "Jan 2026", program: "BSc. CS" },
    { student: "Alex Otieno", regNo: "ENG/2022/112", sem: "Sem 1 2025", gpa: "2.10", units: 21, standing: "Pass", date: "Jan 2026", program: "BEng. Civil" },
    { student: "Grace Akinyi", regNo: "NUR/2024/089", sem: "Sem 1 2025", gpa: "3.45", units: 15, standing: "Second Upper", date: "Jan 2026", program: "BSc. Nursing" },
    { student: "Sarah Wilson", regNo: "BIT/2025/102", sem: "Sem 1 2025", gpa: "3.20", units: 18, standing: "Second Upper", date: "Jan 2026", program: "BSc. IT" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Academic Records</h1>
          <p className="text-sm text-gray-500">Official student performance history, archival, and GPA management</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsExporting(true);
              const tId = toast.loading("Preparing bulk export...");
              setTimeout(() => {
                toast.success("Records exported successfully", { id: tId });
                setIsExporting(false);
              }, 1500);
            }}
            disabled={isExporting}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Download size={16} />
            {isExporting ? "Exporting..." : "Bulk Export"}
          </button>
          <button 
            onClick={() => {
              setIsVerifying(true);
              const tId = toast.loading("Verifying records against Senate DB...");
              setTimeout(() => {
                toast.success("All records verified. 0 issues found.", { id: tId });
                setIsVerifying(false);
              }, 2000);
            }}
            disabled={isVerifying}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <ShieldCheck size={16} />
            {isVerifying ? "Verifying..." : "Verify Records"}
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Records", value: "12,450", icon: Archive, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Current Avg GPA", value: "3.12", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Graduation Ready", value: "482", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Archived Years", value: "12", icon: History, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase">{stat.label}</p>
            <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Tabs & Search */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="flex border-b border-gray-100 bg-gray-50/30">
          {["Records", "GPA Tracking", "Classifications", "Archive"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-bold transition-all relative ${
                activeTab === tab ? "text-green-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by student name or registration number..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-green-500 focus:outline-none transition text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm font-medium focus:outline-none">
              <option>Sem 1 2025</option>
              <option>Sem 2 2024</option>
              <option>Sem 1 2024</option>
            </select>
            <button 
              onClick={() => toast.success("Filters applied")}
              className="p-2.5 bg-gray-50 text-gray-500 hover:text-green-600 rounded-xl transition border border-transparent hover:border-gray-200"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Student Details</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Semester</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">GPA</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Units</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Standing</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((rec, i) => (
                <tr key={i} className="hover:bg-green-50/20 transition group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-800">{rec.student}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{rec.regNo}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="font-medium">{rec.sem}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">{rec.gpa}</td>
                  <td className="px-6 py-4 text-gray-600">{rec.units} Cr</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      rec.standing === 'First Class' ? 'bg-green-100 text-green-600' :
                      rec.standing === 'Second Upper' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {rec.standing}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toast.success(`Opening detailed record for ${rec.student}`)}
                      className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-green-600 border border-transparent hover:border-gray-100"
                    >
                      <FileText size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Graduation Projection / Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Award size={18} className="text-yellow-500" />
            Top Performing Students (Current Semester)
          </h3>
          <div className="space-y-4">
            {records.slice(0, 3).map((r, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold text-sm border border-yellow-100">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 group-hover:text-green-600 transition">{r.student}</p>
                    <p className="text-xs text-gray-400">{r.program}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">{r.gpa}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{r.standing}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => toast('Loading full performance data...', { icon: '📊' })}
            className="w-full mt-6 py-3 border border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-green-600 hover:border-green-200 transition"
          >
            View All Performance Data
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={20} />
              <h3 className="font-bold text-lg">System Integrity</h3>
            </div>
            <p className="text-sm text-green-100 opacity-90 leading-relaxed">
              All records are currently synchronized with the University Senate database. Next backup in 4 hours.
            </p>
          </div>
          <div className="relative z-10 mt-8 flex items-center justify-between">
            <div className="text-xs">
              <p className="opacity-70">Last Verified</p>
              <p className="font-bold">Today, 08:45 AM</p>
            </div>
            <div className="text-xs">
              <p className="opacity-70">Records Fixed</p>
              <p className="font-bold">0 Pending</p>
            </div>
          </div>
          <AlertCircle size={100} className="absolute -bottom-5 -right-5 text-white/10" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AcademicRecords;
