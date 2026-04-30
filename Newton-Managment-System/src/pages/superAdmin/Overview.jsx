import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Building2, 
  MapPin, 
  Users, 
  GraduationCap, 
  School, 
  Layers, 
  TrendingUp, 
  ChevronRight,
  ArrowUpRight,
  CheckCircle,
  Building,
  ShieldCheck
} from "lucide-react";

const InstitutionOverview = () => {
  const [isExporting, setIsExporting] = useState(false);

  const departments = [
    { name: "School of Computing", dean: "Dr. Sarah Kim", students: 1250, staff: 45, programs: 8 },
    { name: "School of Engineering", dean: "Prof. James Otieno", students: 850, staff: 62, programs: 12 },
    { name: "School of Health Sciences", dean: "Dr. Mary Wanjiku", students: 980, staff: 55, programs: 6 },
    { name: "School of Business", dean: "Dr. David Okello", students: 1450, staff: 38, programs: 15 },
    { name: "School of Humanities", dean: "Prof. Grace Akinyi", students: 290, staff: 15, programs: 4 },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Institution Overview</h1>
          <p className="text-sm text-gray-500">Comprehensive view of institutional structure, campuses, and academic schools</p>
        </div>
        <button 
          onClick={() => toast.success('Campus management tools coming soon')}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
        >
          <Building size={16} />
          Manage Campuses
        </button>
      </div>

      {/* Campus Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between group hover:border-green-600 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Building2 size={24} />
            </div>
            <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-1 rounded-full uppercase tracking-widest">Main Campus</span>
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-black text-gray-800">Nairobi City</h3>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <MapPin size={12} /> University Way, CBD
            </p>
          </div>
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-50">
            <div>
              <p className="text-xs font-bold text-gray-800">3,450</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Students</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">14</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Schools</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between group hover:border-blue-600 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Building2 size={24} />
            </div>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full uppercase tracking-widest">Tech Campus</span>
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-black text-gray-800">Mombasa Road</h3>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <MapPin size={12} /> Synergy Park, Embakasi
            </p>
          </div>
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-50">
            <div>
              <p className="text-xs font-bold text-gray-800">1,210</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Students</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">6</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Labs</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Institution Growth</h3>
            <p className="text-sm text-green-100 opacity-80 leading-relaxed">
              We have expanded our infrastructure by 15% this year with the completion of the new Science Wing.
            </p>
          </div>
          <div className="relative z-10 flex items-end justify-between mt-8">
            <div>
              <p className="text-3xl font-black">15%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-green-200">Expansion Rate</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl">
              <TrendingUp size={24} />
            </div>
          </div>
          <Layers size={150} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
        </div>
      </div>

      {/* Schools / Departments Table */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <School size={20} className="text-green-600" />
            Institutional Schools & Faculties
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setIsExporting(true);
                const tId = toast.loading("Preparing institutional structure export...");
                setTimeout(() => {
                  toast.success("Structure exported successfully", { id: tId });
                  setIsExporting(false);
                }, 1500);
              }}
              disabled={isExporting}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:text-green-600 transition"
            >
              {isExporting ? "Exporting..." : "Export Structure"}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400 border-b border-gray-50 uppercase tracking-wider text-[10px] font-black">
                <th className="px-8 py-5">School Name</th>
                <th className="px-8 py-5">Dean / Faculty Head</th>
                <th className="px-8 py-5 text-center">Students</th>
                <th className="px-8 py-5 text-center">Staff</th>
                <th className="px-8 py-5 text-center">Programs</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {departments.map((dept, i) => (
                <tr key={i} className="hover:bg-green-50/20 transition group">
                  <td className="px-8 py-6 font-bold text-gray-800 group-hover:text-green-600 transition">{dept.name}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                        {dept.dean.split(' ').pop()[0]}
                      </div>
                      <p className="text-gray-600 font-medium text-xs">{dept.dean}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="font-bold text-gray-800">{dept.students}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="font-medium text-gray-500">{dept.staff}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg">{dept.programs}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
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
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Institutional Accred.", value: "Verified", icon: CheckCircle, color: "text-green-600" },
          { label: "ISO 9001:2015", value: "Active", icon: ShieldCheck, color: "text-blue-600" },
          { label: "Student Capacity", value: "8,500", icon: Users, color: "text-purple-600" },
          { label: "Graduation Projection", value: "1,200", icon: GraduationCap, color: "text-orange-600" },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:shadow-lg transition">
            <div className={`p-3 rounded-2xl bg-gray-50 ${item.color} mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon size={20} />
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-lg font-black text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default InstitutionOverview;
