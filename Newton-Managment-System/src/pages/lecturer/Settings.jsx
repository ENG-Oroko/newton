import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  Settings,
  Bell,
  Moon,
  Sun,
  Lock,
  Eye,
  EyeOff,
  Save,
  Globe,
  User,
  Shield,
  Smartphone,
  Mail,
  CheckCircle,
  AlertCircle,
  X,
  RefreshCw,
  Volume2,
  VolumeX,
  Monitor,
  Palette,
  Key,
  LogOut,
  Download,
  Trash2
} from "lucide-react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    darkMode: false,
    compactMode: false,
    language: "en",
    timezone: "Africa/Nairobi"
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(null);
  const [activeSection, setActiveSection] = useState("notifications");

  const sections = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "password", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Globe }
  ];

  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    showNotificationMessage(`${key} ${!settings[key] ? "enabled" : "disabled"}`, "info");
  };

  const showNotificationMessage = (message, type) => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handlePasswordChange = () => {
    if (!password.current || !password.new || !password.confirm) {
      showNotificationMessage("Please fill in all password fields", "error");
      return;
    }
    
    if (password.new !== password.confirm) {
      showNotificationMessage("New passwords do not match", "error");
      return;
    }
    
    if (password.new.length < 8) {
      showNotificationMessage("Password must be at least 8 characters", "error");
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showNotificationMessage("Password updated successfully!", "success");
      setPassword({ current: "", new: "", confirm: "" });
    }, 1000);
  };

  const handleSaveAllSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showNotificationMessage("All settings saved successfully!", "success");
    }, 1000);
  };

  const handleExportSettings = () => {
    const exportData = {
      settings,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `settings_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotificationMessage("Settings exported successfully!", "success");
  };

  const getPasswordStrength = () => {
    const pwd = password.new;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/[0-9]/)) strength++;
    if (pwd.match(/[^a-zA-Z0-9]/)) strength++;
    
    if (strength === 0) return { text: "Very Weak", color: "text-red-600", bg: "bg-red-100" };
    if (strength === 1) return { text: "Weak", color: "text-orange-600", bg: "bg-orange-100" };
    if (strength === 2) return { text: "Medium", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (strength === 3) return { text: "Strong", color: "text-green-600", bg: "bg-green-100" };
    return { text: "Very Strong", color: "text-emerald-600", bg: "bg-emerald-100" };
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
        enabled ? "bg-green-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  const SectionButton = ({ section }) => {
    const IconComponent = section.icon;
    return (
      <button
        onClick={() => setActiveSection(section.id)}
        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
          activeSection === section.id
            ? "bg-green-50 text-green-700 shadow-sm border-l-4 border-green-600"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <IconComponent size={18} />
        <span className="font-medium">{section.label}</span>
      </button>
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Notification Toast */}
        {showNotification && (
          <div className="fixed top-20 right-4 z-50 animate-slide-in">
            <div className={`rounded-lg shadow-lg p-4 ${
              showNotification.type === "success" ? "bg-green-50 border border-green-200" :
              showNotification.type === "error" ? "bg-red-50 border border-red-200" :
              "bg-blue-50 border border-blue-200"
            }`}>
              <div className="flex items-center gap-2">
                {showNotification.type === "success" && <CheckCircle size={18} className="text-green-600" />}
                {showNotification.type === "error" && <AlertCircle size={18} className="text-red-600" />}
                <span className="text-sm font-medium">{showNotification.message}</span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                <Settings size={24} className="text-green-600" />
                Account Settings
              </h2>
              <p className="text-gray-500 text-sm mt-1">Manage your account preferences and security</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportSettings}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
              >
                <Download size={16} />
                Export
              </button>
              <button
                onClick={handleSaveAllSettings}
                disabled={isSaving}
                className="px-5 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-2 shadow-md"
              >
                {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                Save All
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sticky top-24">
              <div className="space-y-1">
                {sections.map((section) => (
                  <SectionButton key={section.id} section={section} />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 text-red-600 hover:bg-red-50">
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* NOTIFICATIONS SECTION */}
            {activeSection === "notifications" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <Bell size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Notification Preferences</h3>
                    <p className="text-sm text-gray-500">Choose how you want to receive updates</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">Email Notifications</p>
                      <p className="text-xs text-gray-500">Receive important updates via email</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.emailNotifications}
                      onChange={() => toggle("emailNotifications")}
                    />
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">SMS Notifications</p>
                      <p className="text-xs text-gray-500">Get text messages for urgent alerts</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.smsNotifications}
                      onChange={() => toggle("smsNotifications")}
                    />
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">Push Notifications</p>
                      <p className="text-xs text-gray-500">Browser notifications for real-time updates</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.pushNotifications}
                      onChange={() => toggle("pushNotifications")}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* APPEARANCE SECTION */}
            {activeSection === "appearance" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-50 rounded-xl">
                    <Palette size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Appearance Settings</h3>
                    <p className="text-sm text-gray-500">Customize how the dashboard looks</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      {settings.darkMode ? <Moon size={18} className="text-gray-700" /> : <Sun size={18} className="text-yellow-500" />}
                      <div>
                        <p className="font-medium text-gray-800">Dark Mode</p>
                        <p className="text-xs text-gray-500">Switch between light and dark theme</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.darkMode}
                      onChange={() => toggle("darkMode")}
                    />
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Monitor size={18} className="text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-800">Compact Mode</p>
                        <p className="text-xs text-gray-500">Reduce spacing for more content</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.compactMode}
                      onChange={() => toggle("compactMode")}
                    />
                  </div>

                  {/* Theme Preview */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-2">Theme Preview</p>
                    <div className="flex gap-3">
                      <div className="flex-1 h-20 bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                        <div className="w-full h-2 bg-green-600 rounded mb-1"></div>
                        <div className="w-3/4 h-1 bg-gray-300 rounded"></div>
                      </div>
                      <div className="flex-1 h-20 bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-2">
                        <div className="w-full h-2 bg-green-500 rounded mb-1"></div>
                        <div className="w-3/4 h-1 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY SECTION */}
            {activeSection === "password" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-50 rounded-xl">
                    <Lock size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Security Settings</h3>
                    <p className="text-sm text-gray-500">Change your password and security preferences</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        placeholder="Enter current password"
                        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        value={password.current}
                        onChange={(e) => setPassword({ ...password, current: e.target.value })}
                      />
                      <button
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        placeholder="Enter new password"
                        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        value={password.new}
                        onChange={(e) => setPassword({ ...password, new: e.target.value })}
                      />
                      <button
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {password.new && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                getPasswordStrength().bg.replace('bg-', 'bg-')
                              }`}
                              style={{ width: `${(getPasswordStrength().text === "Very Weak" ? 25 : 
                                                getPasswordStrength().text === "Weak" ? 50 :
                                                getPasswordStrength().text === "Medium" ? 75 : 100)}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${getPasswordStrength().color}`}>
                            {getPasswordStrength().text}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Use 8+ characters with mix of letters, numbers & symbols</p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        value={password.confirm}
                        onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                      />
                      <button
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {password.confirm && password.new !== password.confirm && (
                      <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                    )}
                    {password.confirm && password.new === password.confirm && password.new && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle size={12} />
                        Passwords match
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    disabled={isSaving}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2.5 rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Key size={16} />}
                    Update Password
                  </button>

                  {/* Security Tips */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Shield size={14} />
                      Security Tips
                    </h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Never share your password with anyone</li>
                      <li>• Use a unique password for this account</li>
                      <li>• Enable two-factor authentication for extra security</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* PREFERENCES SECTION */}
            {activeSection === "preferences" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-50 rounded-xl">
                    <Globe size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Preferences</h3>
                    <p className="text-sm text-gray-500">Configure your regional and display settings</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Language Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                      value={settings.language}
                      onChange={(e) => setSettings({...settings, language: e.target.value})}
                    >
                      <option value="en">English</option>
                      <option value="sw">Swahili</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>

                  {/* Timezone Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select
                      className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                      value={settings.timezone}
                      onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    >
                      <option value="Africa/Nairobi">Africa/Nairobi (GMT+3)</option>
                      <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                      <option value="Africa/Johannesburg">Africa/Johannesburg (GMT+2)</option>
                      <option value="Europe/London">Europe/London (GMT+0)</option>
                    </select>
                  </div>

                  {/* Date Format Preview */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 mb-1">Current Date & Time</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date().toLocaleDateString(settings.language === "en" ? "en-US" : "sw-KE", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleTimeString(settings.language === "en" ? "en-US" : "sw-KE")}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Settings are saved locally. Changes will apply across all devices when you sign in.
          </p>
        </div>

        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default SettingsPage;