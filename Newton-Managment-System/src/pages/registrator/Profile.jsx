import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  User, 
  Settings, 
  Shield, 
  History, 
  Bell, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Edit3, 
  CheckCircle,
  Clock,
  Lock,
  LogOut,
  ChevronRight,
  FileText
} from "lucide-react";

const RegistrarProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const activityLogs = [
    { action: "Approved Registration", student: "John Kamau", time: "10 mins ago", icon: CheckCircle, color: "text-green-600" },
    { action: "Updated Grading Policy", student: "Senate Meeting", time: "2h ago", icon: Edit3, color: "text-blue-600" },
    { action: "Generated Transcripts", student: "12 Students", time: "5h ago", icon: FileText, color: "text-purple-600" },
    { action: "System Login", student: "Admin Portal", time: "8h ago", icon: Lock, color: "text-gray-600" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Registrar Profile</h1>
        <p className="text-sm text-gray-500">Manage your institutional identity, security settings, and personal preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="h-24 bg-gradient-to-r from-green-600 to-green-700 relative">
              <div className="absolute -bottom-10 left-6">
                <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-green-50 flex items-center justify-center text-3xl font-bold text-green-600 relative group overflow-hidden">
                    RG
                    <button 
                      onClick={() => toast.success('Profile picture upload coming soon')}
                      className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-14 pb-8 px-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Dr. David Okello</h2>
                  <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Chief University Registrar</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-2 bg-gray-50 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-xl transition border border-transparent hover:border-green-100 shadow-sm hover:shadow-md"
                >
                  <Edit3 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><Mail size={16} /></div>
                  david.okello@university.ac.ke
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><Phone size={16} /></div>
                  +254 712 345 678
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><MapPin size={16} /></div>
                  Main Campus, Admin Block A
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Status</p>
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-widest">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Role Permissions</p>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-widest">Full Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Quick Settings</h3>
            <div className="space-y-2">
              <button 
                onClick={() => toast('Password change modal coming soon', { icon: '🔐' })}
                className="w-full p-3 rounded-2xl hover:bg-gray-50 transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Lock size={16} /></div>
                  <span className="text-sm font-semibold text-gray-700">Change Password</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600 transition" />
              </button>
              <button 
                onClick={() => toast.success('Preferences opened')}
                className="w-full p-3 rounded-2xl hover:bg-gray-50 transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><Bell size={16} /></div>
                  <span className="text-sm font-semibold text-gray-700">Notification Prefs</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-600 transition" />
              </button>
              <button 
                onClick={() => toast.success('Signing out...')}
                className="w-full p-3 rounded-2xl hover:bg-red-50 transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-xl"><LogOut size={16} /></div>
                  <span className="text-sm font-semibold text-red-600">Sign Out</span>
                </div>
                <ChevronRight size={16} className="text-red-200 group-hover:text-red-600 transition" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Settings and Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Detailed Settings Sections */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-green-50 text-green-600 rounded-xl"><Shield size={20} /></div>
              <div>
                <h3 className="font-bold text-gray-800">Registrar Authorities</h3>
                <p className="text-xs text-gray-400">Manage delegated authorities and approval signatures</p>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Document Signing</h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-green-100 transition">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Digital Signature</p>
                    <p className="text-[10px] text-gray-400">Attached to official transcripts</p>
                  </div>
                  <div className="w-10 h-6 bg-green-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-green-100 transition">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Seal Verification</p>
                    <p className="text-[10px] text-gray-400">Senate seal automation</p>
                  </div>
                  <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delegated Access</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">AK</div>
                      <span className="text-xs font-bold text-gray-700">Alice Kamau</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold">ASST. REGISTRAR</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">PM</div>
                      <span className="text-xs font-bold text-gray-700">Peter Mutua</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold">EXAM OFFICER</span>
                  </div>
                </div>
                <button 
                  onClick={() => toast.success('Opening Delegation Settings')}
                  className="w-full py-2 text-xs font-bold text-green-600 hover:underline"
                >
                  Manage Delegation
                </button>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <History size={18} className="text-blue-600" />
              Recent Activity History
            </h3>
            <div className="space-y-6">
              {activityLogs.map((log, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`p-2 rounded-xl bg-gray-50 ${log.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      <log.icon size={16} />
                    </div>
                    {i !== activityLogs.length - 1 && <div className="w-0.5 h-full bg-gray-50" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-bold text-gray-800">{log.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Reference: {log.student}</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                      <Clock size={10} /> {log.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => toast('Audit trail loading...', { icon: '🔍' })}
              className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-xs font-bold text-gray-600 transition"
            >
              View Full Audit Trail
            </button>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsEditModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              toast.success("Profile updated successfully!");
              setIsEditModalOpen(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                  <input type="text" defaultValue="Dr. David Okello" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                  <input type="email" defaultValue="david.okello@university.ac.ke" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Phone</label>
                  <input type="text" defaultValue="+254 712 345 678" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition shadow-lg shadow-green-600/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RegistrarProfile;
