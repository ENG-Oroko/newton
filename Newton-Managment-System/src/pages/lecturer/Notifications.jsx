import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Bell } from "lucide-react";

const Notifications = () => {
  const notifications = [
    "New student enrolled in CS101",
    "Assignment deadline approaching",
    "System maintenance tonight",
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell /> Notifications
          </h2>
        </div>

        <div className="space-y-3">
          {notifications.map((n, i) => (
            <div key={i} className="bg-white border rounded-2xl p-4 shadow-sm">
              {n}
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Notifications;