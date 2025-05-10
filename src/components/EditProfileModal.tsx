"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSave: (profile: { name: string; email: string; avatar?: string }) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  currentProfile,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: currentProfile.name,
    email: currentProfile.email,
    avatar: currentProfile.avatar,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              {formData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <button
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Change Avatar
            </button>
          </div>

          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-xl border bg-slate-800 text-white placeholder-slate-400 ${
                errors.name
                  ? "border-red-300 focus:border-red-500"
                  : "border-slate-700 focus:border-indigo-500"
              } focus:ring-2 focus:ring-indigo-200 outline-none transition-colors`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-xl border bg-slate-800 text-white placeholder-slate-400 ${
                errors.email
                  ? "border-red-300 focus:border-red-500"
                  : "border-slate-700 focus:border-indigo-500"
              } focus:ring-2 focus:ring-indigo-200 outline-none transition-colors`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
