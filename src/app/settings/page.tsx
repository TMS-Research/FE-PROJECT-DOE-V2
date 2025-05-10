"use client";

import EditProfileModal from "@/components/EditProfileModal";
import { Bell, Brain, Lock, Shield, Star, User, Zap } from "lucide-react";
import { useState } from "react";

interface Profile {
  name: string;
  email: string;
  avatar?: string;
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    // Here you would typically make an API call to update the profile in your backend
    console.log("Profile updated:", updatedProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      {/* Decorative background elements */}
      <div className="absolute left-20 top-20 w-40 h-40 bg-purple-200/10 rounded-full blur-xl"></div>
      <div className="absolute right-40 bottom-20 w-60 h-60 bg-blue-300/10 rounded-full blur-xl"></div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Settings</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-100/50 mb-8">
          <h2 className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            Profile
          </h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{profile.name}</h3>
              <p className="text-slate-500">{profile.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-indigo-600 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        {/* XP & Achievements Section */}
        <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-100/50 mb-8">
          <h2 className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            XP Level & Achievements
          </h2>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600">Level 5</span>
              <span className="text-slate-600">750/1000 XP</span>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[75%] h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">Quick Learner</span>
              </div>
              <p className="text-sm text-amber-700">Complete 5 lessons in one day</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">Knowledge Seeker</span>
              </div>
              <p className="text-sm text-amber-700">Study for 10 hours total</p>
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-100/50">
          <h2 className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            Account Settings
          </h2>
          <div className="space-y-4">
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-700">Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-14 h-7 rounded-full transition-colors ${
                  notifications ? "bg-indigo-500" : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                    notifications ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Focus Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-700">Focus Mode</span>
              </div>
              <button
                onClick={() => setFocusMode(!focusMode)}
                className={`w-14 h-7 rounded-full transition-colors ${
                  focusMode ? "bg-indigo-500" : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                    focusMode ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentProfile={profile}
        onSave={handleProfileUpdate}
      />
    </div>
  );
}
