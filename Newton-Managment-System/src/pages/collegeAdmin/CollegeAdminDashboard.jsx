import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const CollegeAdminDashboard = () => {
  const stats = [
    { label: "Total Students", value: 980 },
    { label: "Total Staff", value: 120 },
    { label: "Departments", value: 8 },
    { label: "System Reports", value: 34 },
  ];

  const departments = [
    { name: "Computer Science", students: 220, head: "Dr. Kimani" },
    { name: "Business Studies", students: 180, head: "Dr. Wanjiku" },
    { name: "Engineering", students: 260, head: "Dr. Otieno" },
    { name: "Nursing", students: 150, head: "Dr. Akinyi" },
  ];

  const alerts = [
    "Staff workload reports pending review",
    "New department request submitted",
    "Student performance report due",
  ];

  return (
    <DashboardLayout
      title="College Admin Dashboard"
      subtitle="Manage departments, staff, and institutional performance"
      stats={stats}
    >
      {/* DEPARTMENTS */}
      <div>
        <h3 className="text-white font-semibold mb-3">Departments Overview</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white/70">
            <thead className="text-xs text-cyan-300 border-b border-white/10">
              <tr>
                <th className="py-2">Department</th>
                <th className="py-2">Students</th>
                <th className="py-2">Head of Department</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((d, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-2">{d.name}</td>
                  <td className="py-2">{d.students}</td>
                  <td className="py-2">{d.head}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SYSTEM ALERTS */}
      <div className="mt-6">
        <h3 className="text-white font-semibold mb-3">System Alerts</h3>

        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm"
            >
              ⚠ {alert}
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-6">
        <h3 className="text-white font-semibold mb-2">Quick Actions</h3>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition">
            Add Department
          </button>

          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            Manage Staff
          </button>

          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            Generate Reports
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CollegeAdminDashboard;