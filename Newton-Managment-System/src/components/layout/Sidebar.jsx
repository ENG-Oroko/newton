import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  FileText,
  CalendarDays,
  Users,
  Bell,
  ScrollText,
  BarChart3,
  User,
  GraduationCap,
  ClipboardCheck,
  BadgeDollarSign,
  Receipt,
  Building2,
  ShieldCheck,
  Settings,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const { user } = useAuth();

  const role = user?.role || "guest";

  const menus = {
    student: [
      { name: "Dashboard", path: "/dashboard/student", icon: LayoutDashboard },
      { name: "My Courses", path: "/dashboard/student/courses", icon: BookOpen },
      { name: "Fees", path: "/dashboard/student/fees", icon: CreditCard },
      { name: "Results", path: "/dashboard/student/results", icon: FileText },
      { name: "Timetable", path: "/dashboard/student/timetable", icon: CalendarDays },
      { name: "Notices", path: "/dashboard/student/notices", icon: Bell },
      { name: "Analytics", path: "/dashboard/student/analytics", icon: BarChart3 },
      { name: "Profile", path: "/dashboard/student/profile", icon: User },
    ],

    lecturer: [
      { name: "Dashboard", path: "/dashboard/lecturer", icon: LayoutDashboard },
      { name: "My Classes", path: "/dashboard/lecturer/classes", icon: GraduationCap },
      { name: "Attendance", path: "/dashboard/lecturer/attendance", icon: ClipboardCheck },
      { name: "Grades", path: "/dashboard/lecturer/grades", icon: FileText },
      { name: "Profile", path: "/dashboard/lecturer/profile", icon: User },
    ],

    finance: [
      { name: "Dashboard", path: "/dashboard/finance", icon: LayoutDashboard },
      { name: "Fee Payments", path: "/dashboard/finance/payments", icon: BadgeDollarSign },
      { name: "Invoices", path: "/dashboard/finance/invoices", icon: Receipt },
      { name: "Reports", path: "/dashboard/finance/reports", icon: BarChart3 },
    ],

    registrator: [
      { name: "Dashboard", path: "/dashboard/registrator", icon: LayoutDashboard },
      { name: "Admissions", path: "/dashboard/registrator/admissions", icon: GraduationCap },
      { name: "Student Records", path: "/dashboard/registrator/records", icon: Users },
      { name: "Transcripts", path: "/dashboard/registrator/transcripts", icon: ScrollText },
    ],

    college_admin: [
      { name: "Dashboard", path: "/dashboard/college-admin", icon: LayoutDashboard },
      { name: "Departments", path: "/dashboard/college-admin/departments", icon: Building2 },
      { name: "Staff", path: "/dashboard/college-admin/staff", icon: Users },
      { name: "Reports", path: "/dashboard/college-admin/reports", icon: BarChart3 },
    ],

    super_admin: [
      { name: "Dashboard", path: "/dashboard/super-admin", icon: LayoutDashboard },
      { name: "System Users", path: "/dashboard/super-admin/users", icon: Users },
      { name: "Permissions", path: "/dashboard/super-admin/permissions", icon: ShieldCheck },
      { name: "Security", path: "/dashboard/super-admin/security", icon: ShieldCheck },
      { name: "Settings", path: "/dashboard/super-admin/settings", icon: Settings },
    ],
  };

  const items = menus[role] || [];

  return (
    <aside className="w-60 h-[calc(100vh-64px)] sticky top-16 bg-white border-r border-gray-200 flex flex-col z-10">

      {/* NAVIGATION */}
      <nav className="space-y-1 flex-1 overflow-y-auto px-3 py-4">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-green-100 text-green-700 border-l-4 border-green-600"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              <Icon size={17} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-4 py-3 border-t border-gray-200 text-[11px] text-gray-400">
        © 2026 Newton Institute
      </div>
    </aside>
  );
};

export default Sidebar;