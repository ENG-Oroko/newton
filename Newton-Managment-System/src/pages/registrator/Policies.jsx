import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Scale, 
  Search, 
  Plus, 
  Filter, 
  ChevronRight, 
  FileText, 
  ShieldCheck, 
  History,
  BookOpen,
  Info,
  CheckCircle,
  AlertTriangle,
  Download,
  ExternalLink
} from "lucide-react";

const RegistrarPolicies = () => {
  const [activeTab, setActiveTab] = useState("Academic Rules");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewPolicyModalOpen, setIsNewPolicyModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [policiesList, setPoliciesList] = useState([
    { title: "Grading Scale Policy 2026", category: "Grading", version: "2.1", status: "Active", date: "2026-01-10", senateId: "SN-442" },
    { title: "Student Progression Requirements", category: "Academics", version: "1.5", status: "Active", date: "2025-12-05", senateId: "SN-410" },
    { title: "Examination Conduct Policy", category: "Exams", version: "3.0", status: "Draft", date: "2026-04-15", senateId: "Pending" },
    { title: "Credit Transfer Framework", category: "Admissions", version: "1.2", status: "Active", date: "2024-11-20", senateId: "SN-388" },
    { title: "Thesis Submission Guidelines", category: "Post-Graduate", version: "1.0", status: "Active", date: "2026-02-28", senateId: "SN-455" },
  ]);

  const gradingSystems = [
    { range: "70% - 100%", grade: "A", points: "4.0", classification: "First Class" },
    { range: "60% - 69%", grade: "B", points: "3.0", classification: "Second Upper" },
    { range: "50% - 59%", grade: "C", points: "2.0", classification: "Second Lower" },
    { range: "40% - 49%", grade: "D", points: "1.0", classification: "Pass" },
    { range: "0% - 39%", grade: "F", points: "0.0", classification: "Fail" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Academic Policies & Rules</h1>
          <p className="text-sm text-gray-500">Manage institutional academic standards, grading systems, and Senate-approved regulations</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setIsHistoryModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <History size={16} />
            Version History
          </button>
          <button 
            onClick={() => setIsNewPolicyModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <Plus size={16} />
            New Policy Draft
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Policy List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100 bg-gray-50/30">
              {["Academic Rules", "Senate Minutes", "Archived"].map(tab => (
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

            <div className="p-4 border-b border-gray-100 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search policies by keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-green-500 focus:outline-none transition text-sm"
                />
              </div>
              <button 
                onClick={() => toast.success("Filters applied")}
                className="p-2.5 bg-gray-50 text-gray-500 hover:text-green-600 rounded-xl transition border border-transparent hover:border-gray-200"
              >
                <Filter size={18} />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {policiesList.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((policy, i) => (
                <div key={i} className="p-4 hover:bg-gray-50 transition group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-green-50 text-green-600 rounded-xl shadow-sm">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-green-600 transition">{policy.title}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <BookOpen size={10} /> {policy.category}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck size={10} /> Senate ID: {policy.senateId}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <Info size={10} /> Version {policy.version}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      policy.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {policy.status}
                    </span>
                    <button 
                      onClick={() => toast.success(`Viewing full text for ${policy.title}`)}
                      className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-green-600 border border-transparent hover:border-gray-200 shadow-none hover:shadow-sm"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl h-fit">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-orange-800 mb-1">Senate Review Required</h3>
              <p className="text-sm text-orange-700/80 leading-relaxed mb-4">
                The current <strong>Examination Conduct Policy</strong> is in draft mode and requires approval from the Academic Senate before it can be enforced for the 2026 Final Exams.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => toast.success('Review scheduled with Academic Senate')}
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition"
                >
                  Schedule Review
                </button>
                <button 
                  onClick={() => toast.success('Opening Draft Editor')}
                  className="px-4 py-2 bg-white text-orange-600 border border-orange-200 rounded-xl text-xs font-bold hover:bg-orange-100 transition"
                >
                  Edit Draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Grading Systems & Quick Info */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Scale size={18} className="text-green-600" />
                Active Grading System
              </h3>
              <button 
                onClick={() => toast.success('Downloading Grading System Matrix')}
                className="p-2 text-gray-400 hover:text-green-600 transition"
              >
                <Download size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {gradingSystems.map((g, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-white border border-transparent hover:border-gray-100 transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-gray-800 font-bold border border-gray-100 shadow-sm group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-all">
                      {g.grade}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{g.classification}</p>
                      <p className="text-[10px] text-gray-400">{g.range}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-green-600">{g.points} GP</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => toast.success('New Grade Tier row added')}
              className="w-full mt-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 transition flex items-center justify-center gap-2"
            >
              <Plus size={14} /> Add Grade Tier
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-4">Policy Enforcement</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs items-center">
                <span className="text-gray-400">System Integration</span>
                <span className="text-green-400 font-bold flex items-center gap-1">
                  <CheckCircle size={12} /> Active
                </span>
              </div>
              <div className="flex justify-between text-xs items-center">
                <span className="text-gray-400">Automated Checks</span>
                <span className="text-green-400 font-bold flex items-center gap-1">
                  <CheckCircle size={12} /> Enabled
                </span>
              </div>
              <div className="flex justify-between text-xs items-center">
                <span className="text-gray-400">Last System Sync</span>
                <span className="text-white font-bold">2h ago</span>
              </div>
            </div>
            <hr className="my-6 border-white/10" />
            <button 
              onClick={() => toast('Audit logs coming soon', { icon: '🛡️' })}
              className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition"
            >
              View Audit Logs
            </button>
          </div>
        </div>

      </div>

      {/* New Policy Modal */}
      {isNewPolicyModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsNewPolicyModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">New Policy Draft</h3>
              <button onClick={() => setIsNewPolicyModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <AlertTriangle className="opacity-0" size={24} /> {/* Placeholder to center the title if needed, or just standard X */}
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const formData = new FormData(e.target);
              
              const newPolicy = {
                title: formData.get("title"),
                category: formData.get("category"),
                version: "1.0",
                status: "Draft",
                date: new Date().toISOString().split('T')[0],
                senateId: "Pending"
              };

              setTimeout(() => {
                setPoliciesList(prev => [newPolicy, ...prev]);
                toast.success("New policy draft created!");
                setIsSubmitting(false);
                setIsNewPolicyModalOpen(false);
              }, 1000);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Policy Title</label>
                  <input required name="title" type="text" placeholder="e.g. Remote Exam Protocol" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Category</label>
                  <select required name="category" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                    <option value="Grading">Grading</option>
                    <option value="Academics">Academics</option>
                    <option value="Exams">Exams</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Post-Graduate">Post-Graduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Initial Draft Content</label>
                  <textarea required rows="4" placeholder="Brief description of the policy..." className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition resize-none"></textarea>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsNewPolicyModalOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition shadow-lg shadow-green-600/20 disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? "Saving..." : "Create Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsHistoryModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><History size={24} /></div>
                <h3 className="text-xl font-bold text-gray-800">System Version History</h3>
              </div>
              <button onClick={() => setIsHistoryModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <span className="text-2xl font-bold">×</span>
              </button>
            </div>
            
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {[
                { version: "v2026.1", date: "April 12, 2026", user: "Senate Admin", changes: "Updated Grading Scale Policy 2026 (v2.1)" },
                { version: "v2026.0", date: "Jan 10, 2026", user: "Registrar", changes: "Published Grading Scale Policy 2026 (v2.0)" },
                { version: "v2025.4", date: "Dec 05, 2025", user: "Registrar", changes: "Updated Student Progression Requirements (v1.5)" },
                { version: "v2025.3", date: "Aug 22, 2025", user: "Senate Admin", changes: "Archived Legacy Credit Transfer rules" }
              ].map((log, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 border-4 border-blue-100" />
                    {i !== 3 && <div className="w-0.5 h-full bg-gray-100 my-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-bold text-gray-800">{log.version} <span className="text-gray-400 text-xs font-medium ml-2">{log.date}</span></p>
                    <p className="text-xs text-gray-600 mt-1">{log.changes}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2 flex items-center gap-1">
                      <ShieldCheck size={10} /> By {log.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsHistoryModalOpen(false)}
              className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RegistrarPolicies;
