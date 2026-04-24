import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  User,
  BookOpen,
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Info,
} from "lucide-react";

const Profile = () => {
  const stats = [
    {
      label: "Year of Study",
      value: "2",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Program",
      value: "Computer Science",
      icon: User,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Status",
      value: "Active",
      icon: BadgeCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const achievements = [
    "Dean’s List 2025",
    "Best Project Award",
    "95% Attendance",
  ];

  const timeline = [
    { event: "Joined University", date: "2024" },
    { event: "Completed Year 1", date: "2025" },
    { event: "Promoted to Year 2", date: "2026" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">
                DO
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Douglas Juma Oroko
                </h2>
                <p className="text-sm text-gray-500">
                  CS Student • CS/2026/001
                </p>
              </div>
            </div>

            {/* BADGE */}
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 border border-green-200">
              Active Student
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {stats.map((s, i) => {
            const Icon = s.icon;

            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{s.label}</p>
                    <h2 className="text-lg font-bold text-gray-800">
                      {s.value}
                    </h2>
                  </div>

                  <div className={`p-3 rounded-xl ${s.bg}`}>
                    <Icon className={s.color} size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* PERSONAL INFO */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User size={18} className="text-green-600" />
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail size={14} className="text-gray-400" />
                  student@college.com
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone size={14} className="text-gray-400" />
                  +254 712 345 678
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <MapPin size={14} className="text-gray-400" />
                  Nairobi, Kenya
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Calendar size={14} className="text-gray-400" />
                  2024 Intake
                </p>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                Academic Timeline
              </h3>

              <div className="space-y-3">
                {timeline.map((t, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm p-3 bg-gray-50 rounded-xl"
                  >
                    <span className="text-gray-700">{t.event}</span>
                    <span className="text-gray-500">{t.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* ACHIEVEMENTS */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Award size={18} className="text-yellow-500" />
                Achievements
              </h3>

              <div className="space-y-2">
                {achievements.map((a, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 rounded-xl bg-green-50 text-green-700 text-sm"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* INFO BOX */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <Info className="text-blue-600" size={18} />
                <p className="text-sm text-blue-700">
                  Your profile is visible to lecturers and administration.
                  Keep your details updated for accurate records.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;