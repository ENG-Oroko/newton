import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  GraduationCap, 
  Target, 
  TrendingDown, 
  ChevronRight, 
  Download, 
  Calendar,
  Search,
  Filter,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const AcademicPerformance = () => {
  const [isExporting, setIsExporting] = useState(false);

  const departmentPerformance = [
    { name: "School of Computing", avgGPA: 3.42, passRate: 94, graduates: 280, health: "Excellent" },
    { name: "School of Engineering", avgGPA: 3.12, passRate: 88, graduates: 150, health: "Good" },
    { name: "School of Health Sciences", avgGPA: 3.55, passRate: 98, graduates: 120, health: "Excellent" },
    { name: "School of Business", avgGPA: 2.95, passRate: 82, graduates: 320, health: "Fair" },
    { name: "School of Humanities", avgGPA: 3.20, passRate: 90, graduates: 85, health: "Good" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Academic Performance</h1>
          <p className="text-sm text-gray-500">Institution-wide academic health, GPA analytics, and graduation metrics</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsExporting(true);
              const tId = toast.loading("Exporting performance analytics...");
              setTimeout(() => {
                toast.success("Analytics exported successfully", { id: tId });
                setIsExporting(false);
              }, 1500);
            }}
            disabled={isExporting}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <Download size={16} />
            {isExporting ? "Exporting..." : "Export Analytics"}
          </button>
          <button 
            onClick={() => toast('Academic year selection coming soon', { icon: '📅' })}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <Calendar size={16} />
            Academic Year 2026
          </button>
        </div>
      </div>

      {/* Performance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Overall Avg GPA", value: "3.24", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50", trend: "+0.15", up: true },
          { label: "Institution Pass Rate", value: "89.2%", icon: Target, color: "text-green-600", bg: "bg-green-50", trend: "+2.4%", up: true },
          { label: "Graduation Projection", value: "1,240", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50", trend: "-5%", up: false },
          { label: "Dean's List (Current)", value: "312", icon: Award, color: "text-orange-600", bg: "bg-orange-50", trend: "+45", up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center text-[10px] font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
            <h2 className="text-2xl font-black text-gray-800">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Department Rankings */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-green-600" />
              School Performance Rankings
            </h3>
            <div className="flex gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="text" placeholder="Search schools..." className="pl-9 pr-4 py-1.5 bg-gray-50 rounded-lg text-xs focus:outline-none w-40" />
              </div>
              <button 
                onClick={() => toast.success("Filters applied")}
                className="p-2 bg-gray-50 text-gray-400 hover:text-green-600 rounded-lg transition"
              >
                <Filter size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-black border-b border-gray-50">
                  <th className="px-8 py-4">Department Name</th>
                  <th className="px-8 py-4 text-center">Avg GPA</th>
                  <th className="px-8 py-4 text-center">Pass Rate</th>
                  <th className="px-8 py-4 text-center">Graduates</th>
                  <th className="px-8 py-4 text-right">Academic Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {departmentPerformance.map((dept, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-gray-300 w-4">{i + 1}</span>
                        <p className="font-bold text-gray-700 group-hover:text-green-600 transition">{dept.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-8 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: `${(dept.avgGPA/4)*100}%` }} />
                        </div>
                        <span className="font-bold text-gray-800">{dept.avgGPA}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="font-medium text-gray-600">{dept.passRate}%</span>
                    </td>
                    <td className="px-8 py-5 text-center font-medium text-gray-600">{dept.graduates}</td>
                    <td className="px-8 py-5 text-right">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        dept.health === 'Excellent' ? 'bg-green-100 text-green-600' : 
                        dept.health === 'Good' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {dept.health}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button 
            onClick={() => toast.success('Opening complete performance data...')}
            className="w-full py-4 text-xs font-bold text-gray-400 hover:text-green-600 hover:bg-green-50 transition flex items-center justify-center gap-2"
          >
            View Complete Performance Table <ChevronRight size={14} />
          </button>
        </div>

        {/* Right Sidebar: Quick Insights */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-600" />
              Academic Health Indicators
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>Syllabus Completion</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-1.5">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>Student Attendance</span>
                  <span>88%</span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-1.5">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>Faculty Submission Rate</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-1.5">
                  <div className="bg-orange-500 h-full rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm text-orange-500">
                <AlertCircle size={20} />
              </div>
              <p className="text-[10px] text-gray-500 leading-tight">
                <strong>Attention:</strong> 3 departments have not yet completed result submissions for this term.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <h3 className="text-lg font-bold mb-2">Graduation Projections</h3>
            <p className="text-xs text-indigo-100 opacity-80 mb-6">Estimated completion for June 2026</p>
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-4xl font-black tracking-tight">1,240</p>
                <p className="text-[10px] font-bold uppercase text-indigo-200">Candidates</p>
              </div>
              <button 
                onClick={() => toast.success('Generating graduation candidates list...')}
                className="px-4 py-2 bg-white text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-50 transition"
              >
                Full List
              </button>
            </div>
            <div className="mt-4 w-full bg-white/10 rounded-full h-1">
              <div className="bg-white h-full rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-[9px] text-indigo-200 mt-2 font-bold uppercase tracking-widest">85% Eligibility Verified</p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AcademicPerformance;
