import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  ChevronRight,
  Download,
  CheckCircle,
  AlertCircle,
  XCircle,
  UserCheck,
  UserPlus,
  BarChart3,
  FileText
} from "lucide-react";

const RegistrarStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [isExporting, setIsExporting] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [studentsList, setStudentsList] = useState([
    { id: "STU-001", name: "John Kamau", regNo: "BIT/2024/001", program: "BSc. IT", year: 3, status: "Active", standing: "Good", gpa: "3.8", email: "john.k@university.ac.ke" },
    { id: "STU-002", name: "Mary Wanjiku", regNo: "CS/2023/452", program: "BSc. CS", year: 4, status: "Active", standing: "Excellent", gpa: "3.9", email: "mary.w@university.ac.ke" },
    { id: "STU-003", name: "Alex Otieno", regNo: "ENG/2022/112", program: "BEng. Civil", year: 2, status: "Probation", standing: "At Risk", gpa: "1.9", email: "alex.o@university.ac.ke" },
    { id: "STU-004", name: "Grace Akinyi", regNo: "NUR/2024/089", program: "BSc. Nursing", year: 1, status: "Active", standing: "Good", gpa: "3.4", email: "grace.a@university.ac.ke" },
    { id: "STU-005", name: "Peter Mwangi", regNo: "BUS/2023/022", program: "BCom", year: 2, status: "Suspended", standing: "Suspended", gpa: "0.0", email: "peter.m@university.ac.ke" },
    { id: "STU-006", name: "Sarah Wilson", regNo: "BIT/2025/102", program: "BSc. IT", year: 1, status: "Active", standing: "Good", gpa: "3.2", email: "sarah.w@university.ac.ke" },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-600 border-green-200";
      case "Probation": return "bg-orange-100 text-orange-600 border-orange-200";
      case "Suspended": return "bg-red-100 text-red-600 border-red-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStandingIcon = (standing) => {
    switch (standing) {
      case "Excellent": return <CheckCircle size={14} className="text-green-600" />;
      case "Good": return <CheckCircle size={14} className="text-blue-600" />;
      case "At Risk": return <AlertCircle size={14} className="text-orange-600" />;
      case "Suspended": return <XCircle size={14} className="text-red-600" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Directory</h1>
          <p className="text-sm text-gray-500">Manage institutional student records and enrollment statuses</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsExporting(true);
              const tId = toast.loading("Preparing CSV export...");
              setTimeout(() => {
                toast.success("CSV exported successfully", { id: tId });
                setIsExporting(false);
              }, 1500);
            }}
            disabled={isExporting}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <Download size={16} />
            {isExporting ? "Exporting..." : "Export CSV"}
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <UserPlus size={16} />
            New Admission
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Students", value: "4,820", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active Today", value: "4,210", icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
          { label: "On Probation", value: "145", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "New Admissions", value: "320", icon: Plus, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">{stat.label}</p>
              <h2 className="text-xl font-bold text-gray-800">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name, registration number, or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-xl focus:outline-none transition text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select 
              className="py-2.5 px-4 bg-gray-50 border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Active</option>
              <option>Probation</option>
              <option>Suspended</option>
              <option>Graduated</option>
              <option>All Status</option>
            </select>
            <select className="py-2.5 px-4 bg-gray-50 border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20">
              <option>All Programs</option>
              <option>BSc. IT</option>
              <option>BSc. CS</option>
              <option>Nursing</option>
            </select>
            <select className="py-2.5 px-4 bg-gray-50 border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20">
              <option>All Years</option>
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
            </select>
            <button 
              onClick={() => toast.success("Filters applied")}
              className="p-2.5 bg-gray-50 text-gray-500 hover:text-green-600 rounded-xl transition border border-transparent hover:border-gray-200"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {studentsList.filter(s => 
          (statusFilter === "All Status" || s.status === statusFilter) && 
          (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.regNo.toLowerCase().includes(searchTerm.toLowerCase()))
        ).map((student, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition group relative overflow-hidden">
            {/* Status Indicator */}
            <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold border-l border-b ${getStatusColor(student.status)}`}>
              {student.status.toUpperCase()}
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-xl font-bold border border-green-100 group-hover:scale-105 transition-transform">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition">{student.name}</h3>
                <p className="text-xs text-gray-400 font-medium">{student.regNo}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getStandingIcon(student.standing)}
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{student.standing} STANDING</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-500">
                  <GraduationCap size={14} className="text-gray-400" />
                  <span>Program</span>
                </div>
                <span className="font-semibold text-gray-800">{student.program}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={14} className="text-gray-400" />
                  <span>Year of Study</span>
                </div>
                <span className="font-semibold text-gray-800">Year {student.year}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-500">
                  <BarChart3 size={14} className="text-gray-400" />
                  <span>Current CGPA</span>
                </div>
                <span className="font-bold text-green-600">{student.gpa}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button 
                onClick={() => toast.success(`Opening email client for ${student.email}`)}
                className="flex-1 py-2 bg-gray-50 hover:bg-green-600 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 text-gray-600 border border-gray-100"
              >
                <Mail size={14} /> Email
              </button>
              <button 
                onClick={() => toast('Profile view coming soon', { icon: '👤' })}
                className="flex-1 py-2 bg-gray-50 hover:bg-green-600 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 text-gray-600 border border-gray-100"
              >
                <ChevronRight size={14} /> Profile
              </button>
              <button 
                onClick={() => toast('More options', { icon: '⚙️' })}
                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400 transition border border-gray-100"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2 bg-white p-2 border border-gray-200 rounded-2xl shadow-sm">
          <button className="p-2 hover:bg-gray-50 rounded-xl transition text-gray-400" disabled>
            <ChevronRight className="rotate-180" size={20} />
          </button>
          <button className="w-10 h-10 bg-green-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-600/20">1</button>
          <button className="w-10 h-10 hover:bg-gray-50 rounded-xl font-bold text-sm text-gray-600 transition border border-transparent hover:border-gray-100">2</button>
          <button className="w-10 h-10 hover:bg-gray-50 rounded-xl font-bold text-sm text-gray-600 transition border border-transparent hover:border-gray-100">3</button>
          <span className="px-2 text-gray-300">...</span>
          <button className="w-10 h-10 hover:bg-gray-50 rounded-xl font-bold text-sm text-gray-600 transition border border-transparent hover:border-gray-100">42</button>
          <button className="p-2 hover:bg-gray-50 rounded-xl transition text-gray-600">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">New Admission</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <XCircle size={24} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              toast.success("New student admitted successfully!");
              setIsAddModalOpen(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                  <input required type="text" placeholder="e.g. Jane Doe" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Registration Number</label>
                  <input required type="text" placeholder="e.g. BIT/2026/001" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Program</label>
                  <select required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                    <option>BSc. IT</option>
                    <option>BSc. CS</option>
                    <option>BEng. Civil</option>
                    <option>BSc. Nursing</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition shadow-lg shadow-green-600/20"
                >
                  Admit Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RegistrarStudents;
