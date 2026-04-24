import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Transcript = () => {
  const stats = [
    { label: "CGPA", value: "3.6" },
  ];

  return (
    <DashboardLayout
      title="Transcript"
      subtitle="Download academic transcript"
      stats={stats}
    >
      <button className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-xl">
        Download PDF
      </button>
    </DashboardLayout>
  );
};

export default Transcript;