"use client";

import UploadLoadingOverlay from "@/components/UploadLoadingOverlay";
import { AlertCircle, Award, Book, Brain, Calendar, Calendar as CalendarIcon, ClipboardList, Clock, File, Home, Settings, Sparkles, Star, Upload, User, X } from "lucide-react";
import router from "next/router";
import React, { useState } from "react";

// Add keyframe animation
const animationStyles = `
  @keyframes scaleUp {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-scaleUp {
    animation: scaleUp 0.3s ease-out forwards;
  }

  @keyframes circleExpand {
    from {
      transform: scale(0);
      opacity: 0.7;
    }
    to {
      transform: scale(30);
      opacity: 1;
    }
  }

  .circle-expand {
    animation: circleExpand 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
`;

export default function PlayfulDashboard() {
  // Modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Handle upload completion
  const handleUploadComplete = () => {
    setIsUploading(false);
    router.push("/dashboard/pretest");
  };

  // Handle file drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);

    // Set the homework title based on the file name (remove extension)
    const fileName = file.name;
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');

    // Only update title if it's currently empty
    if (!homeworkTitle.trim()) {
      setHomeworkTitle(fileNameWithoutExtension);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!homeworkTitle.trim()) {
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }

    if (!deadline) {
      setDeadlineError(true);
      hasError = true;
    } else {
      setDeadlineError(false);
    }

    if (!uploadedFile) {
      hasError = true;
    }

    if (!hasError) {
      // Show loading overlay
      setIsUploading(true);
      setShowUploadModal(false);

      // Simulate upload process
      setTimeout(() => {
        resetForm();
      }, 15000); // 15 seconds to see all the messages cycle
    }
  };

  const resetForm = () => {
    setUploadedFile(null);
    setHomeworkTitle("");
    setDeadline("");
    setTitleError(false);
    setDeadlineError(false);
  };

  // Mock user data
  const user = {
    name: "Ananda Putri",
    streak: 12,
    level: 7,
    xp: 2350,
    nextLevelXp: 3000,
  };

  // Mock statistics
  const statistics = {
    studyTime: "12h 30m",
    tasksCompleted: 18,
    averageScore: 85,
    studyStreak: 12,
  };

  // Mock tasks
  const tasks = [
    {
      id: 1,
      subject: "Mathematics",
      title: "Quadratic Equations",
      deadline: "2 hours left",
      progress: 65,
      urgent: true,
    },
    {
      id: 2,
      subject: "English",
      title: "Essay Writing",
      deadline: "5 hours left",
      progress: 30,
      urgent: false,
    },
  ];

  // Study tips
  // const studyTips = [
  //   "Study for 25 minutes, rest for 5 minutes (Pomodoro Technique)",
  //   "Take notes of important concepts using mind maps",
  //   "Teach the material to someone else to deepen understanding",
  // ];

  // Exam data
  const upcomingExam = {
    subject: "Biology",
    topic: "Reproductive System",
    timeRemaining: "23 hours left",
    totalConcepts: 24,
    masteredConcepts: 18,
    confidence: 75,
    weakAreas: ["Fertilization", "Reproductive Hormones"],
  };

  // Mock predictions
  // const predictions = {
  //   examReadiness: 78,
  //   subjectsToFocus: ["Mathematics", "Physics"],
  //   estimatedScore: "85-90",
  // };

  // Mock learning path data
  const learningPath = [
    {
      id: 1,
      title: "Medical Terminology",
      description: "Learn basic medical language for effective communication.",
      status: "completed",
      type: "course",
      icon: "🩺"
    },
    {
      id: 2,
      title: "Pharmacology Basics",
      description: "Learn basic medical language for effective communication.",
      status: "in-progress",
      type: "video",
      progress: 65,
      watchTime: "00:30",
      icon: "💊",
      isVideo: true,
      participants: [
        "/avatars/avatar-1.png",
        "/avatars/avatar-2.png",
        "/avatars/avatar-3.png"
      ]
    },
    {
      id: 3,
      title: "Anatomy and Physiology",
      description: "Understand the structure and function of the human body.",
      status: "completed",
      type: "course",
      icon: "🧠"
    },
    {
      id: 4,
      title: "Medical Ethics and Professionalism",
      description: "Understand ethical principles and professionalism in healthcare.",
      status: "upcoming",
      type: "course",
      icon: "⚖️"
    },
    {
      id: 5,
      title: "Disease Pathophysiology",
      description: "Study the cellular and molecular basis of common diseases.",
      status: "upcoming",
      type: "course",
      icon: "🔬"
    }
  ];

  // Learning path stats
  const pathStats = {
    total: 26,
    completed: 2,
    upcoming: 23
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Animation styles */}
      <style jsx>{animationStyles}</style>

      {/* Center Circle Animation */}
      {/* {showWelcomeCircles && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="relative">

            <div
              className="absolute rounded-full bg-purple-600 circle-expand"
              style={{
                width: '100px',
                height: '100px',
                top: '-50px',
                left: '-50px',
                opacity: 0.5
              }}
            ></div>

            <div
              className="absolute rounded-full bg-purple-500 circle-expand"
              style={{
                width: '80px',
                height: '80px',
                top: '-40px',
                left: '-40px',
                opacity: 0.4,
                animationDelay: '0.2s'
              }}
            ></div>
            <div
              className="absolute rounded-full bg-purple-400 circle-expand"
              style={{
                width: '60px',
                height: '60px',
                top: '-30px',
                left: '-30px',
                opacity: 0.4,
                animationDelay: '0.4s'
              }}
            ></div>
          </div>
        </div>
      )} */}

      {/* Left Sidebar */}
      <div className="w-[300px] bg-white shadow-xl flex flex-col h-full rounded-r-3xl overflow-hidden">
        {/* User Profile */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative shadow-lg shadow-indigo-200">
              <span className="font-bold text-white text-xl">{user.name.charAt(0)}</span>
              <div className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full p-1 shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{user.name}</h3>
              <div className="flex items-center text-xs text-indigo-500 font-medium">
                <span>Level {user.level}</span>
                <span className="mx-1">•</span>
                <span>{user.xp} XP</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-indigo-600">Level Progress</span>
              <span className="text-indigo-600">{user.xp}/{user.nextLevelXp}</span>
            </div>
            <div className="w-full h-3 bg-indigo-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-5 py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl font-medium shadow-md shadow-indigo-200">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Home size={18} className="text-white" />
                </div>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-5 py-3 text-slate-600 hover:bg-indigo-50 rounded-2xl font-medium transition-all">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Book size={18} className="text-blue-600" />
                </div>
                <span>Study</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-5 py-3 text-slate-600 hover:bg-indigo-50 rounded-2xl font-medium transition-all">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <ClipboardList size={18} className="text-amber-600" />
                </div>
                <span>Tasks</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-5 py-3 text-slate-600 hover:bg-indigo-50 rounded-2xl font-medium transition-all">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Calendar size={18} className="text-emerald-600" />
                </div>
                <span>Schedule</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Upload Homework CTA */}
        <div className="p-5">
          <div className="bg-gradient-to-r from-teal-400 to-emerald-500 rounded-3xl p-5 text-white shadow-lg shadow-teal-200/50 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute right-10 top-8 w-12 h-12 bg-white/10 rounded-full"></div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Upload size={22} />
              </div>
              <h3 className="text-xl font-bold">Upload Homework</h3>
            </div>
            <p className="text-sm text-teal-50 mb-4">Get help and quick feedback on your assignments</p>
            <button
              className="w-full bg-white text-teal-600 font-medium py-3 px-5 rounded-xl text-sm shadow-lg shadow-emerald-500/20 hover:bg-teal-50 transition-colors"
              onClick={() => setShowUploadModal(true)}
            >
              Upload Now
            </button>
          </div>
        </div>

        {/* Settings and Help */}
        <div className="p-5 border-t border-slate-100">
          <div className="flex justify-between">
            <button className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 font-medium">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 font-medium">
              <User size={18} />
              <span>Help</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto py-8 px-16">
        {/* Header with user greeting */}
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">Hi, {user.name}! 👋</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2 rounded-full font-medium text-white shadow-lg shadow-amber-200/50">
              <Star className="w-4 h-4 text-white" fill="white" />
              <span>Streak: {user.streak} days</span>
            </div>
          </div>
        </header>

        {/* Main content grid */}
        <div className="space-y-8">
          {/* Exam Cram Banner */}
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-violet-200/50 overflow-hidden relative">
            <div className="flex justify-between items-center relative z-10">
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mr-3">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Exam Cram Ready!</h2>
                </div>
                <p className="mb-6 max-w-md text-violet-100 text-lg">
                  {upcomingExam.subject} exam in {upcomingExam.timeRemaining}. Activate Exam Cram mode for quick preparation.
                </p>
                <button className="bg-white text-violet-700 font-medium py-3 px-8 rounded-full shadow-lg shadow-violet-700/20 hover:bg-violet-50 transition-colors text-lg">
                  Start Studying Now
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 rotate-[-90deg]" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-violet-400/30" strokeWidth="3" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-white" strokeWidth="3"
                      strokeDasharray="100" strokeDashoffset={100 - upcomingExam.confidence} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{upcomingExam.confidence}%</span>
                    <span className="text-sm text-violet-200">Confidence</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-violet-400/30 rounded-full"></div>
            <div className="absolute right-20 top-16 w-32 h-32 bg-fuchsia-400/20 rounded-full"></div>
            <div className="absolute left-40 bottom-0 w-16 h-16 bg-white/10 rounded-full"></div>
          </div>

          {/* Statistics Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-100/50">
            <h2 className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              Your Statistics
            </h2>
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-2xl border-2 border-blue-200/50">
                <p className="text-blue-700 mb-1 font-medium">Study Time</p>
                <p className="text-2xl font-bold text-blue-800">{statistics.studyTime}</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-2xl border-2 border-green-200/50">
                <p className="text-green-700 mb-1 font-medium">Tasks Completed</p>
                <p className="text-2xl font-bold text-green-800">{statistics.tasksCompleted}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-4 rounded-2xl border-2 border-amber-200/50">
                <p className="text-amber-700 mb-1 font-medium">Average Score</p>
                <p className="text-2xl font-bold text-amber-800">{statistics.averageScore}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-2xl border-2 border-purple-200/50">
                <p className="text-purple-700 mb-1 font-medium">Study Streak</p>
                <p className="text-2xl font-bold text-purple-800">{statistics.studyStreak} days</p>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-100/50">
            <h2 className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-indigo-600" />
              </div>
              Task List
            </h2>
            <div className="space-y-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className={`p-5 rounded-2xl flex justify-between items-center shadow-md ${
                    task.urgent ? 'bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500' : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-800">
                        {task.subject}
                      </span>
                      {task.urgent && (
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-800">
                          Urgent
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 mt-2 text-lg">{task.title}</h3>
                    <p className="text-sm text-slate-500 flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-1 text-slate-400" />
                      {task.deadline}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                      <div
                        className="absolute inset-0 rounded-full border-4 border-indigo-500"
                        style={{
                          clipPath: `path('M 50 0 A 50 50 0 ${task.progress > 50 ? 1 : 0} 1 ${
                            50 + 50 * Math.cos((task.progress / 100) * 2 * Math.PI - Math.PI / 2)
                          } ${
                            50 + 50 * Math.sin((task.progress / 100) * 2 * Math.PI - Math.PI / 2)
                          } L 50 50 Z')`,
                        }}
                      ></div>
                      <span className="text-lg font-bold text-indigo-700">{task.progress}%</span>
                    </div>
                    <button className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium hover:bg-indigo-200 transition-colors">
                      Work on it
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-center text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl transition-colors border-2 border-indigo-100">
                View All Tasks
              </button>
            </div>
          </div>

          {/* Learning Path Section */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-100/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
                <span className="text-3xl">🧠</span> My Events
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-2 px-4 pl-10 bg-gray-100 border-none rounded-full text-sm w-[240px] focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex gap-6 mb-8">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-3xl">
                <div className="text-lg font-bold text-center">
                  <div className="text-3xl text-blue-800">{pathStats.total}</div>
                  <div className="text-xs text-blue-600 mt-1">Total</div>
                </div>
              </div>
              <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-3xl relative">
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-xl">🎉</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-center">
                  <div className="text-3xl text-green-800">{pathStats.completed}</div>
                  <div className="text-xs text-green-600 mt-1">Completed</div>
                </div>
              </div>
              <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="text-lg font-bold text-center">
                  <div className="text-3xl text-gray-800">{pathStats.upcoming}</div>
                  <div className="text-xs text-gray-600 mt-1">Upcoming</div>
                </div>
              </div>
              <div className="ml-auto">
                <button className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-800 hover:bg-green-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative pb-4">
              {/* Timeline connector */}
              <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-green-100 z-10"></div>

              {/* Learning items */}
              <div className="space-y-10 relative">
                {learningPath.map((item) => (
                  <div key={item.id} className="relative">
                    {/* Dot in timeline */}
                    <div className="absolute left-10 top-10 w-[10px] h-[10px] bg-green-400 rounded-full z-20 transform -translate-x-[5px]"></div>

                    <div className="flex">
                      <div className="w-20 text-center flex-shrink-0"></div>

                      <div className="flex-1 pl-10">
                        {item.isVideo ? (
                          <div className="bg-purple-100 rounded-3xl p-6 relative overflow-hidden w-[80%]">
                            <div className="absolute right-4 top-4 z-10 flex space-x-2">
                              <button className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="19" cy="12" r="1" />
                                  <circle cx="5" cy="12" r="1" />
                                </svg>
                              </button>
                              <button className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                  <path d="M18 6 6 18" />
                                  <path d="m6 6 12 12" />
                                </svg>
                              </button>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                            <p className="text-sm text-purple-800 mb-8">{item.description}</p>

                            <div className="relative w-full h-32 rounded-2xl bg-white bg-opacity-20 mb-4 flex items-center justify-center overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute bottom-4 left-4 flex items-center rounded-full bg-white bg-opacity-20 px-3 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-white">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span className="text-white text-xs">Watching {item.watchTime}</span>
                              </div>
                              <div className="absolute right-4 bottom-4">
                                <div className="flex -space-x-2">
                                  {item.participants?.map((avatar, idx) => (
                                    <div key={idx} className="w-8 h-8 rounded-full border-2 border-purple-100 overflow-hidden bg-gray-300">
                                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs text-white font-bold">
                                        {idx + 1}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start">
                            <div className="mr-4 flex-shrink-0">
                              <span className="text-4xl">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                              <p className="text-sm text-gray-600">{item.description}</p>

                              <div className="mt-4 flex items-center">
                                {item.status === 'completed' && (
                                  <div className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                                    <span className="mr-1">Completed</span>
                                    <span>👍</span>
                                  </div>
                                )}

                                {item.status === 'upcoming' && (
                                  <div className="px-4 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                      <circle cx="12" cy="12" r="10" />
                                      <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <span>Upcoming</span>
                                  </div>
                                )}

                                <div className="ml-auto flex space-x-2">
                                  {item.status !== 'completed' && (
                                    <button className="w-8 h-8 rounded-full flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                      </svg>
                                    </button>
                                  )}
                                  <button className="w-8 h-8 rounded-full bg-gray-100 text-black flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="1" />
                                      <circle cx="19" cy="12" r="1" />
                                      <circle cx="5" cy="12" r="1" />
                                    </svg>
                                  </button>
                                  {item.status === 'completed' && (
                                    <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Homework Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-400 to-emerald-500 p-6 text-white relative">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute left-10 bottom-2 w-12 h-12 bg-white/10 rounded-full"></div>

              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Upload size={22} />
                  </div>
                  <h3 className="text-xl font-bold">Upload Homework</h3>
                </div>

                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    resetForm();
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* File Upload Area - Moved to the top */}
              <div className="mb-6">
                <label className="block text-slate-700 font-medium mb-2">Upload File</label>

                {!uploadedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      isDragging ? 'border-teal-500 bg-teal-50' : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <input
                      type="file"
                      id="file-input"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    <File size={40} className="text-slate-400 mb-4" />
                    <p className="text-slate-600 text-center mb-2 font-medium">
                      Drag and drop your file here, or <span className="text-teal-500">click to browse</span>
                    </p>
                    <p className="text-slate-400 text-sm text-center">
                      Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                    </p>
                  </div>
                ) : (
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-start">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <File size={20} className="text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate">{uploadedFile.name}</p>
                      <p className="text-slate-500 text-sm">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      className="ml-2 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                    >
                      <X size={16} className="text-slate-500 hover:text-red-500" />
                    </button>
                  </div>
                )}
              </div>

              {/* Homework Title Input */}
              <div className="mb-5">
                <label className="text-slate-700 font-medium mb-2 flex items-center">
                  Homework Title
                  {uploadedFile && (
                    <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles size={12} /> Auto-filled
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  value={homeworkTitle}
                  onChange={(e) => setHomeworkTitle(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-100 border ${titleError ? 'border-red-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Enter homework title"
                />
                {titleError && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="inline mr-1" /> Title is required
                  </p>
                )}
              </div>

              {/* Deadline Input */}
              <div className="mb-5">
                <label className="block text-slate-700 font-medium mb-2">Submission Deadline</label>
                <div className="relative">
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-100 border ${deadlineError ? 'border-red-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  />
                  <CalendarIcon size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
                </div>
                {deadlineError && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="inline mr-1" /> Deadline is required
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    resetForm();
                  }}
                  className="flex-1 py-3 px-5 rounded-xl border-2 border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium shadow-lg shadow-teal-200/50 hover:opacity-90 transition-opacity"
                >
                  Upload Homework
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      <UploadLoadingOverlay isVisible={isUploading} onComplete={handleUploadComplete} />
    </div>
  );
}
