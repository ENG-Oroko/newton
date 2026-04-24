import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const FinanceDashboard = () => {
  const stats = [
    { label: "Total Fees Collected", value: "KES 2.4M" },
    { label: "Pending Payments", value: "KES 380K" },
    { label: "Paid Students", value: 340 },
    { label: "Outstanding Invoices", value: 27 },
  ];

  const payments = [
    {
      name: "John Doe",
      amount: "15,000",
      status: "Paid",
      date: "2026-04-20",
    },
    {
      name: "Mary Wanjiku",
      amount: "20,000",
      status: "Pending",
      date: "2026-04-18",
    },
    {
      name: "Alex Kimani",
      amount: "12,000",
      status: "Paid",
      date: "2026-04-15",
    },
    {
      name: "Grace Akinyi",
      amount: "18,000",
      status: "Overdue",
      date: "2026-04-10",
    },
  ];

  const invoices = [
    { id: "INV-001", student: "John Doe", amount: "15,000", status: "Paid" },
    {
      id: "INV-002",
      student: "Mary Wanjiku",
      amount: "20,000",
      status: "Pending",
    },
    {
      id: "INV-003",
      student: "Alex Kimani",
      amount: "12,000",
      status: "Paid",
    },
    {
      id: "INV-004",
      student: "Grace Akinyi",
      amount: "18,000",
      status: "Overdue",
    },
  ];

  return (
    <DashboardLayout
      title="Finance Dashboard"
      subtitle="Manage school finances, fees, invoices, and payments"
      stats={stats}
    >
      {/* PAYMENTS TABLE */}
      <div>
        <h3 className="text-white font-semibold mb-3">Recent Payments</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white/70">
            <thead className="text-xs text-cyan-300 border-b border-white/10">
              <tr>
                <th className="py-2">Student</th>
                <th className="py-2">Amount (KES)</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">{p.amount}</td>
                  <td className="py-2">{p.date}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        p.status === "Paid"
                          ? "bg-green-500/20 text-green-300"
                          : p.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVOICES */}
      <div className="mt-6">
        <h3 className="text-white font-semibold mb-3">Invoices</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white/70">
            <thead className="text-xs text-cyan-300 border-b border-white/10">
              <tr>
                <th className="py-2">Invoice ID</th>
                <th className="py-2">Student</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-2">{inv.id}</td>
                  <td className="py-2">{inv.student}</td>
                  <td className="py-2">{inv.amount}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        inv.status === "Paid"
                          ? "bg-green-500/20 text-green-300"
                          : inv.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {inv.status}
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
            Record Payment
          </button>

          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            Generate Invoice
          </button>

          <button className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
            Financial Reports
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinanceDashboard;