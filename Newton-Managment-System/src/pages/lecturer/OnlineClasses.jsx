import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Video } from "lucide-react";

const OnlineClasses = () => {
  const classes = [
    { title: "CS101 Live Class", link: "#" },
    { title: "DBMS Revision Session", link: "#" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Video /> Online Classes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {classes.map((c, i) => (
            <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold">{c.title}</h3>
              <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-xl text-sm">
                Join Class
              </button>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default OnlineClasses;