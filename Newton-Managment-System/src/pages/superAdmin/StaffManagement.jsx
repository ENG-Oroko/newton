import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  UserCog, 
  Search, 
  Plus, 
  Filter, 
  ChevronRight, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  MoreHorizontal, 
  UserPlus, 
  Award,
  Calendar,
  CheckCircle,
  Activity
} from "lucide-react";

const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const [staffList, setStaffList] = useState([
    { name: "Dr. Sarah Kim", role: "Dean, Computing", dept: "Computer Science", status: "Active", email: "s.kim@university.ac.ke", joined: "2018", type: "Full-Time" },
    { name: "Prof. James Otieno", role: "Professor", dept: "Mathematics", status: "Active", email: "j.otieno@university.ac.ke", joined: "2015", type: "Full-Time" },
    { name: "Dr. Mary Wanjiku", role: "Associate Prof.", dept: "Engineering", status: "Sabbatical", email: "m.wanjiku@university.ac.ke", joined: "2020", type: "Full-Time" },
    { name: "Alex Kamau", role: "Lecturer", dept: "Information Tech", status: "Active", email: "a.kamau@university.ac.ke", joined: "2022", type: "Part-Time" },
    { name: "Grace Akinyi", role: "Dean, Health", dept: "Nursing", status: "Active", email: "g.akinyi@university.ac.ke", joined: "2017", type: "Full-Time" },
    { name: "David Mutua", role: "Senior Lecturer", dept: "Business", status: "Active", email: "d.mutua@university.ac.ke", joined: "2019", type: "Full-Time" },
  ]);

  const stats = [
    { label: "Total Staff", value: "312", icon: UserCog, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Academic Staff", value: "248", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Active Now", value: "294", icon: Activity, color: "text-green-600", bg: "bg-green-50" },
    { label: "On Leave", value: "18", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-sm text-gray-500">Manage institutional human resources, faculty roles, and access control</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setIsRoleModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <ShieldCheck size={16} />
            Role Permissions
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <UserPlus size={16} />
            Add Staff Member
          </button>
        </div>
      </div>

      {/* Staff KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h2 className="text-xl font-black text-gray-800">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-gray-100 rounded-3xl p-4 mb-8 shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search staff by name, role, or department..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-xl focus:outline-none transition text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select className="px-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm font-bold text-gray-600 focus:outline-none">
            <option>All Departments</option>
            <option>Computing</option>
            <option>Engineering</option>
            <option>Health Sciences</option>
          </select>
          <select className="px-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm font-bold text-gray-600 focus:outline-none">
            <option>All Types</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
          </select>
          <button 
            onClick={() => toast.success("Filters applied")}
            className="p-2.5 bg-gray-50 text-gray-500 hover:text-green-600 rounded-xl transition border border-transparent hover:border-gray-200"
          >
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {staffList.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.dept.toLowerCase().includes(searchTerm.toLowerCase())).map((member, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-widest border-l border-b ${
              member.status === 'Active' ? 'bg-green-100 text-green-600 border-green-100' : 'bg-orange-100 text-orange-600 border-orange-100'
            }`}>
              {member.status}
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold border border-blue-100 group-hover:scale-105 transition-transform">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-green-600 transition tracking-tight">{member.name}</h3>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{member.role}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Building2 size={12} className="text-gray-300" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{member.dept}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 py-4 border-t border-gray-50">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={14} />
                  <span>Email</span>
                </div>
                <span className="font-semibold text-gray-700">{member.email}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={14} />
                  <span>Joined</span>
                </div>
                <span className="font-semibold text-gray-700">{member.joined}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle size={14} />
                  <span>Contract</span>
                </div>
                <span className={`font-bold px-2 py-0.5 rounded-lg text-[10px] ${
                  member.type === 'Full-Time' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {member.type.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2 pt-4 border-t border-gray-50">
              <button 
                onClick={() => {
                  setSelectedMember(member);
                  setIsViewModalOpen(true);
                }}
                className="flex-1 py-2.5 bg-gray-50 hover:bg-green-600 hover:text-white rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 text-gray-600 border border-transparent hover:border-green-600 shadow-sm"
              >
                View Profile
              </button>
              <button 
                onClick={() => {
                  setSelectedMember(member);
                  setIsEditModalOpen(true);
                }}
                className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Simulation */}
      <div className="mt-12 flex justify-between items-center bg-white p-4 border border-gray-100 rounded-3xl shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-4">Showing 6 of 312 Personnel</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-100 rounded-2xl bg-white text-xs font-bold text-gray-400 disabled:opacity-50">Previous</button>
          <button className="w-10 h-10 bg-green-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-green-600/20">1</button>
          <button className="w-10 h-10 hover:bg-gray-50 rounded-2xl font-black text-sm text-gray-600 transition border border-transparent hover:border-gray-100">2</button>
          <button className="px-4 py-2 border border-gray-100 rounded-2xl bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition">Next</button>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add Staff Member</h3>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const fd = new FormData(e.target);
              const newMember = {
                name: fd.get("name"),
                role: fd.get("role"),
                dept: fd.get("dept"),
                email: fd.get("email"),
                type: fd.get("type"),
                status: "Active",
                joined: new Date().getFullYear().toString()
              };
              if (staffList.some(s => s.email === newMember.email)) {
                toast.error("Staff member with that email already exists!");
                setIsSubmitting(false);
                return;
              }
              setTimeout(() => {
                setStaffList(prev => [newMember, ...prev]);
                toast.success("New staff member added successfully!");
                setIsSubmitting(false);
                setIsAddModalOpen(false);
              }, 1000);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                  <input required name="name" type="text" placeholder="e.g. Dr. Jane Doe" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                  <input required name="email" type="email" placeholder="e.g. jane.doe@university.ac.ke" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Role</label>
                  <input required name="role" type="text" placeholder="e.g. Lecturer" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Department</label>
                    <select name="dept" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Nursing">Nursing</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Contract Type</label>
                    <select name="type" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
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
                  {isSubmitting ? "Adding..." : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {isViewModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsViewModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="bg-blue-600 p-6 text-white relative">
              <button onClick={() => setIsViewModalOpen(false)} className="absolute right-4 top-4 p-2 hover:bg-white/20 rounded-full transition">
                <span className="text-2xl font-bold">×</span>
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedMember.name}</h2>
                  <p className="text-blue-100 text-sm">{selectedMember.role}</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[{label:'Department', val: selectedMember.dept},{label:'Contract', val: selectedMember.type},{label:'Status', val: selectedMember.status},{label:'Joined', val: selectedMember.joined}].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">{item.label}</p>
                    <p className="font-semibold text-gray-800">{item.val}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Email</p>
                <p className="font-semibold text-gray-800 flex items-center gap-2"><Mail size={16} className="text-gray-400"/>{selectedMember.email}</p>
              </div>
              <button onClick={() => setIsViewModalOpen(false)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {isEditModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsEditModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Staff Member</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition"><span className="text-2xl font-bold">×</span></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const fd = new FormData(e.target);
              const updated = { ...selectedMember, role: fd.get('role'), status: fd.get('status'), type: fd.get('type') };
              setTimeout(() => {
                setStaffList(prev => prev.map(s => s.email === selectedMember.email ? updated : s));
                toast.success("Staff member updated successfully!");
                setIsSubmitting(false);
                setIsEditModalOpen(false);
              }, 800);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                  <input type="text" value={selectedMember.name} disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Role</label>
                  <input required name="role" type="text" defaultValue={selectedMember.role} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Status</label>
                    <select name="status" defaultValue={selectedMember.status} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                      <option value="Active">Active</option>
                      <option value="Sabbatical">Sabbatical</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Terminated">Terminated</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Contract</label>
                    <select name="type" defaultValue={selectedMember.type} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} disabled={isSubmitting}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center">
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Role Permissions Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsRoleModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ShieldCheck size={22}/></div>
                <h3 className="text-xl font-bold text-gray-800">Role Permissions Matrix</h3>
              </div>
              <button onClick={() => setIsRoleModalOpen(false)} className="text-gray-400 hover:text-gray-600"><span className="text-2xl font-bold">×</span></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-2 text-left text-gray-500 font-bold uppercase tracking-wider">Module</th>
                    {['Dean','Prof.','Lecturer','Staff'].map(r => <th key={r} className="py-2 text-center text-gray-500 font-bold uppercase tracking-wider">{r}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[['Student Records',true,true,false,false],['Results Entry',true,true,true,false],['Transcript Issue',true,false,false,true],['Course Mgmt',true,true,true,false],['Financial View',true,false,false,false]].map(([module,...perms], i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="py-3 font-semibold text-gray-700">{module}</td>
                      {perms.map((p, j) => (
                        <td key={j} className="py-3 text-center">
                          {p ? <CheckCircle size={16} className="text-green-500 mx-auto"/> : <span className="text-gray-200 text-lg">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => setIsRoleModalOpen(false)}
              className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition">Close</button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StaffManagement;
