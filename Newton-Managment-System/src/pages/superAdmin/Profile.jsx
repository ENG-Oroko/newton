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
  ShieldAlert,
  Fingerprint
} from "lucide-react";

const SuperAdminProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const auditLogs = [
    { action: "Executed Emergency Lock", module: "System", time: "2 days ago", type: "Critical", icon: ShieldAlert },
    { action: "Updated Finance API Keys", module: "Integrations", time: "3 days ago", type: "Security", icon: Lock },
    { action: "Changed Dean Permissions", module: "HR", time: "1 week ago", type: "Admin", icon: User },
    { action: "System Optimization", module: "Core", time: "2 weeks ago", type: "Maintenance", icon: Settings },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Directorate Profile</h1>
        <p className="text-sm text-gray-500">Manage executive identity, institutional security protocols, and administrative settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="h-24 bg-gradient-to-r from-gray-900 to-gray-800 relative">
              <div className="absolute -bottom-10 left-6">
                <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center text-3xl font-black text-white relative group overflow-hidden">
                    DIR
                    <button 
                      onClick={() => toast('Avatar upload modal coming soon', { icon: '📸' })}
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
                  <h2 className="text-xl font-black text-gray-800 tracking-tight">Prof. Newton Admin</h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Managing Director / CEO</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-2 bg-gray-50 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-xl transition border border-transparent hover:border-green-100 shadow-sm"
                >
                  <Edit3 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><Mail size={16} /></div>
                  director@university.ac.ke
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><Phone size={16} /></div>
                  +254 700 000 000
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><MapPin size={16} /></div>
                  Chancellor's Office, Level 12
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Security Clearance</p>
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-100">Level 5 (Owner)</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">2FA Protection</p>
                  <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-100">Enabled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-green-600" />
              Executive Control
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => toast.success('Opening security keys vault...')}
                className="w-full p-3 rounded-2xl hover:bg-gray-50 transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Fingerprint size={16} /></div>
                  <span className="text-sm font-bold text-gray-700">Security Keys</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600 transition" />
              </button>
              <button 
                onClick={() => toast.success('Opening crisis alert configuration...')}
                className="w-full p-3 rounded-2xl hover:bg-gray-50 transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><Bell size={16} /></div>
                  <span className="text-sm font-bold text-gray-700">Crisis Alerts</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-600 transition" />
              </button>
              <button 
                onClick={() => toast.success('Signing out securely...')}
                className="w-full p-3 rounded-2xl hover:bg-red-50 transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-xl"><LogOut size={16} /></div>
                  <span className="text-sm font-bold text-red-600">Secure Sign Out</span>
                </div>
                <ChevronRight size={16} className="text-red-200 group-hover:text-red-600 transition" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Settings and Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/20">
              <div className="p-2 bg-red-50 text-red-600 rounded-xl"><Lock size={20} /></div>
              <div>
                <h3 className="font-bold text-gray-800">Root Access & Keys</h3>
                <p className="text-xs text-gray-400">Institutional root permissions and encryption management</p>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Administrative Keys</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">Master Secret Key</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-black">ROT-XXXX-XXXX</p>
                    </div>
                    <button 
                      onClick={() => toast.success('Decrypted: ROT-99A8-B7C6-D5E4')}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Reveal
                    </button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">DB Encryption IV</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-black">Active (256-bit)</p>
                    </div>
                    <span className="p-1 bg-green-100 text-green-600 rounded-lg"><CheckCircle size={14} /></span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ownership Transfer</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Ownership transfer requires verification from the University Board. Initiate this only during institutional leadership transitions.
                </p>
                <button 
                  onClick={() => toast.error('Initiating ownership transfer requires multi-signature approval')}
                  className="w-full py-3 border border-dashed border-red-200 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-50 transition"
                >
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
            <h3 className="font-bold text-gray-800 mb-8 flex items-center gap-2 text-lg">
              <History size={20} className="text-blue-600" />
              Executive Audit Trail
            </h3>
            <div className="space-y-8">
              {auditLogs.map((log, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-3 rounded-2xl bg-gray-50 group-hover:scale-110 transition-transform shadow-sm ${
                      log.type === 'Critical' ? 'text-red-600' : 
                      log.type === 'Security' ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      <log.icon size={18} />
                    </div>
                    {i !== auditLogs.length - 1 && <div className="w-0.5 h-full bg-gray-50" />}
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-gray-800 text-base">{log.action}</p>
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        log.type === 'Critical' ? 'bg-red-100 text-red-600' : 
                        log.type === 'Security' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Module: <span className="font-bold text-gray-700">{log.module}</span></p>
                    <div className="flex items-center gap-1.5 mt-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <Clock size={12} /> {log.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => toast.success('Navigating to full audit logs...')}
              className="w-full py-4 bg-gray-50 hover:bg-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-green-600 transition"
            >
              View Complete System Audit
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
                  <input type="text" defaultValue="Prof. Newton Admin" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                  <input type="email" defaultValue="director@university.ac.ke" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Phone</label>
                  <input type="text" defaultValue="+254 700 000 000" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
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

export default SuperAdminProfile;
