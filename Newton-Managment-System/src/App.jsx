import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ================= AUTH PAGES ================= */
import Login from "./pages/Auth/login.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import VerifyOtp from "./pages/Auth/VerifyOtp.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";

/* ================= ROUTE GUARDS ================= */
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RoleRoute from "./routes/RoleRoute.jsx";

/* ================= DASHBOARDS ================= */
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import LecturerDashboard from "./pages/lecturer/LecturerDashboard.jsx";
import FinanceDashboard from "./pages/finance/FinanceDashboard.jsx";
import RegistratorDashboard from "./pages/registrator/RegistratorDashboard.jsx";
import CollegeAdminDashboard from "./pages/collegeAdmin/CollegeAdminDashboard.jsx";
import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard.jsx";

/* ================= STUDENT PAGES ================= */
import MyCourses from "./pages/student/Courses.jsx";
import Fees from "./pages/student/Fees.jsx";
import Results from "./pages/student/Results.jsx";
import StudentTimetable from "./pages/student/Timetable.jsx";
import LecturerInfo from "./pages/student/LecturerInfo.jsx";
import Notices from "./pages/student/Notices.jsx";
import StudentProfile from "./pages/student/Profile.jsx";
import PerformanceAnalytics from "./pages/student/PerformanceAnalytics.jsx";

/* ================= LECTURER PAGES ================= */
import Courses from "./pages/lecturer/Courses.jsx";
import StudentsAttendance from "./pages/lecturer/StudentsAttendance.jsx";
import GradesExams from "./pages/lecturer/GradesExams.jsx";
import AssignmentsMaterials from "./pages/lecturer/AssignmentsMaterials.jsx";
import LecturerTimetable from "./pages/lecturer/Timetable.jsx";
import Communication from "./pages/lecturer/Communication.jsx";
import Reports from "./pages/lecturer/Reports.jsx";
import Notifications from "./pages/lecturer/Notifications.jsx";
import LecturerProfile from "./pages/lecturer/Profile.jsx";
import LecturerSettings from "./pages/lecturer/Settings.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= STUDENT ================= */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route path="/dashboard/student/courses" element={<MyCourses />} />
        <Route path="/dashboard/student/fees" element={<Fees />} />
        <Route path="/dashboard/student/results" element={<Results />} />
        <Route path="/dashboard/student/timetable" element={<StudentTimetable />} />
        <Route path="/dashboard/student/lecturers" element={<LecturerInfo />} />
        <Route path="/dashboard/student/profile" element={<StudentProfile />} />
        <Route path="/dashboard/student/analytics" element={<PerformanceAnalytics />} />

        {/* ================= LECTURER ================= */}
        <Route
          path="/dashboard/lecturer"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["lecturer"]}>
                <LecturerDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route path="/dashboard/lecturer/courses" element={<Courses />} />
        <Route path="/dashboard/lecturer/students-attendance" element={<StudentsAttendance />} />
        <Route path="/dashboard/lecturer/grades-exams" element={<GradesExams />} />
        <Route path="/dashboard/lecturer/assignments-materials" element={<AssignmentsMaterials />} />
        <Route path="/dashboard/lecturer/timetable" element={<LecturerTimetable />} />
        <Route path="/dashboard/lecturer/communication" element={<Communication />} />
        <Route path="/dashboard/lecturer/reports" element={<Reports />} />
        <Route path="/dashboard/lecturer/notifications" element={<Notifications />} />
        <Route path="/dashboard/lecturer/profile" element={<LecturerProfile />} />
        <Route path="/dashboard/lecturer/settings" element={<LecturerSettings />} />

        {/* ================= FINANCE ================= */}
        <Route
          path="/dashboard/finance"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["finance"]}>
                <FinanceDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ================= REGISTRATOR ================= */}
        <Route
          path="/dashboard/registrator"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["registrator"]}>
                <RegistratorDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ================= COLLEGE ADMIN ================= */}
        <Route
          path="/dashboard/college-admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["college_admin"]}>
                <CollegeAdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ================= SUPER ADMIN ================= */}
        <Route
          path="/dashboard/super-admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["super_admin"]}>
                <SuperAdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
              404 | Page Not Found
            </div>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;