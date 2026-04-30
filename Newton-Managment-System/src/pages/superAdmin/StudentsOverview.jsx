import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Users, 
  TrendingUp, 
  PieChart, 
  Target, 
  GraduationCap, 
  UserCheck, 
  ArrowUpRight, 
  ChevronRight, 
  Download, 
  Calendar,
  Filter,
  Activity,
  AlertCircle
} from "lucide-react";

const StudentsOverview = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const enrollmentTrends = [
    { year: "2024", total: 3850, growth: 5.2 },
    { year: "2025", total: 4210, growth: 9.3 },
    { year: "2026", total: 4820, growth: 12.5 },
  ];

  const demographics = [
    { label: "Male Students", value: 2540, percentage: 53, color: "bg-blue-500" },
    { label: "Female Students", value: 2280, percentage: 47, color: "bg-green-500" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Students Overview</h1>
          <p className="text-sm text-gray-500">Institutional student lifecycle, enrollment trends, and retention analytics</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsGenerating(true);
              const tId = toast.loading("Generating demographic report...");
              setTimeout(() => {
                toast.success("Report ready for download", { id: tId });
                setIsGenerating(false);
              }, 1500);
            }}
            disabled={isGenerating}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <Download size={16} />
            {isGenerating ? "Generating..." : "Demographics Report"}
          </button>
          <button 
            onClick={() => toast.success('Loading full growth analytics...')}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <TrendingUp size={16} />
            Growth Analytics
          </button>
        </div>
      </div>

      {/* Lifecycle KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Active Enrollment", value: "4,820", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Retention Rate", value: "94.2%", icon: Target, color: "text-green-600", bg: "bg-green-50" },
          { label: "Graduation Rate", value: "88.5%", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Alumni Network", value: "12.4k", icon: UserCheck, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group hover:shadow-md transition">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
              <stat.icon size={24} />
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section: Trends & Demographics */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <Activity size={20} className="text-green-600" />
                Enrollment Growth Trends
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => toast.success("Showing 3 year trends")}
                  className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-xs font-bold hover:bg-gray-100 transition"
                >
                  3 Years
                </button>
                <button 
                  onClick={() => toast.success("Showing 5 year trends")}
                  className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold transition"
                >
                  5 Years
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {enrollmentTrends.map((trend, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm group-hover:text-green-600 transition">Academic Year {trend.year}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{trend.total} Total Students</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-green-600 flex items-center gap-1">
                        <ArrowUpRight size={14} /> +{trend.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-50 rounded-full h-4 p-1 border border-gray-100">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 shadow-sm"
                      style={{ width: `${(trend.total/5000)*100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retention & Risk Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-fit">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <PieChart size={18} className="text-blue-600" />
                Gender Demographics
              </h3>
              <div className="space-y-4">
                {demographics.map((d, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 font-bold">{d.label}</span>
                      <span className="text-gray-800 font-black">{d.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-full h-2">
                      <div className={`${d.color} h-full rounded-full`} style={{ width: `${d.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 shadow-sm h-fit flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="p-3 bg-white rounded-2xl w-fit text-orange-600 shadow-sm mb-4">
                  <AlertCircle size={24} />
                </div>
                <h3 className="font-bold text-orange-900 mb-1">Students at Risk</h3>
                <p className="text-sm text-orange-700/70 leading-relaxed">
                  145 students (3.1%) are currently flagged for low attendance or academic performance issues this term.
                </p>
              </div>
              <button 
                onClick={() => toast.success('Opening risk profile details...')}
                className="w-full mt-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-orange-600/20"
              >
                Review Risk Profiles
              </button>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Quick Stats */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Calendar size={18} className="text-green-600" />
              Enrollment Stages
            </h3>
            <div className="space-y-6">
              {[
                { label: "New Applications", value: "1,250", color: "text-blue-600", bg: "bg-blue-50", percentage: 100 },
                { label: "Qualified / Invited", value: "840", color: "text-purple-600", bg: "bg-purple-50", percentage: 67 },
                { label: "Fully Registered", value: "320", color: "text-green-600", bg: "bg-green-50", percentage: 25 },
                { label: "Waitlisted", value: "115", color: "text-orange-600", bg: "bg-orange-50", percentage: 9 },
              ].map((stage, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${stage.color.replace('text', 'bg')}`} />
                    {i !== 3 && <div className="w-0.5 h-12 bg-gray-50" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-bold text-gray-800">{stage.label}</p>
                      <span className="text-xs font-black text-gray-800">{stage.value}</span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-full h-1">
                      <div className={`h-full rounded-full ${stage.color.replace('text', 'bg')}`} style={{ width: `${stage.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Retention Strategy</h3>
              <p className="text-sm text-gray-400 opacity-80 leading-relaxed mb-6">
                Our 2026 goal is to maintain a 95% retention rate across all undergraduate programs.
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 flex items-center justify-center text-[8px] font-bold">
                    UN
                  </div>
                ))}
              </div>
              <button 
                onClick={() => toast.success('Viewing detailed retention strategies...')}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <TrendingUp size={120} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default StudentsOverview;
