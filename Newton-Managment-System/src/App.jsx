import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

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
import CollegeAdminDashboard from "./pages/collegeAdmin/CollegeAdminDashboard.jsx";

/* ================= REGISTRATOR PAGES ================= */
import RegistratorDashboard from "./pages/registrator/RegistratorDashboard.jsx";
import RegistrationApprovals from "./pages/registrator/RegistrationApprovals.jsx";
import ResultsApproval from "./pages/registrator/ResultsApproval.jsx";
import RegistrarStudents from "./pages/registrator/Students.jsx";
import RegistrarCourses from "./pages/registrator/Courses.jsx";
import AcademicRecords from "./pages/registrator/AcademicRecords.jsx";
import TranscriptsPage from "./pages/registrator/TranscriptsPage.jsx";
import RegistrarPolicies from "./pages/registrator/Policies.jsx";
import RegistrarReports from "./pages/registrator/Reports.jsx";
import RegistrarProfile from "./pages/registrator/Profile.jsx";

/* ================= SUPER ADMIN PAGES ================= */
import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard.jsx";
import InstitutionOverview from "./pages/superAdmin/Overview.jsx";
import AcademicPerformance from "./pages/superAdmin/AcademicPerformance.jsx";
import FinancialOverview from "./pages/superAdmin/FinancialOverview.jsx";
import StudentsOverview from "./pages/superAdmin/StudentsOverview.jsx";
import StaffManagement from "./pages/superAdmin/StaffManagement.jsx";
import Departments from "./pages/superAdmin/Departments.jsx";
import AuditLogs from "./pages/superAdmin/AuditLogs.jsx";
import SystemReports from "./pages/superAdmin/SystemReports.jsx";
import Overrides from "./pages/superAdmin/Overrides.jsx";
import SystemSettings from "./pages/superAdmin/Settings.jsx";
import SuperAdminProfile from "./pages/superAdmin/Profile.jsx";

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
                <Outlet />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="fees" element={<Fees />} />
          <Route path="results" element={<Results />} />
          <Route path="timetable" element={<StudentTimetable />} />
          <Route path="lecturers" element={<LecturerInfo />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="analytics" element={<PerformanceAnalytics />} />
        </Route>

        {/* ================= LECTURER ================= */}
        <Route
          path="/dashboard/lecturer"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["lecturer"]}>
                <Outlet />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<LecturerDashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="students-attendance" element={<StudentsAttendance />} />
          <Route path="grades-exams" element={<GradesExams />} />
          <Route path="assignments-materials" element={<AssignmentsMaterials />} />
          <Route path="timetable" element={<LecturerTimetable />} />
          <Route path="communication" element={<Communication />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<LecturerProfile />} />
          <Route path="settings" element={<LecturerSettings />} />
        </Route>

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
          path="/dashboard/registrar"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["registrator"]}>
                <Outlet />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<RegistratorDashboard />} />
          <Route path="registration-approvals" element={<RegistrationApprovals />} />
          <Route path="results-approval" element={<ResultsApproval />} />
          <Route path="students" element={<RegistrarStudents />} />
          <Route path="courses" element={<RegistrarCourses />} />
          <Route path="academic-records" element={<AcademicRecords />} />
          <Route path="transcripts" element={<TranscriptsPage />} />
          <Route path="policies" element={<RegistrarPolicies />} />
          <Route path="reports" element={<RegistrarReports />} />
          <Route path="profile" element={<RegistrarProfile />} />
        </Route>

        {/* ================= COLLEGE ADMIN ================= */}
        <Route
          path="/dashboard/college-admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["college_admin"]}>
                <Outlet />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<CollegeAdminDashboard />} />
          <Route path="students" element={<StudentsOverview />} />
          <Route path="teachers" element={<StaffManagement />} />
          <Route path="departments" element={<Departments />} />
          <Route path="classes" element={<AcademicPerformance />} />
          <Route path="reports" element={<SystemReports />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>

        {/* ================= SUPER ADMIN ================= */}
        <Route
          path="/dashboard/director"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["super_admin"]}>
                <Outlet />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="overview" element={<InstitutionOverview />} />
          <Route path="academic-performance" element={<AcademicPerformance />} />
          <Route path="financial-overview" element={<FinancialOverview />} />
          <Route path="students" element={<StudentsOverview />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="departments" element={<Departments />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="reports" element={<SystemReports />} />
          <Route path="overrides" element={<Overrides />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="profile" element={<SuperAdminProfile />} />
        </Route>

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