import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  TrendingUp,
  Award,
  BarChart3,
  Target,
  LineChart,
  PieChart,
  Download,
  Calendar,
  Filter,
  ChevronRight,
  Star,
  AlertCircle,
  CheckCircle,
  TrendingDown,
  Activity,
  Brain,
  Clock,
  Users,
  BookOpen,
  Zap
} from "lucide-react";

const PerformanceAnalytics = () => {
  const [timeRange, setTimeRange] = useState("semester"); // semester, year, all
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showPredictions, setShowPredictions] = useState(false);
  const [activeChart, setActiveChart] = useState("overview");

  const stats = [
    {
      label: "Current GPA",
      value: "3.6",
      change: "+0.2",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "up",
      description: "Above class average"
    },
    {
      label: "Average Score",
      value: "78%",
      change: "+5%",
      icon: BarChart3,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "up",
      description: "Top 25% of class"
    },
    {
      label: "Best Subject",
      value: "CS101",
      change: "A-",
      icon: Award,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "stable",
      description: "Consistent performer"
    },
    {
      label: "Goal Progress",
      value: "82%",
      change: "+12%",
      icon: Target,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "up",
      description: "On track to exceed goal"
    },
  ];

  const subjects = [
    { 
      id: 1,
      name: "CS101 - Programming", 
      code: "CS101",
      score: 85, 
      grade: "A-",
      trend: "+8%",
      credits: 3,
      attendance: 92,
      rank: "Top 10",
      performance: "Excellent",
      assignments: [90, 85, 88, 92],
      examScores: [82, 88, 85],
      trendData: [75, 78, 82, 85]
    },
    { 
      id: 2,
      name: "CS201 - Databases", 
      code: "CS201",
      score: 72, 
      grade: "B",
      trend: "+3%",
      credits: 3,
      attendance: 85,
      rank: "Top 30",
      performance: "Good",
      assignments: [80, 75, 72, 78],
      examScores: [70, 75, 72],
      trendData: [68, 70, 71, 72]
    },
    { 
      id: 3,
      name: "CS301 - Networking", 
      code: "CS301",
      score: 78, 
      grade: "B+",
      trend: "+6%",
      credits: 3,
      attendance: 78,
      rank: "Top 20",
      performance: "Good",
      assignments: [85, 80, 78, 82],
      examScores: [75, 80, 78],
      trendData: [70, 73, 76, 78]
    },
    { 
      id: 4,
      name: "MATH202 - Mathematics", 
      code: "MATH202",
      score: 80, 
      grade: "A-",
      trend: "+10%",
      credits: 3,
      attendance: 95,
      rank: "Top 15",
      performance: "Excellent",
      assignments: [88, 85, 82, 85],
      examScores: [78, 82, 80],
      trendData: [72, 75, 78, 80]
    },
    { 
      id: 5,
      name: "PHY101 - Physics", 
      code: "PHY101",
      score: 68, 
      grade: "C+",
      trend: "-2%",
      credits: 2,
      attendance: 70,
      rank: "Top 60",
      performance: "Needs Improvement",
      assignments: [70, 65, 68, 66],
      examScores: [65, 68, 68],
      trendData: [70, 69, 68, 68]
    },
    { 
      id: 6,
      name: "ENG202 - Technical Writing", 
      code: "ENG202",
      score: 88, 
      grade: "A",
      trend: "+15%",
      credits: 2,
      attendance: 88,
      rank: "Top 5",
      performance: "Outstanding",
      assignments: [90, 88, 92, 85],
      examScores: [85, 90, 88],
      trendData: [75, 80, 85, 88]
    },
  ];

  const semesterData = [
    { semester: "Sem 1", gpa: 3.2, avgScore: 72 },
    { semester: "Sem 2", gpa: 3.4, avgScore: 75 },
    { semester: "Sem 3", gpa: 3.5, avgScore: 77 },
    { semester: "Sem 4", gpa: 3.6, avgScore: 78 },
  ];

  const predictions = {
    predictedGPA: 3.8,
    confidence: "85%",
    recommendations: [
      "Focus more on Physics to improve overall GPA",
      "Maintain current performance in Programming",
      "Consider joining study groups for Mathematics"
    ],
    atRiskSubjects: ["PHY101"],
    improvementAreas: ["Physics Lab", "Database Theory"]
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-700";
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-700";
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getPerformanceIcon = (trend) => {
    if (trend.includes("+")) return <TrendingUp size={14} className="text-green-600" />;
    if (trend.includes("-")) return <TrendingDown size={14} className="text-red-600" />;
    return <Activity size={14} className="text-gray-600" />;
  };

  const calculateOverallStats = () => {
    const avgScore = subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length;
    const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
    const avgAttendance = subjects.reduce((sum, s) => sum + s.attendance, 0) / subjects.length;
    return { avgScore, totalCredits, avgAttendance };
  };

  const overallStats = calculateOverallStats();

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Performance Analytics</h1>
            <p className="text-gray-500">Track your academic performance with detailed analytics and insights</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition flex items-center gap-2">
              <Download size={16} />
              Export Report
            </button>
            <button 
              onClick={() => setShowPredictions(!showPredictions)}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm hover:bg-purple-700 transition flex items-center gap-2"
            >
              <Brain size={16} />
              AI Predictions
            </button>
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="flex gap-2">
          {["semester", "year", "all"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                timeRange === range
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${s.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={s.color} size={22} />
                </div>
                <span className={`text-xs font-medium ${
                  s.trend === "up" ? "text-green-600" : s.trend === "down" ? "text-red-600" : "text-gray-600"
                }`}>
                  {s.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <h2 className="text-2xl font-bold text-gray-800">{s.value}</h2>
                <p className="text-xs text-gray-400 mt-1">{s.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-200">
        {[
          { id: "overview", label: "Performance Overview", icon: LineChart },
          { id: "subjects", label: "Subject Analysis", icon: BarChart3 },
          { id: "trends", label: "Trends", icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                activeChart === tab.id
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Charts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
        {activeChart === "overview" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <LineChart size={18} />
                GPA & Score Trends
              </h3>
              <div className="flex gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>GPA</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Average Score</span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">
              <div className="text-center">
                <LineChart size={48} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Interactive chart would appear here</p>
                <p className="text-xs">Use a charting library like Recharts or Chart.js</p>
              </div>
            </div>
          </>
        )}

        {activeChart === "subjects" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <BarChart3 size={18} />
                Subject Performance Comparison
              </h3>
              <select className="px-2 py-1 text-sm border border-gray-200 rounded-lg">
                <option>Score (%)</option>
                <option>Attendance (%)</option>
                <option>Credits</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">
              <div className="text-center">
                <BarChart3 size={48} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Bar chart visualization would appear here</p>
              </div>
            </div>
          </>
        )}

        {activeChart === "trends" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <TrendingUp size={18} />
                Performance Trends by Subject
              </h3>
              <select className="px-2 py-1 text-sm border border-gray-200 rounded-lg">
                {subjects.map(s => (
                  <option key={s.id}>{s.code}</option>
                ))}
              </select>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">
              <div className="text-center">
                <TrendingUp size={48} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Line chart for subject trends would appear here</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Subject Performance Breakdown */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen size={18} />
          Detailed Subject Performance
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="py-3 px-3">Subject</th>
                <th className="py-3 px-3">Code</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3">Grade</th>
                <th className="py-3 px-3">Trend</th>
                <th className="py-3 px-3">Credits</th>
                <th className="py-3 px-3">Attendance</th>
                <th className="py-3 px-3">Performance</th>
                <th className="py-3 px-3">Actions</th>
               </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr 
                  key={subject.id} 
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedSubject(subject)}
                >
                  <td className="py-3 px-3 font-medium text-gray-800">{subject.name}</td>
                  <td className="py-3 px-3 text-gray-600">{subject.code}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{subject.score}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 rounded-full h-1.5"
                          style={{ width: `${subject.score}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getGradeColor(subject.grade)}`}>
                      {subject.grade}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      {getPerformanceIcon(subject.trend)}
                      <span className="text-sm text-gray-600">{subject.trend}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-gray-600">{subject.credits}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{subject.attendance}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`rounded-full h-1.5 ${
                            subject.attendance >= 80 ? "bg-green-500" : 
                            subject.attendance >= 60 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${subject.attendance}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      subject.performance === "Excellent" ? "bg-green-100 text-green-700" :
                      subject.performance === "Good" ? "bg-blue-100 text-blue-700" :
                      subject.performance === "Outstanding" ? "bg-purple-100 text-purple-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {subject.performance}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button className="text-green-600 hover:text-green-700">
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-blue-800">Average Score</h4>
            <Target size={20} className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-900">{overallStats.avgScore.toFixed(1)}%</p>
          <p className="text-xs text-blue-700 mt-2">Above class average by 5%</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-green-800">Total Credits</h4>
            <Award size={20} className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-900">{overallStats.totalCredits}</p>
          <p className="text-xs text-green-700 mt-2">Earned this semester</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-purple-800">Average Attendance</h4>
            <Users size={20} className="text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-900">{overallStats.avgAttendance.toFixed(1)}%</p>
          <p className="text-xs text-purple-700 mt-2">Good standing</p>
        </div>
      </div>

      {/* AI Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={20} className="text-green-600" />
            <h3 className="font-semibold text-green-800">AI-Powered Insights</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-0.5" />
              <p className="text-sm text-green-700">
                Your performance has improved by 8% compared to last semester
              </p>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp size={16} className="text-blue-600 mt-0.5" />
              <p className="text-sm text-green-700">
                Programming and Mathematics are your strongest subjects
              </p>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-yellow-600 mt-0.5" />
              <p className="text-sm text-green-700">
                Physics requires additional attention to improve your GPA
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Star size={16} className="text-purple-600 mt-0.5" />
              <p className="text-sm text-green-700">
                You're in the top 20% of your class overall
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={20} className="text-purple-600" />
            <h3 className="font-semibold text-purple-800">Recommendations</h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-xl">
              <p className="text-sm font-medium text-gray-800 mb-1">📚 Study Focus</p>
              <p className="text-xs text-gray-600">Dedicate 2 extra hours per week to Physics</p>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <p className="text-sm font-medium text-gray-800 mb-1">👥 Group Study</p>
              <p className="text-xs text-gray-600">Join study groups for Database Systems</p>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <p className="text-sm font-medium text-gray-800 mb-1">🎯 Goal Setting</p>
              <p className="text-xs text-gray-600">Target: Achieve 85% average by end of semester</p>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <p className="text-sm font-medium text-gray-800 mb-1">📈 Improvement Plan</p>
              <p className="text-xs text-gray-600">Complete additional practice problems weekly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Details Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedSubject(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{selectedSubject.name}</h3>
              <button onClick={() => setSelectedSubject(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">Current Score</p>
                  <p className="text-2xl font-bold text-gray-800">{selectedSubject.score}%</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">Grade</p>
                  <p className={`text-2xl font-bold ${getGradeColor(selectedSubject.grade)}`}>
                    {selectedSubject.grade}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">Attendance</p>
                  <p className="text-2xl font-bold text-gray-800">{selectedSubject.attendance}%</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">Class Rank</p>
                  <p className="text-2xl font-bold text-gray-800">{selectedSubject.rank}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Assignment Scores</h4>
                <div className="flex gap-2">
                  {selectedSubject.assignments.map((score, i) => (
                    <div key={i} className="flex-1 p-2 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500">A{i+1}</p>
                      <p className="text-sm font-semibold text-gray-800">{score}%</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Exam Performance</h4>
                <div className="flex gap-2">
                  {selectedSubject.examScores.map((score, i) => (
                    <div key={i} className="flex-1 p-2 bg-gray-50 rounded-lg text-center">
                      <p className="text-xs text-gray-500">Exam {i+1}</p>
                      <p className="text-sm font-semibold text-gray-800">{score}%</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl">
                <h4 className="font-semibold text-green-800 mb-2">AI Recommendation</h4>
                <p className="text-sm text-green-700">
                  {selectedSubject.performance === "Excellent" 
                    ? "Keep up the great work! Consider helping peers in study groups."
                    : selectedSubject.performance === "Good"
                    ? "You're on the right track. Focus on improving weak areas identified in assignments."
                    : "Dedicate additional time to this subject. Consider tutoring or extra practice."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Predictions Modal */}
      {showPredictions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPredictions(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Brain size={20} />
                  AI Performance Predictions
                </h3>
                <button onClick={() => setShowPredictions(false)}>✕</button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-sm text-purple-600 mb-1">Predicted GPA</p>
                  <p className="text-3xl font-bold text-purple-900">{predictions.predictedGPA}</p>
                  <p className="text-xs text-purple-600">Confidence: {predictions.confidence}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Recommendations</p>
                  <ul className="space-y-2">
                    {predictions.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Areas Needing Improvement</p>
                  <div className="flex gap-2">
                    {predictions.improvementAreas.map((area, i) => (
                      <span key={i} className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700">
                  Generate Detailed Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PerformanceAnalytics;