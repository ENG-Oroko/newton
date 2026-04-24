import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const LecturerInfo = () => {
  const stats = [
    { label: "Lecturers", value: 4 },
  ];

  const lecturers = [
    { name: "Dr Kamau", unit: "CS101" },
    { name: "Dr Akinyi", unit: "CS201" },
  ];

  return (
    <DashboardLayout
      title="Lecturers"
      subtitle="Your course lecturers"
      stats={stats}
    >
      <div className="space-y-3">
        {lecturers.map((l, i) => (
          <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-cyan-300">{l.name}</p>
            <p className="text-white/60">{l.unit}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default LecturerInfo;