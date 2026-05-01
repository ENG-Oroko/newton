import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  History,
  ArrowRight,
  User,
  Settings,
  ChevronRight
} from "lucide-react";

const Overrides = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isNewOverrideModalOpen, setIsNewOverrideModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [pinError, setPinError] = useState("");

  const [overridesList, setOverridesList] = useState([
    { id: "OVR-2026-001", student: "John Kamau", regNo: "BIT/2024/001", request: "Grade Override (F to C)", reason: "Missing Script Found", requestedBy: "Dr. Sarah Kim", status: "Pending", time: "2h ago" },
    { id: "OVR-2026-002", student: "Mary Wanjiku", regNo: "CS/2023/452", request: "Financial Clearance", reason: "Bank Draft Verified", requestedBy: "Finance Office", status: "Approved", time: "5h ago" },
    { id: "OVR-2026-003", student: "Alex Otieno", regNo: "ENG/2022/112", request: "Registration Unlock", reason: "Late Fee Waived", requestedBy: "Registrar", status: "Rejected", time: "1 day ago" },
    { id: "OVR-2026-004", student: "Grace Akinyi", regNo: "NUR/2024/089", request: "Unit Cap Extension", reason: "Extra Credits Approved", requestedBy: "Dean Health", status: "Pending", time: "3h ago" },
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Administrative Overrides</h1>
          <p className="text-sm text-gray-500">Manage manual system overrides for grades, financial records, and registration locks</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setIsLogsModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <History size={16} />
            Override Logs
          </button>
          <button 
            onClick={() => setIsNewOverrideModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-red-600/20"
          >
            <ShieldAlert size={16} />
            New Override Request
          </button>
        </div>
      </div>

      {/* Critical Notice */}
      <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex gap-4 mb-8">
        <div className="p-3 bg-red-100 text-red-600 rounded-2xl h-fit">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h3 className="font-bold text-red-900 mb-1">Authorization Protocol Enforcement</h3>
          <p className="text-sm text-red-700/70 leading-relaxed">
            Every system override is logged with your institutional ID and IP address. Academic overrides must be backed by a Senate-approved resolution or Dean's recommendation letter.
          </p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/20">
          {["Pending", "Approved", "Rejected", "Archived"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-5 text-sm font-black transition-all relative uppercase tracking-widest ${
                activeTab === tab ? "text-red-600" : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
              )}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by student name or request type..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-red-500 focus:outline-none transition text-sm shadow-inner"
            />
          </div>
          <button 
            onClick={() => toast.success('Filters applied')}
            className="p-2.5 bg-gray-50 text-gray-500 hover:text-red-600 rounded-xl transition border border-transparent hover:border-gray-200"
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Overrides List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-black border-b border-gray-50">
                <th className="px-8 py-5">Request Info</th>
                <th className="px-8 py-5">Student Details</th>
                <th className="px-8 py-5">Requested By</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {overridesList.filter(o => activeTab === "All" || o.status === activeTab).map((ovr, i) => (
                <tr key={i} className="hover:bg-red-50/10 transition group">
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-bold text-gray-800">{ovr.request}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">"{ovr.reason}"</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] font-black">
                        {ovr.student[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 group-hover:text-red-600 transition">{ovr.student}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{ovr.regNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-300" />
                      <span className="text-xs font-medium text-gray-600">{ovr.requestedBy}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      ovr.status === 'Approved' ? 'bg-green-100 text-green-600' :
                      ovr.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {ovr.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {
                          setSelectedAction({ type: 'Approve', ovr });
                          setIsConfirmModalOpen(true);
                        }}
                        className="p-2.5 bg-gray-50 hover:bg-green-600 hover:text-white text-green-600 rounded-xl transition shadow-sm border border-transparent hover:border-green-600"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedAction({ type: 'Reject', ovr });
                          setIsConfirmModalOpen(true);
                        }}
                        className="p-2.5 bg-gray-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition shadow-sm border border-transparent hover:border-red-600"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Override Categories Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { title: "Academic Overrides", icon: Edit3, color: "text-blue-600", bg: "bg-blue-50", desc: "Modify grades, unit registration, and semester standings." },
          { title: "Financial Overrides", icon: Unlock, color: "text-green-600", bg: "bg-green-50", desc: "Bypass tuition locks and clear payment discrepancies." },
          { title: "Registration Locks", icon: Lock, color: "text-red-600", bg: "bg-red-50", desc: "Manage institutional registration deadlines and student blocks." },
        ].map((cat, i) => (
          <div 
            key={i} 
            onClick={() => toast(`Initializing ${cat.title} workflow`, { icon: '⚙️' })}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
          >
            <div className={`p-4 rounded-2xl ${cat.bg} ${cat.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
              <cat.icon size={24} />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{cat.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">{cat.desc}</p>
            <div className="flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest group-hover:gap-4 transition-all">
              Initialize Override <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
        <div className="relative z-10 max-w-xl">
          <h3 className="text-xl font-bold mb-2">Emergency System Unlock</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            In case of institutional-wide failure or Senate emergency, use the global unlock to bypass all validation layers. This action is recorded and sent to the Board of Directors.
          </p>
          <button 
            onClick={() => toast.error('Emergency Key usage requires physical 2FA token')}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition shadow-lg shadow-red-600/30"
          >
            Emergency Master Key
          </button>
        </div>
        <Settings size={200} className="absolute -bottom-20 -right-20 text-white/5 rotate-12" />
        <div className="relative z-10 mt-8 md:mt-0 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
              <ShieldAlert size={20} />
            </div>
            <p className="text-sm font-bold">2FA Required for All Overrides</p>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Security Level: MAXIMUM</p>
        </div>
      </div>

      {/* Override 2-Step Confirmation Modal */}
      {isConfirmModalOpen && selectedAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsConfirmModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${selectedAction.type === 'Approve' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {selectedAction.type === 'Approve' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                </div>
                <h3 className="text-xl font-bold text-gray-800">Confirm Override</h3>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">You are about to <strong className={selectedAction.type === 'Approve' ? 'text-green-600' : 'text-red-600'}>{selectedAction.type.toUpperCase()}</strong> the following request:</p>
              <p className="text-xs font-bold text-gray-800">{selectedAction.ovr.request}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">For: {selectedAction.ovr.student} ({selectedAction.ovr.regNo})</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (pinValue.length < 4) {
                setPinError("PIN must be 4 digits");
                return;
              }
              if (pinValue !== "1234") { // Demo PIN
                setPinError("Incorrect PIN. Please try again.");
                return;
              }
              setIsSubmitting(true);
              setPinError("");
              const newStatus = selectedAction.type === 'Approve' ? 'Approved' : 'Rejected';
              setTimeout(() => {
                setOverridesList(prev => prev.map(o => o.id === selectedAction.ovr.id ? { ...o, status: newStatus } : o));
                selectedAction.type === 'Approve'
                  ? toast.success(`Override ${selectedAction.ovr.id} Approved!`)
                  : toast.error(`Override ${selectedAction.ovr.id} Rejected.`);
                setIsSubmitting(false);
                setIsConfirmModalOpen(false);
                setPinValue("");
              }, 800);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Enter PIN to Confirm <span className="text-gray-300 font-normal italic">(Demo PIN: 1234)</span></label>
                  <input 
                    required 
                    type="password" 
                    value={pinValue}
                    onChange={(e) => { setPinValue(e.target.value); setPinError(""); }}
                    placeholder="••••" 
                    maxLength={4} 
                    className={`w-full px-4 py-2 border rounded-xl focus:outline-none transition text-center tracking-widest text-lg ${
                      pinError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                    }`} />
                  {pinError && <p className="text-red-500 text-xs mt-1 font-medium">{pinError}</p>}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => { setIsConfirmModalOpen(false); setPinValue(""); setPinError(""); }}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-3 text-white rounded-xl font-bold transition shadow-lg disabled:opacity-50 flex items-center justify-center ${
                    selectedAction.type === 'Approve' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' : 'bg-red-600 hover:bg-red-700 shadow-red-600/20'
                  }`}
                >
                  {isSubmitting ? "Processing..." : `Confirm ${selectedAction.type}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Override Request Modal */}
      {isNewOverrideModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsNewOverrideModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 text-red-600 rounded-xl"><ShieldAlert size={22}/></div>
                <h3 className="text-xl font-bold text-gray-800">New Override Request</h3>
              </div>
              <button onClick={() => setIsNewOverrideModalOpen(false)} className="text-gray-400 hover:text-gray-600"><span className="text-2xl font-bold">×</span></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const fd = new FormData(e.target);
              const newOverride = {
                id: `OVR-2026-00${overridesList.length + 1}`,
                student: fd.get('student'),
                regNo: fd.get('regNo'),
                request: fd.get('request'),
                reason: fd.get('reason'),
                requestedBy: "Director",
                status: "Pending",
                time: "Just now"
              };
              setTimeout(() => {
                setOverridesList(prev => [newOverride, ...prev]);
                toast.success("Override request submitted!");
                setIsSubmitting(false);
                setIsNewOverrideModalOpen(false);
                setActiveTab("Pending");
              }, 1000);
            }}>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Student Name</label>
                    <input required name="student" type="text" placeholder="e.g. John Kamau" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Reg. Number</label>
                    <input required name="regNo" type="text" placeholder="e.g. BIT/2024/001" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Override Type</label>
                  <select required name="request" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition text-gray-700">
                    <option value="Grade Override">Grade Override</option>
                    <option value="Financial Clearance">Financial Clearance</option>
                    <option value="Registration Unlock">Registration Unlock</option>
                    <option value="Unit Cap Extension">Unit Cap Extension</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Justification / Reason</label>
                  <textarea required name="reason" rows="3" placeholder="Provide a clear justification for this override..." className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition resize-none"></textarea>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setIsNewOverrideModalOpen(false)} disabled={isSubmitting}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition shadow-lg shadow-red-600/20 disabled:opacity-50 flex items-center justify-center">
                  {isSubmitting ? "Submitting..." : "Submit Override"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Override Logs Modal */}
      {isLogsModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsLogsModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 text-gray-700 rounded-xl"><History size={22}/></div>
                <h3 className="text-xl font-bold text-gray-800">Override Audit Logs</h3>
              </div>
              <button onClick={() => setIsLogsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><span className="text-2xl font-bold">×</span></button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {overridesList.filter(o => o.status !== 'Pending').map((log, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${
                  log.status === 'Approved' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-black text-gray-500 uppercase tracking-wider">{log.id}</p>
                      <p className="font-bold text-gray-800 mt-1">{log.request}</p>
                      <p className="text-xs text-gray-500 mt-1">Student: {log.student} • {log.regNo}</p>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${
                      log.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>{log.status}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-3">{log.time} • By {log.requestedBy}</p>
                </div>
              ))}
              {overridesList.filter(o => o.status !== 'Pending').length === 0 && (
                <p className="text-center text-gray-400 text-sm py-8">No completed override logs yet.</p>
              )}
            </div>
            <button onClick={() => setIsLogsModalOpen(false)}
              className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition">Close</button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Overrides;
