import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  BarChart3, 
  TrendingUp, 
  BadgeDollarSign, 
  CreditCard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight, 
  Download, 
  Calendar,
  Filter,
  PieChart,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const FinancialOverview = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const revenueBySchool = [
    { name: "School of Computing", target: "5.0M", collected: "4.2M", percentage: 84, trend: "up" },
    { name: "School of Engineering", target: "4.5M", collected: "3.8M", percentage: 84, trend: "up" },
    { name: "School of Health Sciences", target: "3.2M", collected: "3.1M", percentage: 97, trend: "up" },
    { name: "School of Business", target: "4.0M", collected: "2.9M", percentage: 72, trend: "down" },
    { name: "School of Humanities", target: "1.2M", collected: "0.8M", percentage: 66, trend: "up" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financial Overview</h1>
          <p className="text-sm text-gray-500">Executive institutional financial health, revenue collection, and budget tracking</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsDownloading(true);
              const tId = toast.loading("Generating financial report...");
              setTimeout(() => {
                toast.success("Report downloaded", { id: tId });
                setIsDownloading(false);
              }, 1500);
            }}
            disabled={isDownloading}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <Download size={16} />
            {isDownloading ? "Downloading..." : "Financial Report"}
          </button>
          <button 
            onClick={() => {
              setIsSyncing(true);
              const tId = toast.loading("Syncing revenue data...");
              setTimeout(() => {
                toast.success("Revenue synced successfully", { id: tId });
                setIsSyncing(false);
              }, 1500);
            }}
            disabled={isSyncing}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <BadgeDollarSign size={16} />
            {isSyncing ? "Syncing..." : "Revenue Sync"}
          </button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Revenue", value: "KES 18.4M", icon: Wallet, color: "text-blue-600", bg: "bg-blue-50", trend: "+15.2%", up: true },
          { label: "Collection Rate", value: "82.4%", icon: BarChart3, color: "text-green-600", bg: "bg-green-50", trend: "+5.1%", up: true },
          { label: "Outstanding Balance", value: "KES 4.2M", icon: CreditCard, color: "text-red-600", bg: "bg-red-50", trend: "-2.4%", up: false },
          { label: "Operational Budget", value: "KES 12.0M", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50", trend: "Balanced", up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center text-[10px] font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
            <h2 className="text-xl font-black text-gray-800 tracking-tight">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue by School */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
              <PieChart size={20} className="text-green-600" />
              Revenue Collection by School
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => toast.success("Filters applied")}
                className="p-2 bg-white border border-gray-100 text-gray-400 hover:text-green-600 rounded-lg transition"
              >
                <Filter size={16} />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-8">
            {revenueBySchool.map((school, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{school.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Collected: <span className="text-green-600">{school.collected}</span> / Target: {school.target}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-gray-800">{school.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-3 p-0.5 border border-gray-100">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      school.percentage > 90 ? 'bg-green-500' : school.percentage > 80 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${school.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => toast.success('Opening detailed financial statements...')}
            className="w-full py-4 bg-gray-50 text-xs font-bold text-gray-400 hover:text-green-600 hover:bg-green-50 transition border-t border-gray-100 flex items-center justify-center gap-2"
          >
            Detailed Financial Statements <ChevronRight size={14} />
          </button>
        </div>

        {/* Right Sidebar: Collection Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-600" />
              Collection Insights
            </h3>
            <div className="space-y-6">
              <div 
                onClick={() => toast('Viewing tuition details...', { icon: '📊' })}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-green-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Tuition Paid</p>
                    <p className="text-[10px] text-gray-400">Term 1 2026</p>
                  </div>
                </div>
                <p className="text-sm font-black text-gray-800">75%</p>
              </div>
              
              <div 
                onClick={() => toast('Viewing late fees breakdown...', { icon: '📊' })}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Late Fees</p>
                    <p className="text-[10px] text-gray-400">Accrued this term</p>
                  </div>
                </div>
                <p className="text-sm font-black text-gray-800">4.2%</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-2xl animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm text-orange-600">
                    <AlertCircle size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-orange-800 tracking-tight">Outstanding Balances</p>
                    <p className="text-[10px] text-orange-600/70 font-medium leading-tight">650 students with balances above 50k.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => toast.success('Debtors list generation started...')}
              className="w-full mt-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xs font-bold transition shadow-lg shadow-green-600/20"
            >
              Generate Debtors List
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[200px]">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Budget Compliance</h3>
              <p className="text-sm text-gray-400 opacity-80 leading-relaxed mb-6">Institution is operating within 92% of the allocated semester budget.</p>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 flex items-center justify-center text-[10px] font-bold">
                    AD
                  </div>
                ))}
              </div>
              <button 
                onClick={() => toast.success('Viewing full budget breakdown...')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold border border-white/10 transition"
              >
                View Budget
              </button>
            </div>
            <BarChart3 size={120} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default FinancialOverview;
