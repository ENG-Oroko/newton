import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Menu, Bell, X } from "lucide-react";

const Header = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const notifications = [
    { id: 1, message: "New student admission submitted." },
    { id: 2, message: "Semester fee deadline is approaching." },
    { id: 3, message: "Lecturer timetable updated." },
    { id: 4, message: "Examination results published." },
  ];

  const roleLabel = user?.role
    ? user.role.replace(/_/g, " ").toUpperCase()
    : "GUEST";

  const fullName = user?.name || "User";

  return (
    <header className="sticky top-0 z-50 w-full h-16 px-4 md:px-6 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* MOBILE SIDEBAR BUTTON */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden h-10 w-10 rounded-xl bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-700 transition"
        >
          <Menu size={20} />
        </button>

        {/* BRAND */}
        <div className="leading-tight">
          <h1 className="text-sm md:text-lg font-bold text-green-700">
            Newton Institute of Technology
          </h1>
          <p className="text-[10px] md:text-xs text-green-500">
            School Management System
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* ROLE BADGE */}
        <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
          {roleLabel}
        </span>

        {/* NOTIFICATION */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="relative h-10 w-10 rounded-xl hover:bg-gray-100 flex items-center justify-center text-green-700 transition"
          >
            {open ? <X size={18} /> : <Bell size={18} />}

            {notifications.length > 0 && !open && (
              <span className="absolute top-1 right-1 bg-green-500 text-white text-[10px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-[290px] sm:w-80 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-gray-800">
                Notifications
              </div>

              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100 hover:bg-green-50 transition"
                  >
                    {n.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* USER */}
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium text-gray-800">{fullName}</p>
          {user?.email && (
            <p className="text-xs text-gray-500">{user.email}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;