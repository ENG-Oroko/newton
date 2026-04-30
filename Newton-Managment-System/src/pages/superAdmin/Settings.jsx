import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Settings, 
  Shield, 
  Database, 
  Cloud, 
  Bell, 
  Globe, 
  Lock, 
  RefreshCw, 
  Save, 
  Terminal, 
  Mail, 
  Server,
  Activity,
  Cpu
} from "lucide-react";

const SystemSettings = () => {
  const [selfReg, setSelfReg] = useState(true);
  const [autoPub, setAutoPub] = useState(false);
  const [mpesa, setMpesa] = useState(true);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">System Configurations</h1>
          <p className="text-sm text-gray-500">Manage global institutional parameters, API keys, and server infrastructure</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => toast('Defaults reset', { icon: '🔄' })}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <RefreshCw size={16} />
            Reset Defaults
          </button>
          <button 
            onClick={() => toast.success('Settings saved successfully')}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { label: "General Settings", icon: Settings, active: true },
            { label: "Security & Access", icon: Shield, active: false },
            { label: "Database & Backups", icon: Database, active: false },
            { label: "API & Integrations", icon: Cloud, active: false },
            { label: "Communication", icon: Mail, active: false },
            { label: "System Maintenance", icon: Terminal, active: false },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => toast.success(`Switched to ${item.label}`)}
              className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                item.active 
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/20" 
                  : "bg-white border border-gray-100 text-gray-500 hover:border-green-600 hover:bg-green-50/50"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          ))}

          <div className="mt-8 bg-gray-900 rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Server Status</p>
              <h4 className="text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Operational
              </h4>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>CPU Usage</span>
                  <span>12%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '12%' }} />
                </div>
              </div>
            </div>
            <Cpu size={60} className="absolute -bottom-4 -right-4 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
            <h3 className="font-bold text-gray-800 text-lg mb-8 flex items-center gap-2">
              <Globe size={20} className="text-green-600" />
              General Institutional Parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Institution Name</label>
                <input 
                  type="text" 
                  defaultValue="Newton University of Technology"
                  className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-green-500 focus:outline-none transition text-sm font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Institutional Email Domain</label>
                <input 
                  type="text" 
                  defaultValue="university.ac.ke"
                  className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-green-500 focus:outline-none transition text-sm font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Academic Year</label>
                <select className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-green-500 focus:outline-none transition text-sm font-semibold">
                  <option>2025/2026</option>
                  <option>2026/2027</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Semester</label>
                <select className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-green-500 focus:outline-none transition text-sm font-semibold">
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                  <option>Summer Session</option>
                </select>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 space-y-6">
              <h4 className="font-bold text-gray-800">System Preferences</h4>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-green-50/50 transition">
                <div>
                  <p className="text-sm font-bold text-gray-700">Self-Registration Enrollment</p>
                  <p className="text-[10px] text-gray-400">Allow students to enroll for units independently</p>
                </div>
                <div 
                  onClick={() => { setSelfReg(!selfReg); toast.success("Preference updated"); }}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${selfReg ? 'bg-green-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${selfReg ? 'right-1' : 'left-1'}`} />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-green-50/50 transition">
                <div>
                  <p className="text-sm font-bold text-gray-700">Automated Grade Publishing</p>
                  <p className="text-[10px] text-gray-400">Publish results immediately after Registrar approval</p>
                </div>
                <div 
                  onClick={() => { setAutoPub(!autoPub); toast.success("Preference updated"); }}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${autoPub ? 'bg-green-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${autoPub ? 'right-1' : 'left-1'}`} />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-green-50/50 transition">
                <div>
                  <p className="text-sm font-bold text-gray-700">M-Pesa API Integration</p>
                  <p className="text-[10px] text-gray-400">Enable automatic tuition payment verification</p>
                </div>
                <div 
                  onClick={() => { setMpesa(!mpesa); toast.success("Preference updated"); }}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${mpesa ? 'bg-green-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${mpesa ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-48">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Server size={22} />
                </div>
                <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-1 rounded-full uppercase">Storage</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold text-gray-700">Disk Usage</span>
                  <span className="text-gray-400">42GB / 500GB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '12%' }} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-48">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <Activity size={22} />
                </div>
                <span className="text-[10px] font-black bg-purple-100 text-purple-600 px-2 py-1 rounded-full uppercase">Backup</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-800">Next Automated Backup</p>
                <p className="text-[10px] text-gray-400">Scheduled for 04:00 AM EAT</p>
                <button 
                  onClick={() => toast.success('Manual backup initiated')}
                  className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-2 hover:underline"
                >
                  Run Manual Backup
                </button>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-start gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
              <Lock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-red-800">Critical System Lock</h4>
              <p className="text-sm text-red-700/70 leading-relaxed mb-4">
                Enabling this will restrict all access to the system except for Super Administrators. Use only during major maintenance or security incidents.
              </p>
              <button 
                onClick={() => toast.error('Emergency lock activation requires Super Admin password')}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition shadow-lg shadow-red-600/20"
              >
                Activate Emergency Lock
              </button>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default SystemSettings;
