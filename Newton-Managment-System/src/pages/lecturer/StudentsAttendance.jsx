import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  Users, 
  Check, 
  X, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  Clock,
  UserCheck,
  UserX,
  BarChart3,
  ChevronDown,
  Printer,
  Mail,
  AlertCircle,
  Percent,
  TrendingUp,
  Eye
} from "lucide-react";

const StudentsAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [showStats, setShowStats] = useState(true);
  
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", regNo: "CS/2024/001", status: "Present", time: "08:30 AM", year: "2nd", course: "Computer Science", attendance: 92 },
    { id: 2, name: "Mary Wanjiku", regNo: "CS/2024/002", status: "Absent", time: "--", year: "2nd", course: "Computer Science", attendance: 78 },
    { id: 3, name: "Peter Kimani", regNo: "CS/2024/003", status: "Present", time: "08:45 AM", year: "2nd", course: "Computer Science", attendance: 95 },
    { id: 4, name: "Sarah Odhiambo", regNo: "CS/2024/004", status: "Present", time: "08:20 AM", year: "3rd", course: "Computer Science", attendance: 88 },
    { id: 5, name: "James Mwangi", regNo: "CS/2024/005", status: "Absent", time: "--", year: "1st", course: "Information Technology", attendance: 65 },
    { id: 6, name: "Grace Achieng", regNo: "CS/2024/006", status: "Present", time: "08:35 AM", year: "2nd", course: "Computer Science", attendance: 91 },
    { id: 7, name: "Brian Otieno", regNo: "CS/2024/007", status: "Late", time: "09:15 AM", year: "3rd", course: "Information Technology", attendance: 72 },
    { id: 8, name: "Faith Muthoni", regNo: "CS/2024/008", status: "Present", time: "08:25 AM", year: "1st", course: "Computer Science", attendance: 96 },
  ]);

  const courses = ["all", "Computer Science", "Information Technology"];
  const years = ["all", "1st", "2nd", "3rd", "4th"];

  const stats = {
    total: students.length,
    present: students.filter(s => s.status === "Present").length,
    absent: students.filter(s => s.status === "Absent").length,
    late: students.filter(s => s.status === "Late").length,
    attendanceRate: Math.round((students.filter(s => s.status === "Present").length / students.length) * 100)
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.regNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse;
    const matchesYear = selectedYear === "all" || student.year === selectedYear;
    return matchesSearch && matchesCourse && matchesYear;
  });

  const updateStudentStatus = (id, newStatus) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { 
            ...student, 
            status: newStatus, 
            time: newStatus !== "Absent" ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--" 
          } 
        : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({
      ...student,
      status: "Present",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })));
  };

  const resetAttendance = () => {
    setStudents(students.map(student => ({
      ...student,
      status: "Absent",
      time: "--"
    })));
  };

  const exportAttendance = () => {
    const csvData = filteredStudents.map(s => `${s.name},${s.regNo},${s.status},${s.time},${s.course},${s.year}`);
    const csvContent = "Name,Registration No,Status,Time,Course,Year\n" + csvData.join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Present": return <Check size={16} />;
      case "Absent": return <X size={16} />;
      case "Late": return <Clock size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Present": return "green";
      case "Absent": return "red";
      case "Late": return "yellow";
      default: return "gray";
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 80) return "green";
    if (percentage >= 60) return "yellow";
    return "red";
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HEADER SECTION */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Users className="text-green-600" size={28} />
                Attendance Management
              </h1>
              <p className="text-gray-500">Track and manage student attendance records</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={markAllPresent}
                className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <UserCheck size={16} />
                Mark All Present
              </button>
              <button 
                onClick={resetAttendance}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <UserX size={16} />
                Reset All
              </button>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users size={20} className="text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Students</p>
            <p className="text-xs text-gray-400 mt-1">Enrolled this semester</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <Check size={20} className="text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{stats.present}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Present</p>
            <p className="text-xs text-green-600 mt-1">{Math.round((stats.present/stats.total)*100)}% of total</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-red-50 rounded-xl">
                <X size={20} className="text-red-600" />
              </div>
              <span className="text-2xl font-bold text-red-600">{stats.absent}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Absent</p>
            <p className="text-xs text-red-600 mt-1">{Math.round((stats.absent/stats.total)*100)}% of total</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-yellow-600">{stats.late}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Late Arrivals</p>
            <p className="text-xs text-yellow-600 mt-1">Arrived after time</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-200 rounded-xl">
                <Percent size={20} className="text-green-700" />
              </div>
              <span className="text-2xl font-bold text-green-700">{stats.attendanceRate}%</span>
            </div>
            <p className="text-sm text-gray-700 font-medium">Attendance Rate</p>
            <p className="text-xs text-green-700 mt-1">Overall percentage</p>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Search size={16} />
                Search Student
              </label>
              <input
                type="text"
                placeholder="Name or Registration No..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Course Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Filter size={16} />
                Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {courses.map(course => (
                  <option key={course} value={course}>
                    {course === "all" ? "All Courses" : course}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Filter size={16} />
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === "all" ? "All Years" : `${year} Year`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button 
              onClick={exportAttendance}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
              <Printer size={16} />
              Print
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center gap-2">
              <Mail size={16} />
              Send Report
            </button>
          </div>
        </div>

        {/* ATTENDANCE TABLE */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Registration No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Attendance %</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student, index) => {
                  const statusColor = getStatusColor(student.status);
                  const attendanceColor = getAttendanceColor(student.attendance);
                  
                  return (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-semibold">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-800">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.regNo}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.course}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                          {student.year} Year
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{student.time}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={student.status}
                            onChange={(e) => updateStudentStatus(student.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 focus:ring-2 focus:ring-offset-1 transition-all ${
                              statusColor === "green" ? "border-green-300 text-green-700 bg-green-50" :
                              statusColor === "red" ? "border-red-300 text-red-700 bg-red-50" :
                              "border-yellow-300 text-yellow-700 bg-yellow-50"
                            }`}
                          >
                            <option value="Present">✓ Present</option>
                            <option value="Absent">✗ Absent</option>
                            <option value="Late">⌚ Late</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-16">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                attendanceColor === "green" ? "bg-green-500" :
                                attendanceColor === "yellow" ? "bg-yellow-500" :
                                "bg-red-500"
                              }`}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                          <span className={`text-xs font-semibold ${
                            attendanceColor === "green" ? "text-green-600" :
                            attendanceColor === "yellow" ? "text-yellow-600" :
                            "text-red-600"
                          }`}>
                            {student.attendance}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye size={16} className="text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredStudents.length} of {students.length} students
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY SECTION */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-600" />
              Attendance Summary
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Present</span>
                  <span className="text-green-600">{stats.present} students</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(stats.present/stats.total)*100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Absent</span>
                  <span className="text-red-600">{stats.absent} students</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(stats.absent/stats.total)*100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Late</span>
                  <span className="text-yellow-600">{stats.late} students</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(stats.late/stats.total)*100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <AlertCircle size={18} />
              Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Click on student status to mark attendance</li>
              <li>• Use filters to find specific students</li>
              <li>• Export data for record keeping</li>
              <li>• Late arrivals marked separately</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentsAttendance;