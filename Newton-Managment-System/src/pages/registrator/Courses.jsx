import React, { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Filter, 
  Settings, 
  ChevronRight, 
  Building2, 
  Layers,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Info
} from "lucide-react";

const RegistrarCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [coursesList, setCoursesList] = useState([
    { 
      code: "CS301", 
      name: "Database Systems", 
      department: "Computer Science", 
      units: 3, 
      level: 300, 
      status: "Active", 
      prerequisites: ["CS201", "CS102"],
      description: "Advanced concepts in database design, SQL, and NoSQL systems."
    },
    { 
      code: "MATH202", 
      name: "Advanced Calculus", 
      department: "Mathematics", 
      units: 4, 
      level: 200, 
      status: "Active", 
      prerequisites: ["MATH101"],
      description: "Multi-variable calculus, vector fields, and integration techniques."
    },
    { 
      code: "ENG101", 
      name: "Intro to Engineering", 
      department: "Civil Engineering", 
      units: 2, 
      level: 100, 
      status: "Inactive", 
      prerequisites: [],
      description: "Foundational principles of engineering and problem solving."
    },
    { 
      code: "NUR205", 
      name: "Clinical Practice I", 
      department: "Nursing", 
      units: 6, 
      level: 200, 
      status: "Active", 
      prerequisites: ["NUR101", "BIO102"],
      description: "Hands-on clinical experience in a hospital environment."
    },
    { 
      code: "BIT101", 
      name: "Intro to Programming", 
      department: "Information Technology", 
      units: 3, 
      level: 100, 
      status: "Active", 
      prerequisites: [],
      description: "Fundamentals of logic, algorithms, and Python programming."
    },
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Course Catalog</h1>
          <p className="text-sm text-gray-500">Manage institutional curriculum, course structures, and credit units</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => {
              setIsExporting(true);
              const tId = toast.loading("Preparing Catalog export...");
              setTimeout(() => {
                toast.success("Catalog exported successfully", { id: tId });
                setIsExporting(false);
              }, 1500);
            }}
            disabled={isExporting}
            className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Download size={16} />
            {isExporting ? "Exporting..." : "Export Catalog"}
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-green-600/20"
          >
            <Plus size={16} />
            Create Course
          </button>
        </div>
      </div>

      {/* Stats / Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-green-100 text-xs font-bold uppercase mb-1">Total Courses</p>
            <h2 className="text-4xl font-bold mb-4 text-white">248</h2>
            <div className="flex items-center gap-2 text-xs text-green-100">
              <CheckCircle size={14} /> 212 Active in Catalog
            </div>
          </div>
          <BookOpen size={120} className="absolute -bottom-10 -right-10 text-white/10 group-hover:scale-110 transition-transform duration-500" />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Curriculum Version</p>
              <h2 className="text-2xl font-bold text-gray-800">v2026.1</h2>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Layers size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 italic">Last updated: April 12, 2026</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Credit Unit Cap</p>
              <h2 className="text-2xl font-bold text-gray-800">24 Units</h2>
            </div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <Settings size={20} />
            </div>
          </div>
          <button 
            onClick={() => toast.success('Configuration modal opened')}
            className="text-xs font-bold text-green-600 hover:underline mt-4 w-fit flex items-center gap-1"
          >
            Configure Rules <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by course name or code..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-green-500 rounded-xl focus:outline-none transition text-sm shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm font-medium focus:outline-none">
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Engineering</option>
            <option>Nursing</option>
          </select>
          <select className="px-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm font-medium focus:outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button 
            onClick={() => toast.success('Filters applied')}
            className="p-2.5 bg-gray-50 text-gray-500 hover:text-green-600 rounded-xl transition border border-transparent hover:border-gray-200"
          >
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Course Info</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Department</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Units / Level</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Prerequisites</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coursesList.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase())).map((course, i) => (
                <tr key={i} className="hover:bg-green-50/20 transition group">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-green-600 transition">
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{course.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 bg-gray-100 w-fit px-1.5 rounded mb-1">{course.code}</p>
                        <p className="text-[11px] text-gray-400 line-clamp-1 max-w-xs">{course.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Building2 size={14} className="text-gray-400" />
                      <span className="font-medium text-xs">{course.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-700">{course.units} Credit Units</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Level {course.level}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {course.prerequisites.length > 0 ? (
                        course.prerequisites.map(p => (
                          <span key={p} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[10px] font-bold">
                            {p}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic text-[10px]">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {course.status === 'Active' ? (
                        <CheckCircle size={14} className="text-green-500" />
                      ) : (
                        <XCircle size={14} className="text-red-500" />
                      )}
                      <span className={`text-[10px] font-bold uppercase ${course.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {course.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsInfoModalOpen(true);
                        }}
                        className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-green-600 border border-transparent hover:border-gray-100"
                      >
                        <Info size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsEditModalOpen(true);
                        }}
                        className="p-2 hover:bg-white rounded-lg transition text-gray-400 hover:text-blue-600 border border-transparent hover:border-gray-100"
                      >
                        <Settings size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Create Course</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <XCircle size={24} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const formData = new FormData(e.target);
              
              const newCourse = {
                code: formData.get("code").toUpperCase(),
                name: formData.get("name"),
                department: "Computer Science", // simplified for demo
                units: parseInt(formData.get("units")),
                level: parseInt(formData.get("level")),
                status: "Active",
                prerequisites: [],
                description: "Newly added course."
              };

              // Validation
              if (coursesList.some(c => c.code === newCourse.code)) {
                toast.error("Course code already exists!");
                setIsSubmitting(false);
                return;
              }

              setTimeout(() => {
                setCoursesList(prev => [newCourse, ...prev]);
                toast.success("New course created successfully!");
                setIsSubmitting(false);
                setIsAddModalOpen(false);
              }, 1000);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Course Code</label>
                  <input required name="code" type="text" placeholder="e.g. CS101" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition uppercase" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Course Name</label>
                  <input required name="name" type="text" placeholder="e.g. Intro to Computer Science" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Credit Units</label>
                    <input required name="units" type="number" min="1" max="10" placeholder="3" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Level</label>
                    <select required name="level" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition shadow-lg shadow-green-600/20 disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? "Saving..." : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {isEditModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsEditModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Course</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <XCircle size={24} />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsSubmitting(true);
              const formData = new FormData(e.target);
              
              const updatedCourse = {
                ...selectedCourse,
                name: formData.get("name"),
                units: parseInt(formData.get("units")),
                level: parseInt(formData.get("level")),
                status: formData.get("status")
              };

              setTimeout(() => {
                setCoursesList(prev => prev.map(c => c.code === selectedCourse.code ? updatedCourse : c));
                toast.success("Course updated successfully!");
                setIsSubmitting(false);
                setIsEditModalOpen(false);
              }, 1000);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Course Code</label>
                  <input type="text" value={selectedCourse.code} disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl transition uppercase text-gray-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Course Name</label>
                  <input required name="name" type="text" defaultValue={selectedCourse.name} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Credit Units</label>
                    <input required name="units" type="number" min="1" max="10" defaultValue={selectedCourse.units} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Level</label>
                    <select required name="level" defaultValue={selectedCourse.level} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Status</label>
                  <select required name="status" defaultValue={selectedCourse.status} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition text-gray-700">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {isInfoModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4" onClick={() => setIsInfoModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl"><BookOpen size={24} /></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedCourse.code}</h3>
                  <span className={`text-[10px] font-bold uppercase ${selectedCourse.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{selectedCourse.status}</span>
                </div>
              </div>
              <button onClick={() => setIsInfoModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Course Name</p>
                <p className="font-medium text-gray-800">{selectedCourse.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Description</p>
                <p className="text-gray-600 leading-relaxed">{selectedCourse.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Department</p>
                  <p className="font-medium text-gray-800">{selectedCourse.department}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Level / Units</p>
                  <p className="font-medium text-gray-800">Level {selectedCourse.level} • {selectedCourse.units} Units</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Prerequisites</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedCourse.prerequisites.length > 0 ? (
                    selectedCourse.prerequisites.map(p => (
                      <span key={p} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">{p}</span>
                    ))
                  ) : (
                    <span className="text-gray-500 italic text-xs">No prerequisites</span>
                  )}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsInfoModalOpen(false)}
              className="w-full mt-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RegistrarCourses;
