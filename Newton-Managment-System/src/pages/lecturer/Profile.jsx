import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Lock,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordBox, setShowPasswordBox] = useState(false);

  const [profile, setProfile] = useState({
    name: "Lecturer John",
    department: "Computer Science Department",
    email: "lecturer@school.com",
    phone: "+254 700 000 000",
    location: "Nairobi, Kenya",
    role: "Senior Lecturer",
  });

  const [form, setForm] = useState(profile);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSave = () => {
    setProfile(form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm(profile);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* PROFILE CARD */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">

              <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center font-bold text-green-700">
                {initials}
              </div>

              <div>
                {isEditing ? (
                  <input
                    className="text-xl font-bold border px-2 py-1 rounded"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                ) : (
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                )}

                <p className="text-sm text-gray-500">{profile.department}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg"
                >
                  <Edit size={16} /> Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    <X size={16} /> Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg"
                  >
                    <Save size={16} /> Save
                  </button>
                </>
              )}
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">

            <div className="flex items-center gap-2">
              <Mail size={16} />
              {isEditing ? (
                <input
                  className="border px-2 py-1 rounded w-full"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              ) : (
                profile.email
              )}
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              {isEditing ? (
                <input
                  className="border px-2 py-1 rounded w-full"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              ) : (
                profile.phone
              )}
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {isEditing ? (
                <input
                  className="border px-2 py-1 rounded w-full"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              ) : (
                profile.location
              )}
            </div>

            <div className="flex items-center gap-2">
              <User size={16} />
              {profile.role}
            </div>
          </div>
        </div>

        {/* MINI STATS */}
        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-white border rounded-xl p-4">
            <p className="text-gray-500 text-sm">Courses</p>
            <h3 className="text-2xl font-bold">4</h3>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <p className="text-gray-500 text-sm">Students</p>
            <h3 className="text-2xl font-bold">120</h3>
          </div>

          <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Security</p>
              <h3 className="font-bold">Account</h3>
            </div>

            <button
              onClick={() => setShowPasswordBox(!showPasswordBox)}
              className="text-green-600"
            >
              <Lock size={18} />
            </button>
          </div>
        </div>

        {/* PASSWORD BOX */}
        {showPasswordBox && (
          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-bold mb-2">Change Password</h3>
            <input
              type="password"
              placeholder="New Password"
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Update Password
            </button>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Profile;