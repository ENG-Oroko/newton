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
import CollegeAdminDashboard from "./pages/collegeAdmin/CollegeAdminDashboard.jsx";
import FinanceDashboard from "./pages/finance/FinanceDashboard.jsx";
import LecturerDashboard from "./pages/lecturer/LecturerDashboard.jsx";
import RegistratorDashboard from "./pages/registrator/RegistratorDashboard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard.jsx";

/* ================= STUDENT PAGES ================= */
import MyCourses from "./pages/student/Courses.jsx";
import Fees from "./pages/student/Fees.jsx";
import Results from "./pages/student/Results.jsx";
import Timetable from "./pages/student/Timetable.jsx";
import LecturerInfo from "./pages/student/LecturerInfo.jsx";
import Notices from "./pages/student/Notices.jsx";
import Profile from "./pages/student/Profile.jsx";
import Transcript from "./pages/student/Transcript.jsx";
import PerformanceAnalytics from "./pages/student/PerformanceAnalytics.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ================= STUDENT MODULE ================= */}
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
        <Route path="/dashboard/student/timetable" element={<Timetable />} />
        <Route path="/dashboard/student/lecturers" element={<LecturerInfo />} />
        <Route path="/dashboard/student/notices" element={<Notices />} />
        <Route path="/dashboard/student/profile" element={<Profile />} />
        <Route path="/dashboard/student/transcript" element={<Transcript />} />
        <Route path="/dashboard/student/analytics" element={<PerformanceAnalytics />} />

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