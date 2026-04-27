import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BarChart3 } from "lucide-react";

const Reports = () => {
  const reports = [
    { title: "Attendance Report", value: "92%" },
    { title: "Pass Rate", value: "85%" },
    { title: "Average Grade", value: "B+" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 /> Reports & Analytics
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reports.map((r, i) => (
            <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm text-center">
              <h3 className="text-sm text-gray-500">{r.title}</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">{r.value}</p>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Reports;