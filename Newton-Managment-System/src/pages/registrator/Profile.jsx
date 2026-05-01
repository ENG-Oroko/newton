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
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [digitalSig, setDigitalSig] = useState(true);
  const [sealVerif, setSealVerif] = useState(false);
  const [notifPref, setNotifPref] = useState(true);

  const [profile, setProfile] = useState({
    name: "Dr. David Okello",
    title: "Chief University Registrar",
    email: "david.okello@university.ac.ke",
    phone: "+254 712 345 678",
    office: "Main Campus, Admin Block A",
  });

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
                  <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{profile.title}</p>
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
                  {profile.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><Phone size={16} /></div>
                  {profile.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400"><MapPin size={16} /></div>
                  {profile.office}
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
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full p-3 rounded-2xl hover:bg-gray-50 transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Lock size={16} /></div>
                  <span className="text-sm font-semibold text-gray-700">Change Password</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600 transition" />
              </button>
              <button 
                onClick={() => { setNotifPref(!notifPref); toast.success(`Notification preferences ${!notifPref ? 'enabled' : 'muted'}`); }}
                className="w-full p-3 rounded-2xl hover:bg-gray-50 transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><Bell size={16} /></div>
                  <span className="text-sm font-semibold text-gray-700">Notifications {notifPref ? 'On' : 'Off'}</span>
                </div>
                <div className={`w-8 h-5 rounded-full relative transition-colors ${notifPref ? 'bg-green-500' : 'bg-gray-200'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${notifPref ? 'right-0.5' : 'left-0.5'}`} />
                </div>
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
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-green-100 transition cursor-pointer"
                  onClick={() => { setDigitalSig(!digitalSig); toast.success(`Digital signature ${!digitalSig ? 'enabled' : 'disabled'}`); }}
                >
                  <div>
                    <p className="text-sm font-bold text-gray-800">Digital Signature</p>
                    <p className="text-[10px] text-gray-400">Attached to official transcripts</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative transition-colors ${digitalSig ? 'bg-green-600' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${digitalSig ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-green-100 transition cursor-pointer"
                  onClick={() => { setSealVerif(!sealVerif); toast.success(`Seal verification ${!sealVerif ? 'enabled' : 'disabled'}`); }}
                >
                  <div>
                    <p className="text-sm font-bold text-gray-800">Seal Verification</p>
                    <p className="text-[10px] text-gray-400">Senate seal automation</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative transition-colors ${sealVerif ? 'bg-green-600' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${sealVerif ? 'right-1' : 'left-1'}`} />
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
              setIsSubmitting(true);
              const fd = new FormData(e.target);
              const updated = {
                ...profile,
                name: fd.get('name'),
                email: fd.get('email'),
                phone: fd.get('phone'),
                office: fd.get('office'),
              };
              setTimeout(() => {
                setProfile(updated);
                toast.success("Profile updated successfully!");
                setIsSubmitting(false);
                setIsEditModalOpen(false);
              }, 800);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                  <input name="name" type="text" defaultValue={profile.name} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                  <input name="email" type="email" defaultValue={profile.email} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Phone</label>
                  <input name="phone" type="text" defaultValue={profile.phone} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Office Location</label>
                  <input name="office" type="text" defaultValue={profile.office} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
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
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsPasswordModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Lock size={20}/></div>
                <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
              </div>
              <button onClick={() => setIsPasswordModalOpen(false)} className="text-gray-400 hover:text-gray-600"><span className="text-2xl font-bold">×</span></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const fd = new FormData(e.target);
              if (fd.get('newPwd') !== fd.get('confirmPwd')) {
                toast.error("New passwords do not match");
                setIsSubmitting(false);
                return;
              }
              if (fd.get('newPwd').length < 8) {
                toast.error("Password must be at least 8 characters");
                setIsSubmitting(false);
                return;
              }
              setTimeout(() => {
                toast.success("Password changed successfully!");
                setIsSubmitting(false);
                setIsPasswordModalOpen(false);
              }, 1000);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Current Password</label>
                  <input required name="currentPwd" type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">New Password</label>
                  <input required name="newPwd" type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Confirm New Password</label>
                  <input required name="confirmPwd" type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition" />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setIsPasswordModalOpen(false)} disabled={isSubmitting}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center">
                  {isSubmitting ? 'Updating...' : 'Update Password'}
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
