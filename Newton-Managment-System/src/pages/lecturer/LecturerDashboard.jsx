import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const LecturerDashboard = () => {
  const stats = [
    { label: "Classes", value: 4 },
    { label: "Students", value: 120 },
    { label: "Assignments", value: 8 },
    { label: "Pending Grades", value: 15 },
  ];

  return (
    <DashboardLayout
      title="Lecturer Dashboard"
      subtitle="Manage your classes and student performance"
      stats={stats}
    >
      <div className="text-white/70 text-sm">
        <p>Today’s schedule:</p>
        <ul className="mt-2 space-y-2">
          <li>• Software Engineering - 10:00 AM</li>
          <li>• Database Systems - 2:00 PM</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default LecturerDashboard;