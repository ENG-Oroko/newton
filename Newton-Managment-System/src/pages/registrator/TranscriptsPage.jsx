import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  FileText, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Download, 
  Printer, 
  ExternalLink,
  ChevronRight,
  MoreHorizontal,
  Mail,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

const TranscriptsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [requestsList, setRequestsList] = useState([
    { id: "TR-2026-001", student: "John Kamau", regNo: "BIT/2024/001", type: "Official", status: "Pending", date: "2026-04-29", payment: "Verified" },
    { id: "TR-2026-002", student: "Mary Wanjiku", regNo: "CS/2023/452", type: "Unofficial", status: "Processed", date: "2026-04-28", payment: "N/A" },
    { id: "TR-2026-003", student: "Alex Otieno", regNo: "ENG/2022/112", type: "Official", status: "Processing", date: "2026-04-30", payment: "Pending" },
    { id: "TR-2026-004", student: "Grace Akinyi", regNo: "NUR/2024/089", type: "Official", status: "Processed", date: "2026-04-25", payment: "Verified" },
    { id: "TR-2026-005", student: "Peter Mwangi", regNo: "BUS/2023/022", type: "Official", status: "Rejected", date: "2026-04-20", payment: "Flagged" },
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transcript Management</h1>
          <p className="text-sm text-gray-500">Process official and unofficial transcript requests, verify payments, and issue documents</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsPrinting(true);
              const tId = toast.loading("Sending documents to printer...");
              setTimeout(() => {
                toast.success("Bulk print completed", { id: tId });
                setIsPrinting(false);
              }, 1500);
            }}
            disabled={isPrinting}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Printer size={16} />
            {isPrinting ? "Printing..." : "Bulk Print"}
          </button>
          <button 
            onClick={() => {
              const pendingReqs = requestsList.filter(r => r.status === 'Pending');
              if (pendingReqs.length > 0) {
                setRequestsList(prev => prev.map(r => r.status === 'Pending' ? { ...r, status: 'Processing' } : r));
                toast.success("Requests moved to Processing queue");
              } else {
                toast('No pending requests', { icon: 'ℹ️' });
              }
            }}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <ShieldCheck size={16} />
            Verify Request
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Pending Requests", value: "12", color: "text-orange-600", bg: "bg-orange-50", icon: Clock },
          { label: "Processing", value: "8", color: "text-blue-600", bg: "bg-blue-50", icon: ExternalLink },
          { label: "Completed Today", value: "24", color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
          { label: "Rejected/Issues", value: "2", color: "text-red-600", bg: "bg-red-50", icon: XCircle },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
              <h2 className="text-xl font-bold text-gray-800">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by student name or request ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-green-500 focus:outline-none transition text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm font-medium focus:outline-none">
              <option>All Types</option>
              <option>Official</option>
              <option>Unofficial</option>
            </select>
            <select className="px-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm font-medium focus:outline-none">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Processed</option>
            </select>
            <button 
              onClick={() => toast.success('Filters applied')}
              className="p-2.5 bg-gray-50 text-gray-500 hover:text-green-600 rounded-xl transition border border-transparent hover:border-gray-200"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Request ID</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Student Details</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Type</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Payment</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requestsList.filter(r => r.student.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase())).map((req, i) => (
                <tr key={i} className="hover:bg-green-50/20 transition group">
                  <td className="px-6 py-4 font-bold text-gray-500">{req.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-800">{req.student}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{req.regNo}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      req.type === 'Official' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-gray-50 text-gray-600 border border-gray-100'
                    }`}>
                      {req.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${
                        req.payment === 'Verified' ? 'bg-green-500' : 
                        req.payment === 'Pending' ? 'bg-orange-500' : 
                        req.payment === 'N/A' ? 'bg-gray-300' : 'bg-red-500'
                      }`} />
                      <span className="text-xs font-medium text-gray-600">{req.payment}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      req.status === 'Processed' ? 'bg-green-100 text-green-600' :
                      req.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                      req.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {
                          const tId = toast.loading('Downloading transcript PDF...');
                          setTimeout(() => toast.success('Transcript PDF downloaded', { id: tId }), 1200);
                        }}
                        className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-green-600 border border-transparent hover:border-gray-100 shadow-none hover:shadow-sm"
                      >
                        <Download size={16} />
                      </button>
                      <button 
                        onClick={() => toast.success(`Sending transcript to ${req.student}`)}
                        className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-blue-600 border border-transparent hover:border-gray-100"
                      >
                        <Mail size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedRequest(req);
                          setIsDetailModalOpen(true);
                        }}
                        className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-gray-600"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText size={18} className="text-green-600" />
            Transcript Processing Workflow
          </h3>
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-100">
            {[
              { title: "Verification", desc: "Registrar verifies student academic history and standing.", icon: ShieldCheck, status: "Done" },
              { title: "Financial Clearance", desc: "Finance office confirms payment for official transcripts.", icon: CheckCircle, status: "Done" },
              { title: "Generation", desc: "System generates secure PDF with institutional watermark.", icon: Clock, status: "Active" },
              { title: "Issuance", desc: "Document is sent via email or prepared for physical collection.", icon: Mail, status: "Pending" },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm ${
                  step.status === 'Done' ? 'bg-green-500' : step.status === 'Active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                }`}>
                  <step.icon size={12} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{step.title}</p>
                  <p className="text-xs text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <AlertCircle size={20} />
              Secure Digital Transcripts
            </h3>
            <p className="text-sm text-blue-100 opacity-90 leading-relaxed">
              New secure digital transcripts are now available for alumni. These documents include a verifiable QR code for employer verification.
            </p>
          </div>
          <div className="mt-8 flex gap-3">
            <button 
              onClick={() => toast.success('Feature enabled for Alumni')}
              className="px-4 py-2 bg-white text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-50 transition"
            >
              Enable for Alumni
            </button>
            <button 
              onClick={() => toast('Opening guide...', { icon: '📖' })}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl text-xs font-bold hover:bg-blue-400 transition"
            >
              View Guide
            </button>
          </div>
        </div>
      </div>

      {/* Detail / Status Modal */}
      {isDetailModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsDetailModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="bg-blue-600 p-6 text-white relative">
              <button onClick={() => setIsDetailModalOpen(false)} className="absolute right-4 top-4 p-2 hover:bg-white/20 rounded-full transition">
                <span className="text-2xl font-bold">×</span>
              </button>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">{selectedRequest.id}</p>
              <h2 className="text-2xl font-bold">{selectedRequest.student}</h2>
              <p className="text-blue-100 opacity-80">{selectedRequest.regNo}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Type</p>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${selectedRequest.type === 'Official' ? 'bg-purple-50 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>{selectedRequest.type}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Payment</p>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      selectedRequest.payment === 'Verified' ? 'bg-green-500' : 
                      selectedRequest.payment === 'Pending' ? 'bg-orange-500' : 
                      selectedRequest.payment === 'N/A' ? 'bg-gray-300' : 'bg-red-500'
                    }`} />
                    <span className="text-xs font-bold text-gray-700">{selectedRequest.payment}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 col-span-2">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Date Requested</p>
                  <p className="font-semibold text-gray-800">{selectedRequest.date}</p>
                </div>
              </div>

              {selectedRequest.status !== 'Processed' && selectedRequest.status !== 'Rejected' && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-gray-500 font-bold uppercase">Update Status</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setIsUpdating(true);
                        setTimeout(() => {
                          setRequestsList(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'Rejected' } : r));
                          setIsUpdating(false);
                          setIsDetailModalOpen(false);
                          toast.error('Transcript request rejected.');
                        }, 800);
                      }}
                      disabled={isUpdating}
                      className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2"
                    >
                      <XCircle size={16}/> Reject
                    </button>
                    <button 
                      onClick={() => {
                        setIsUpdating(true);
                        setTimeout(() => {
                          setRequestsList(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'Processed' } : r));
                          setIsUpdating(false);
                          setIsDetailModalOpen(false);
                          toast.success('Transcript processed and issued!');
                        }, 800);
                      }}
                      disabled={isUpdating}
                      className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition text-sm shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={16}/> {isUpdating ? 'Processing...' : 'Mark Processed'}
                    </button>
                  </div>
                </div>
              )}

              {(selectedRequest.status === 'Processed' || selectedRequest.status === 'Rejected') && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 ${
                  selectedRequest.status === 'Processed' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {selectedRequest.status === 'Processed' ? <CheckCircle size={18} className="text-green-600" /> : <XCircle size={18} className="text-red-600" />}
                  <p className={`text-sm font-semibold ${
                    selectedRequest.status === 'Processed' ? 'text-green-700' : 'text-red-700'
                  }`}>This request has been {selectedRequest.status.toLowerCase()}.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TranscriptsPage;