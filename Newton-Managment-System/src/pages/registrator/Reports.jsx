import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  ChevronRight, 
  Users, 
  TrendingUp, 
  PieChart, 
  FileText, 
  Filter, 
  Printer, 
  ArrowUpRight, 
  ArrowDownRight,
  School,
  GraduationCap
} from "lucide-react";

const RegistrarReports = () => {
  const [activeReport, setActiveReport] = useState("Enrollment Reports");
  const [isPrinting, setIsPrinting] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2026");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(null);

  const enrollmentStats = [
    { department: "Computer Science", current: 850, previous: 780, trend: 8.9 },
    { department: "Mathematics", current: 320, previous: 345, trend: -7.2 },
    { department: "Civil Engineering", current: 450, previous: 410, trend: 9.7 },
    { department: "Nursing", current: 620, previous: 580, trend: 6.8 },
    { department: "Business Admin", current: 920, previous: 900, trend: 2.2 },
  ];

  const reportTypes = [
    { name: "Enrollment Reports", icon: Users, desc: "Student population by program and year." },
    { name: "Graduation Statistics", icon: GraduationCap, desc: "Completion rates and classification data." },
    { name: "Academic Performance", icon: BarChart3, desc: "GPA trends and department rankings." },
    { name: "Operational Efficiency", icon: TrendingUp, desc: "Transcript and registration processing times." },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Operational Reports</h1>
          <p className="text-sm text-gray-500">Access institutional analytics, enrollment trends, and academic performance data</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsPrinting(true);
              const tId = toast.loading("Preparing dashboard for printing...");
              setTimeout(() => {
                toast.success("Print job sent successfully", { id: tId });
                setIsPrinting(false);
              }, 1500);
            }}
            disabled={isPrinting}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <Printer size={16} />
            {isPrinting ? "Printing..." : "Print Dashboard"}
          </button>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20 cursor-pointer"
          >
            <option value="2026">Academic Year 2026</option>
            <option value="2025">Academic Year 2025</option>
            <option value="2024">Academic Year 2024</option>
            <option value="2023">Academic Year 2023</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Report Types Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          {reportTypes.map((type, i) => (
            <button
              key={i}
              onClick={() => setActiveReport(type.name)}
              className={`w-full p-4 rounded-2xl border transition-all text-left flex items-start gap-4 ${
                activeReport === type.name 
                  ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-600/20" 
                  : "bg-white border-gray-200 text-gray-500 hover:border-green-600 hover:bg-green-50/50"
              }`}
            >
              <div className={`p-2 rounded-xl h-fit ${activeReport === type.name ? "bg-white/20" : "bg-gray-50"}`}>
                <type.icon size={20} className={activeReport === type.name ? "text-white" : "text-green-600"} />
              </div>
              <div>
                <p className={`font-bold text-sm ${activeReport === type.name ? "text-white" : "text-gray-800"}`}>{type.name}</p>
                <p className={`text-[10px] mt-1 leading-relaxed ${activeReport === type.name ? "text-green-100" : "text-gray-400"}`}>{type.desc}</p>
              </div>
            </button>
          ))}
          
          <div className="bg-gray-900 rounded-2xl p-5 text-white mt-6 relative overflow-hidden">
            <h3 className="text-sm font-bold mb-2">Custom Analytics</h3>
            <p className="text-[10px] text-gray-400 mb-4 leading-relaxed">Need a specialized report for the Senate or Directorate? Request a custom SQL export.</p>
            <button 
              onClick={() => setIsExportModalOpen(true)}
              className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              Request Export <ChevronRight size={14} />
            </button>
            <PieChart size={60} className="absolute -bottom-4 -right-4 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Main Analytics Content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Quick Analytics Header */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-green-600" />
                {activeReport} Overview
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => toast.success('Filters applied')}
                  className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400"
                >
                  <Filter size={18} />
                </button>
                <button 
                  onClick={() => {
                    const tId = toast.loading(`Downloading ${activeReport} PDF...`);
                    setTimeout(() => toast.success(`${activeReport} PDF downloaded`, { id: tId }), 1500);
                  }}
                  className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-green-100 transition"
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-green-100 hover:bg-white transition">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Current Enrollment</p>
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-gray-800">3,160</h4>
                  <span className="text-xs font-bold text-green-600 flex items-center bg-green-50 px-1.5 rounded-lg">
                    <ArrowUpRight size={12} /> 12%
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-green-100 hover:bg-white transition">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">New Registrations</p>
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-gray-800">482</h4>
                  <span className="text-xs font-bold text-green-600 flex items-center bg-green-50 px-1.5 rounded-lg">
                    <ArrowUpRight size={12} /> 5%
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-green-100 hover:bg-white transition">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Graduation Rate</p>
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-gray-800">92.4%</h4>
                  <span className="text-xs font-bold text-red-600 flex items-center bg-red-50 px-1.5 rounded-lg">
                    <ArrowDownRight size={12} /> 1.2%
                  </span>
                </div>
              </div>
            </div>

            {/* Department Comparison Table */}
            <div className="overflow-hidden border border-gray-100 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500 font-bold">
                  <tr>
                    <th className="px-4 py-3 uppercase tracking-wider">Department</th>
                    <th className="px-4 py-3 uppercase tracking-wider text-center">Prev. Term</th>
                    <th className="px-4 py-3 uppercase tracking-wider text-center">Curr. Term</th>
                    <th className="px-4 py-3 uppercase tracking-wider text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {enrollmentStats.map((dept, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition">
                      <td className="px-4 py-4 font-bold text-gray-800 flex items-center gap-2">
                        <School size={14} className="text-gray-300" /> {dept.department}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-400 font-medium">{dept.previous}</td>
                      <td className="px-4 py-4 text-center text-gray-800 font-bold">{dept.current}</td>
                      <td className="px-4 py-4 text-right">
                        <span className={`px-2 py-1 rounded-lg font-bold flex items-center justify-end gap-1 ${
                          dept.trend > 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                        }`}>
                          {dept.trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {Math.abs(dept.trend)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Ready Reports */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText size={18} className="text-green-600" />
              Download Ready Reports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Semester Enrollment Summary", date: "Generated: Today, 09:30 AM", size: "2.4 MB" },
                { title: "Student Progression Analysis", date: "Generated: Apr 28, 2026", size: "4.1 MB" },
                { title: "Graduation List Draft v1", date: "Generated: Apr 25, 2026", size: "1.2 MB" },
                { title: "Staff Distribution Report", date: "Generated: Apr 20, 2026", size: "0.8 MB" },
              ].map((report, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl flex items-center justify-between group hover:border-green-200 hover:bg-green-50/20 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-green-600 transition">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{report.title}</p>
                      <p className="text-[10px] text-gray-400">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toast.success(`Downloading ${report.title}...`)}
                    className="p-2 text-gray-400 hover:text-green-600 transition"
                  >
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Custom Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsExportModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Request Custom Export</h3>
              <button onClick={() => setIsExportModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsExporting(true);
              const formData = new FormData(e.target);
              const tId = toast.loading("Sending export request to IT Support...");
              setTimeout(() => {
                toast.success(`Custom "${formData.get('reportType')}" export request submitted!`, { id: tId });
                setIsExporting(false);
                setIsExportModalOpen(false);
              }, 1500);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Report Type</label>
                  <select required name="reportType" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                    <option value="Enrollment Summary">Enrollment Summary</option>
                    <option value="Graduation Analysis">Graduation Analysis</option>
                    <option value="GPA Distribution">GPA Distribution</option>
                    <option value="Department Comparison">Department Comparison</option>
                    <option value="Custom SQL Query">Custom SQL Query</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">From Date</label>
                    <input required name="fromDate" type="date" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">To Date</label>
                    <input required name="toDate" type="date" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Notes / Specific Requirements</label>
                  <textarea rows="3" name="notes" placeholder="Describe any specific filters or data requirements..." className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition resize-none"></textarea>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setIsExportModalOpen(false)} disabled={isExporting}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isExporting}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition shadow-lg shadow-green-600/20 disabled:opacity-50 flex items-center justify-center">
                  {isExporting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RegistrarReports;
