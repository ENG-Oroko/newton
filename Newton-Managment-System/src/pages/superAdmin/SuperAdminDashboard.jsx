import React from "react";
import DashboardPage from "../../components/layout/DashboardLayout";

const SuperAdminDashboard = () => {
  const stats = [
    { label: "Total Students", value: "4,820" },
    { label: "Total Staff", value: "312" },
    { label: "Departments", value: "14" },
    { label: "Revenue This Term", value: "KES 18.4M" },
  ];

  const recentUsers = [
    {
      name: "John Kamau",
      role: "Lecturer",
      status: "Active",
    },
    {
      name: "Mary Wanjiku",
      role: "Finance",
      status: "Active",
    },
    {
      name: "Peter Otieno",
      role: "Student",
      status: "Pending",
    },
    {
      name: "Grace Akinyi",
      role: "Registrar",
      status: "Active",
    },
  ];

  const alerts = [
    "3 pending user approvals",
    "Finance report ready for review",
    "System backup completed successfully",
    "2 departments need timetable updates",
  ];

  return (
    <DashboardPage
      title="Super Admin Dashboard"
      subtitle="Manage the entire college system, users, reports, and settings"
      stats={stats}
    >
      {/* QUICK ACTIONS */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Quick Actions</h3>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition">
            Add User
          </button>

          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            View Reports
          </button>

          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            Manage Roles
          </button>

          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            System Settings
          </button>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Recent Users</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white/70">
            <thead className="text-xs text-cyan-300 border-b border-white/10">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Role</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.role}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "Active"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ALERTS */}
      <div>
        <h3 className="text-white font-semibold mb-3">System Alerts</h3>

        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
            >
              {alert}
            </div>
          ))}
        </div>
      </div>
    </DashboardPage>
  );
};

export default SuperAdminDashboard;