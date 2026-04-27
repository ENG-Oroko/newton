import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { User, Mail, Phone, MapPin } from "lucide-react";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center font-bold text-green-700">
              LJ
            </div>

            <div>
              <h2 className="text-xl font-bold">Lecturer John</h2>
              <p className="text-sm text-gray-500">Computer Science Department</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <p className="flex items-center gap-2"><Mail /> lecturer@school.com</p>
            <p className="flex items-center gap-2"><Phone /> +254 700 000 000</p>
            <p className="flex items-center gap-2"><MapPin /> Nairobi, Kenya</p>
            <p className="flex items-center gap-2"><User /> Senior Lecturer</p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;