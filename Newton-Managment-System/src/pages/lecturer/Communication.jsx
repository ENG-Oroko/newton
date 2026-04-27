import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { MessageSquare } from "lucide-react";

const Communication = () => {
  const messages = [
    { from: "Admin", text: "Submit marks before Friday" },
    { from: "Student", text: "Requesting extra notes" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare /> Communication
          </h2>
        </div>

        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">{m.from}</p>
              <p className="font-medium">{m.text}</p>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Communication;