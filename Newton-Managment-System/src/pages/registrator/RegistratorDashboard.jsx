import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const RegistrarDashboard = () => {
  const stats = [
    { label: "Total Admissions", value: 45 },
    { label: "Pending Approvals", value: 12 },
    { label: "Approved Students", value: 980 },
    { label: "Transcripts Requested", value: 22 },
  ];

  const admissions = [
    { name: "John Doe", course: "Computer Science", status: "Pending" },
    { name: "Mary Wanjiku", course: "Business IT", status: "Approved" },
    { name: "Alex Kimani", course: "Engineering", status: "Pending" },
    { name: "Grace Akinyi", course: "Nursing", status: "Approved" },
  ];

  return (
    <DashboardLayout
      title="Registrar Dashboard"
      subtitle="Manage admissions, student records, and academic documents"
      stats={stats}
    >
      {/* ADMISSIONS TABLE */}
      <div>
        <h3 className="text-white font-semibold mb-3">Recent Admissions</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white/70">
            <thead className="text-xs text-cyan-300 border-b border-white/10">
              <tr>
                <th className="py-2">Student Name</th>
                <th className="py-2">Course</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {admissions.map((a, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-2">{a.name}</td>
                  <td className="py-2">{a.course}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        a.status === "Approved"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-6">
        <h3 className="text-white font-semibold mb-2">Quick Actions</h3>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition">
            Approve Admissions
          </button>

          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            Generate Transcripts
          </button>

          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            View Student Records
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegistrarDashboard;