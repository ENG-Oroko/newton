import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings /> Settings
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="p-4 border rounded-xl">Change Password</div>
            <div className="p-4 border rounded-xl">Notification Preferences</div>
            <div className="p-4 border rounded-xl">Theme Settings</div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;