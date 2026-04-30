import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Layers, 
  Building2, 
  Users, 
  ChevronRight, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  School,
  GraduationCap,
  BookOpen,
  PieChart,
  Activity
} from "lucide-react";

const Departments = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const structure = [
    { 
      faculty: "Faculty of Science & Tech", 
      depts: [
        { name: "Computer Science", head: "Dr. Sarah Kim", students: 850, programs: 5, health: 92 },
        { name: "Information Technology", head: "Dr. Alex Kamau", students: 400, programs: 3, health: 88 },
        { name: "Mathematics", head: "Prof. James Otieno", students: 320, programs: 4, health: 95 }
      ]
    },
    { 
      faculty: "Faculty of Engineering", 
      depts: [
        { name: "Civil Engineering", head: "Dr. Mary Wanjiku", students: 450, programs: 6, health: 85 },
        { name: "Electrical Engineering", head: "Eng. Peter Mutua", students: 380, programs: 4, health: 90 }
      ]
    },
    { 
      faculty: "Faculty of Health Sciences", 
      depts: [
        { name: "Nursing", head: "Grace Akinyi", students: 620, programs: 3, health: 96 }
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Departments & Structure</h1>
          <p className="text-sm text-gray-500">Manage institutional hierarchy, faculties, and academic departments</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => toast.success('Loading structural analytics report...')}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <PieChart size={16} />
            Structural Analytics
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <Plus size={16} />
            Add Faculty/Dept
          </button>
        </div>
      </div>

      {/* Structural Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Faculties", value: "6", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Departments", value: "18", icon: Layers, color: "text-green-600", bg: "bg-green-50" },
          { label: "Academic Programs", value: "54", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Avg Dept. Health", value: "89%", icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-3 group hover:shadow-md transition">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} w-fit group-hover:scale-110 transition-transform`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{stat.label}</p>
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-3xl p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search departments or faculty heads..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-xl focus:outline-none transition text-sm"
          />
        </div>
        <button 
          onClick={() => toast.success("Filters applied")}
          className="p-2.5 bg-gray-50 text-gray-500 hover:text-green-600 rounded-xl transition border border-transparent hover:border-gray-200"
        >
          <Filter size={18} />
        </button>
      </div>

      {/* Hierarchy View */}
      <div className="space-y-8">
        {structure.map((faculty, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-gray-50/50 px-8 py-5 flex justify-between items-center border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm text-green-600">
                  <School size={20} />
                </div>
                <h3 className="font-black text-gray-800 uppercase tracking-wide">{faculty.faculty}</h3>
              </div>
              <button 
                onClick={() => toast('Faculty options', { icon: '⚙️' })}
                className="p-2 hover:bg-white rounded-lg transition text-gray-400"
              >
                <MoreVertical size={18} />
              </button>
            </div>
            
            <div className="p-2">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-400 uppercase tracking-widest text-[9px] font-black">
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Head of Department</th>
                    <th className="px-6 py-4 text-center">Enrollment</th>
                    <th className="px-6 py-4 text-center">Programs</th>
                    <th className="px-6 py-4 text-center">Health</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {faculty.depts.map((dept, j) => (
                    <tr key={j} className="hover:bg-green-50/20 transition group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-50 rounded-xl text-gray-400 group-hover:text-green-600 transition">
                            <Layers size={14} />
                          </div>
                          <span className="font-bold text-gray-700 group-hover:text-green-600 transition">{dept.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[8px] font-black">
                            {dept.head.split(' ').pop()[0]}
                          </div>
                          <span className="text-xs font-medium text-gray-600">{dept.head}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <Users size={14} className="text-gray-300" />
                          <span className="font-bold text-gray-800">{dept.students}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <BookOpen size={14} className="text-gray-300" />
                          <span className="font-bold text-gray-800">{dept.programs}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-12 bg-gray-100 rounded-full h-1 overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full" style={{ width: `${dept.health}%` }} />
                          </div>
                          <span className="text-[10px] font-black text-gray-800">{dept.health}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => toast.success(`Viewing details for ${dept.name}`)}
                          className="p-2 text-gray-300 hover:text-green-600 transition"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button 
              onClick={() => toast.success(`Viewing full overview for ${faculty.faculty}`)}
              className="w-full py-4 bg-gray-50/30 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-green-600 hover:bg-green-50 transition border-t border-gray-100"
            >
              View Faculty Details
            </button>
          </div>
        ))}
      </div>

      {/* Organizational Insights */}
      <div className="mt-12 bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-500 rounded-xl">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold">Institutional structural health is optimal</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Departmental distribution is balanced. All 18 departments have active leadership and met the minimum enrollment criteria for the 2026 academic year.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => toast.success('Generating structural report...')}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-2xl font-bold text-sm transition shadow-lg shadow-green-600/30"
              >
                Generate Structural Report
              </button>
              <button 
                onClick={() => toast.success('Opening Organization Chart')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-sm border border-white/10 transition"
              >
                Organization Chart
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
              <p className="text-3xl font-black mb-1">100%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Depts with PhD Heads</p>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
              <p className="text-3xl font-black mb-1">1:45</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Avg Staff-Student Ratio</p>
            </div>
          </div>
        </div>
        <Building2 size={300} className="absolute -bottom-20 -right-20 text-white/5 rotate-12" />
      </div>

      {/* Add Faculty/Dept Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add Faculty or Dept</h3>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              toast.success("Added to institutional structure successfully!");
              setIsAddModalOpen(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Type</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                    <option>Faculty / School</option>
                    <option>Department</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Name</label>
                  <input required type="text" placeholder="e.g. Faculty of Arts" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Appointed Head (Optional)</label>
                  <input type="text" placeholder="e.g. Dr. Jane Doe" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition shadow-lg shadow-green-600/20"
                >
                  Add Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Departments;
