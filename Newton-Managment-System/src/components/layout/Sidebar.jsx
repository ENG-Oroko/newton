import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  MessageSquare,
  Video,
  LogOut,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || "guest";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menus = {
    student: [
      { name: "Dashboard", path: "/dashboard/student", icon: LayoutDashboard },
      { name: "Courses", path: "/dashboard/student/courses", icon: BookOpen },
      { name: "Fees", path: "/dashboard/student/fees", icon: CreditCard },
      { name: "Results", path: "/dashboard/student/results", icon: FileText },
      { name: "Timetable", path: "/dashboard/student/timetable", icon: CalendarDays },
      { name: "Analytics", path: "/dashboard/student/analytics", icon: BarChart3 },
      { name: "Profile", path: "/dashboard/student/profile", icon: User },
    ],

    lecturer: [
      { name: "Dashboard", path: "/dashboard/lecturer", icon: LayoutDashboard },
      { name: "Courses", path: "/dashboard/lecturer/courses", icon: BookOpen },
      { name: "Attendance", path: "/dashboard/lecturer/students-attendance", icon: Users },
      { name: "Grades", path: "/dashboard/lecturer/grades-exams", icon: ClipboardCheck },
      { name: "Assignments", path: "/dashboard/lecturer/assignments-materials", icon: FileText },
      { name: "Timetable", path: "/dashboard/lecturer/timetable", icon: CalendarDays },
      { name: "Reports", path: "/dashboard/lecturer/reports", icon: BarChart3 },
      { name: "Profile", path: "/dashboard/lecturer/profile", icon: User },
      { name: "Settings", path: "/dashboard/lecturer/settings", icon: Settings },
    ],

    finance: [
      { name: "Dashboard", path: "/dashboard/finance", icon: LayoutDashboard },
      { name: "Payments", path: "/dashboard/finance/payments", icon: BadgeDollarSign },
      { name: "Invoices", path: "/dashboard/finance/invoices", icon: Receipt },
      { name: "Reports", path: "/dashboard/finance/reports", icon: BarChart3 },
    ],

    registrator: [
      { name: "Dashboard", path: "/dashboard/registrator", icon: LayoutDashboard },
      { name: "Admissions", path: "/dashboard/registrator/admissions", icon: GraduationCap },
      { name: "Records", path: "/dashboard/registrator/records", icon: Users },
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
      { name: "Users", path: "/dashboard/super-admin/users", icon: Users },
      { name: "Permissions", path: "/dashboard/super-admin/permissions", icon: ShieldCheck },
      { name: "Security", path: "/dashboard/super-admin/security", icon: ShieldCheck },
      { name: "Settings", path: "/dashboard/super-admin/settings", icon: Settings },
    ],
  };

  const items = menus[role] || [];

  return (
    <aside className="w-52 h-[calc(100vh-64px)] sticky top-16 bg-white border-r border-gray-200 flex flex-col z-10">

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 hide-scrollbar space-y-1">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition ${
                  isActive
                    ? "bg-green-100 text-green-700 border-l-2 border-green-600"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              <Icon size={15} />
              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="px-2 py-2 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-2 py-2 rounded-md text-xs font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;