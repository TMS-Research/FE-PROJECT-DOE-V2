"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CircleAnimationOverlay from "@/components/circle-animation-overlay";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setIsLoading(true);

    try {
      // Here you would implement your actual registration logic
      // For now, we'll just simulate registration with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Redirect to dashboard after successful registration
      router.push("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-50">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <CircleAnimationOverlay />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Join Project Doe</h1>
          <p className="text-slate-500">Create your account to start learning</p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl shadow-violet-200/50 border border-violet-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block text-slate-700 font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-slate-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block text-slate-700 font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-slate-500">
                Password must be at least 8 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium shadow-lg shadow-violet-200/50 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-600 font-medium hover:text-violet-700">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
