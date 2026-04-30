import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  FileText,
  Building2,
  Calendar,
  Users,
  ChevronRight,
  Send,
  Flag
} from "lucide-react";

const ResultsApproval = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const [submissionsList, setSubmissionsList] = useState([
    { 
      id: "SUB-881", 
      department: "Computer Science", 
      course: "CS301 - Database Systems", 
      lecturer: "Dr. Sarah Kim", 
      students: 120, 
      passRate: "94%", 
      avgGPA: "3.2", 
      status: "Pending",
      anomalies: 0
    },
    { 
      id: "SUB-882", 
      department: "Mathematics", 
      course: "MATH202 - Advanced Calculus", 
      lecturer: "Prof. James Otieno", 
      students: 85, 
      passRate: "72%", 
      avgGPA: "2.8", 
      status: "Flagged",
      anomalies: 3
    },
    { 
      id: "SUB-883", 
      department: "Civil Engineering", 
      course: "ENG401 - Structural Design", 
      lecturer: "Dr. Mary Wanjiku", 
      students: 45, 
      passRate: "100%", 
      avgGPA: "3.5", 
      status: "Pending",
      anomalies: 0
    },
    { 
      id: "SUB-884", 
      department: "Nursing", 
      course: "NUR101 - Intro to Nursing", 
      lecturer: "Grace Akinyi", 
      students: 200, 
      passRate: "98%", 
      avgGPA: "3.1", 
      status: "Approved",
      anomalies: 0
    },
  ]);

  const stats = [
    { label: "Pending Submissions", value: "24", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Flagged Results", value: "3", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
    { label: "Approved (This Term)", value: "142", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Overall Pass Rate", value: "88%", icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Results Approval</h1>
          <p className="text-sm text-gray-500">Validate and publish faculty-submitted semester results</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Link 
            to="/dashboard/registrar/reports"
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <BarChart3 size={16} />
            Performance Analytics
          </Link>
          <button 
            onClick={() => {
              const tId = toast.loading("Publishing all approved results...");
              setTimeout(() => {
                toast.success("Successfully published 142 results", { id: tId });
              }, 1500);
            }}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <Send size={16} />
            Publish All Approved
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center gap-4 group hover:shadow-md transition">
              <div className={`p-3 rounded-xl ${s.bg} ${s.color} group-hover:scale-110 transition-transform`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{s.label}</p>
                <h2 className="text-xl font-bold text-gray-800">{s.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          {["Pending", "Flagged", "Approved"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-semibold transition-all relative ${
                activeTab === tab ? "text-green-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab} Submissions
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
              )}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by course or lecturer..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-xl focus:outline-none transition text-sm"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select className="flex-1 md:w-48 py-2 px-3 bg-gray-50 border-transparent rounded-xl text-sm focus:outline-none">
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Engineering</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 bg-gray-50/30">
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Course & Department</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Lecturer</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Stats</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">GPA</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissionsList.filter(s => activeTab === "Pending" ? s.status !== "Approved" : s.status === activeTab).map((s, i) => (
                <tr key={i} className="hover:bg-gray-50 transition group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-800">{s.course}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Building2 size={12} /> {s.department}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                        {s.lecturer.split(' ').pop()[0]}
                      </div>
                      <p className="text-gray-700 font-medium">{s.lecturer}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-700 font-semibold">{s.passRate} Pass</p>
                      <p className="text-xs text-gray-400">{s.students} Students</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: `${(parseFloat(s.avgGPA)/4)*100}%` }} />
                      </div>
                      <span className="font-bold text-gray-800">{s.avgGPA}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`w-fit px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        s.status === 'Approved' ? 'bg-green-100 text-green-600' :
                        s.status === 'Flagged' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {s.status}
                      </span>
                      {s.anomalies > 0 && (
                        <span className="text-[10px] text-red-500 flex items-center gap-1">
                          <AlertTriangle size={10} /> {s.anomalies} Anomalies
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedSubmission(s)}
                        className="px-3 py-1.5 bg-gray-50 hover:bg-white text-gray-600 hover:text-green-600 rounded-lg text-xs font-bold border border-transparent hover:border-gray-200 transition shadow-none hover:shadow-sm"
                      >
                        Review
                      </button>
                      <button 
                        onClick={() => {
                          setSubmissionsList(prev => prev.map(item => item.id === s.id ? { ...item, status: 'Flagged', anomalies: item.anomalies + 1 } : item));
                          toast.error(`Flagged ${s.course} for anomalies`);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition"
                      >
                        <Flag size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Trail Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardCheck size={18} className="text-green-600" />
            Recent Approvals Log
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-green-600 shadow-sm">
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">NUR101 Results Published</p>
                    <p className="text-[10px] text-gray-400">Approved by Registrar • 2h ago</p>
                  </div>
                </div>
                <button 
                  onClick={() => toast.success("Downloading PDF...")}
                  className="text-[10px] font-bold text-green-600 hover:underline"
                >
                  VIEW PDF
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Grading Policy Reminder</h3>
            <p className="text-sm text-gray-400 mb-4">All results must be validated against the 2026 Academic Senate Policy before publishing.</p>
            <Link 
              to="/dashboard/registrar/policies"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-bold transition flex items-center gap-2 inline-flex w-fit"
            >
              Review Policies <ChevronRight size={16} />
            </Link>
          </div>
          <AlertTriangle size={120} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
        </div>
      </div>

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setSelectedSubmission(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Review Submission</h3>
            <p className="text-sm text-gray-500 mb-6">{selectedSubmission.course} • {selectedSubmission.department}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">Lecturer</span>
                <span className="text-sm font-bold text-gray-800">{selectedSubmission.lecturer}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">Students Evaluated</span>
                <span className="text-sm font-bold text-gray-800">{selectedSubmission.students}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">Pass Rate</span>
                <span className="text-sm font-bold text-green-600">{selectedSubmission.passRate}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setSubmissionsList(prev => prev.map(s => s.id === selectedSubmission.id ? { ...s, status: 'Approved' } : s));
                  setSelectedSubmission(null);
                  toast.success(`${selectedSubmission.course} results approved`);
                }}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition"
              >
                Approve Results
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ResultsApproval;
