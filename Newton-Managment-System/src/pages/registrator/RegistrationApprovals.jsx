import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  ClipboardList, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Download,
  MoreVertical,
  Check,
  X,
  User,
  BookOpen,
  Calendar,
  AlertCircle
} from "lucide-react";

const RegistrationApprovals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isBulkApproving, setIsBulkApproving] = useState(false);

  const [requestsList, setRequestsList] = useState([
    { 
      id: "REQ-001", 
      student: "John Kamau", 
      regNo: "BIT/2024/001", 
      program: "BSc. Information Technology", 
      semester: "Sem 1 2026", 
      units: 6, 
      status: "Pending",
      date: "2026-04-28",
      courses: ["Calculus I", "Intro to Programming", "Database Systems", "Web Dev", "Network Security", "Ethics"]
    },
    { 
      id: "REQ-002", 
      student: "Mary Wanjiku", 
      regNo: "CS/2023/452", 
      program: "BSc. Computer Science", 
      semester: "Sem 1 2026", 
      units: 5, 
      status: "Approved",
      date: "2026-04-25",
      courses: ["Algorithms", "OS", "Software Engineering", "AI", "Mobile App Dev"]
    },
    { 
      id: "REQ-003", 
      student: "Alex Otieno", 
      regNo: "ENG/2022/112", 
      program: "BEng. Civil Engineering", 
      semester: "Sem 1 2026", 
      units: 7, 
      status: "Pending",
      date: "2026-04-29",
      courses: ["Structural Design", "Hydraulics", "Surveying", "Geotechnical Eng", "Math IV", "Physics III", "CAD"]
    },
    { 
      id: "REQ-004", 
      student: "Grace Akinyi", 
      regNo: "NUR/2024/089", 
      program: "BSc. Nursing", 
      semester: "Sem 1 2026", 
      units: 5, 
      status: "Rejected",
      date: "2026-04-20",
      courses: ["Anatomy", "Pharmacology", "Microbiology", "Nursing Ethics", "Clinical Practice"]
    },
    { 
      id: "REQ-005", 
      student: "Peter Mwangi", 
      regNo: "BIT/2024/022", 
      program: "BSc. Information Technology", 
      semester: "Sem 1 2026", 
      units: 6, 
      status: "Pending",
      date: "2026-04-29",
      courses: ["Calculus I", "Intro to Programming", "Database Systems", "Web Dev", "Network Security", "Ethics"]
    },
  ]);

  const stats = [
    { label: "Pending Requests", value: "86", color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Approved Today", value: "24", color: "text-green-600", bg: "bg-green-50" },
    { label: "Rejected Today", value: "3", color: "text-red-600", bg: "bg-red-50" },
    { label: "Avg. Process Time", value: "4.2h", color: "text-blue-600", bg: "bg-blue-50" },
  ];

  const filteredRequests = requestsList.filter(req => 
    (filterStatus === "All" || req.status === filterStatus) &&
    (req.student.toLowerCase().includes(searchTerm.toLowerCase()) || req.regNo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Registration Approvals</h1>
          <p className="text-sm text-gray-500">Review and approve student unit registrations for Sem 1 2026</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsExporting(true);
              const tId = toast.loading("Exporting list...");
              setTimeout(() => {
                toast.success("List exported successfully", { id: tId });
                setIsExporting(false);
              }, 1500);
            }}
            disabled={isExporting}
            className="flex-1 md:flex-none px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Download size={16} />
            {isExporting ? "Exporting..." : "Export List"}
          </button>
          <button 
            onClick={() => {
              setIsBulkApproving(true);
              const tId = toast.loading("Approving all pending requests...");
              setTimeout(() => {
                setRequestsList(prev => prev.map(r => r.status === 'Pending' ? { ...r, status: 'Approved' } : r));
                toast.success("Bulk approval complete", { id: tId });
                setIsBulkApproving(false);
              }, 1500);
            }}
            disabled={isBulkApproving}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <CheckCircle size={16} />
            {isBulkApproving ? "Processing..." : "Bulk Approve"}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{s.label}</p>
            <h2 className={`text-2xl font-bold ${s.color}`}>{s.value}</h2>
            <div className={`mt-2 h-1 w-full rounded-full ${s.bg}`}>
              <div className={`h-1 rounded-full ${s.color.replace('text', 'bg')}`} style={{ width: '60%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by student name or registration number..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={18} className="text-gray-400 hidden md:block" />
          <select 
            className="flex-1 md:w-40 py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Student Details</th>
                <th className="px-6 py-4 font-semibold">Program</th>
                <th className="px-6 py-4 font-semibold">Units</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.map((req, i) => (
                <tr key={i} className="hover:bg-green-50/30 transition group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">
                        {req.student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{req.student}</p>
                        <p className="text-xs text-gray-500">{req.regNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-700">{req.program}</p>
                    <p className="text-xs text-gray-400">{req.semester}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{req.units} Units</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      req.status === 'Approved' ? 'bg-green-100 text-green-600' :
                      req.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{req.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button 
                        onClick={() => setSelectedStudent(req)}
                        className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-green-600 border border-transparent hover:border-green-100 shadow-none hover:shadow-sm"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setRequestsList(prev => prev.map(r => r.id === req.id ? { ...r, status: 'Approved' } : r));
                          toast.success('Request Approved');
                        }}
                        className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-green-600 border border-transparent hover:border-gray-100"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setRequestsList(prev => prev.map(r => r.id === req.id ? { ...r, status: 'Rejected' } : r));
                          toast.success('Request Rejected');
                        }}
                        className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-red-600 border border-transparent hover:border-red-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Simulation */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
          <p>Showing 1 to {filteredRequests.length} of 86 requests</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded bg-white disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-green-600 rounded bg-green-600 text-white">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded bg-white">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded bg-white">Next</button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setSelectedStudent(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="bg-green-600 p-6 text-white relative">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="absolute right-4 top-4 p-2 hover:bg-white/20 rounded-full transition"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {selectedStudent.student.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedStudent.student}</h2>
                  <p className="text-green-100 opacity-80">{selectedStudent.regNo}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4 text-xs font-medium">
                <div className="flex items-center gap-1"><BookOpen size={14}/> {selectedStudent.program}</div>
                <div className="flex items-center gap-1"><Calendar size={14}/> {selectedStudent.semester}</div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Requested Units</h3>
                <span className="text-xs font-bold text-green-600 px-2 py-1 bg-green-50 rounded-lg">
                  {selectedStudent.units} TOTAL UNITS
                </span>
              </div>
              
              <div className="space-y-2 mb-8 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {selectedStudent.courses.map((course, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between group hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 group-hover:text-green-600 transition shadow-sm">
                        <CheckCircle size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{course}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">CORE</span>
                  </div>
                ))}
              </div>

              {selectedStudent.status === 'Pending' && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setRequestsList(prev => prev.map(r => r.id === selectedStudent.id ? { ...r, status: 'Rejected' } : r));
                      setSelectedStudent(null);
                      toast.success('Request Rejected');
                    }}
                    className="flex-1 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl font-bold transition flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    Reject Request
                  </button>
                  <button 
                    onClick={() => {
                      setRequestsList(prev => prev.map(r => r.id === selectedStudent.id ? { ...r, status: 'Approved' } : r));
                      setSelectedStudent(null);
                      toast.success('Request Approved');
                    }}
                    className="flex-1 py-3 bg-green-600 text-white hover:bg-green-700 rounded-2xl font-bold transition shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Approve Request
                  </button>
                </div>
              )}

              {selectedStudent.status !== 'Pending' && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 ${
                  selectedStudent.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <AlertCircle size={20} />
                  <p className="text-sm font-medium">This request was already {selectedStudent.status.toLowerCase()} on {selectedStudent.date}.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RegistrationApprovals;
