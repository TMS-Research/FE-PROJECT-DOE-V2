"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ClipboardList,
  Calendar,
  Settings,
  Search,
  MoreHorizontal,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  const [currentCourse, setCurrentCourse] = useState("Front End");
  const [activeNav, setActiveNav] = useState("Dashboard");

  const user = {
    name: "Jason Ranti",
    avatar: "/avatar.png",
    isOnline: true,
  };

  const courses = [
    { id: 1, name: "UI/UX Design", watched: 278 },
    { id: 2, name: "Branding", watched: 58 },
    { id: 3, name: "Front End", watched: 67 },
  ];

  const continueCourses = [
    {
      id: 1,
      title: "Beginner's Guide to Becoming a Professional Front-End Developer",
      category: "FRONT END",
      mentor: { name: "Leonardo Sarniul", avatar: "/mentor1.png" },
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      id: 2,
      title: "Optimizing User Experience with the Best UI/UX Design",
      category: "UI/UX DESIGN",
      mentor: { name: "Riyo Saito", avatar: "/mentor2.png" },
      thumbnail: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    },
    {
      id: 3,
      title: "Reviving and Refreshing Company Image",
      category: "BRANDING",
      mentor: { name: "Pathang Satio", avatar: "/mentor3.png" },
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    },
  ];

  const mentors = [
    { id: 1, name: "Pathang Satio", role: "Mentor", avatar: "/mentor1.png" },
    {
      id: 2,
      name: "Zelki Horizontall",
      role: "Mentor",
      avatar: "/mentor2.png",
    },
    { id: 3, name: "Leonardo Sarniul", role: "Mentor", avatar: "/mentor3.png" },
  ];

  const lessons = [
    {
      id: 1,
      mentor: "Pathang Satio",
      date: "2/16/2024",
      type: "UI/UX DESIGN",
      desc: "Understand Of UI/UX Design",
    },
  ];

  // Stats for chart visualization
  const progressStats = {
    days: ["1-10 Aug", "11-20 Aug", "21-30 Aug"],
    values: [20, 40, 80],
  };

  return (
    <div className="flex h-screen bg-[#0f172a]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f172a] text-white p-4 flex flex-col">
        <div className="flex items-center mb-10 py-2">
          <div className="bg-blue-600 rounded-md p-1 mr-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5L5 12L12 19" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="font-bold text-xl">Coursue</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-xs uppercase text-gray-400 mb-3 px-4">OVERVIEW</h2>
          <ul className="space-y-0.5">
            <li>
              <a
                href="#"
                className={`flex items-center py-3 px-4 rounded-xl transition-all ${
                  activeNav === "Dashboard"
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
                onClick={() => setActiveNav("Dashboard")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-3">
                  <path
                    d="M4 6H20M4 12H20M4 18H12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center py-3 px-4 rounded-xl transition-all ${
                  activeNav === "Homework"
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
                onClick={() => setActiveNav("Homework")}
              >
                <ClipboardList size={20} className="mr-3" />
                <span className="font-medium">Homework</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center py-3 px-4 rounded-xl transition-all ${
                  activeNav === "Exam"
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
                onClick={() => setActiveNav("Exam")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-3">
                  <path
                    d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 7H17M7 12H17M7 17H12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-medium">Exam</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center py-3 px-4 rounded-xl transition-all ${
                  activeNav === "Schedule"
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
                onClick={() => setActiveNav("Schedule")}
              >
                <Calendar size={20} className="mr-3" />
                <span className="font-medium">Schedule</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xs uppercase text-gray-400 mb-3 px-4">SETTINGS</h2>
          <ul className="space-y-0.5">
            <li>
              <a
                href="#"
                className={`flex items-center py-3 px-4 rounded-xl transition-all ${
                  activeNav === "Settings"
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
                onClick={() => setActiveNav("Settings")}
              >
                <Settings size={20} className="mr-3" />
                <span className="font-medium">Settings</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center py-3 px-4 rounded-xl transition-all hover:bg-slate-800"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-3">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 8V12M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-medium">Help Support</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-auto bg-indigo-900 rounded-xl p-3 mb-4">
          <div className="relative">
            <button className="absolute top-0 right-0 text-xs bg-gray-500 rounded-full w-4 h-4 flex items-center justify-center">×</button>
            <div className="text-xs uppercase text-indigo-300 font-bold mb-1">HIRELLY PRO</div>
            <div className="text-sm font-medium mb-2">Get Personal Career Coach On-the-go</div>
            <div className="text-xs text-indigo-300 mb-3">Get reach and find easily with app from our professional coach.</div>
            <button className="bg-indigo-800 text-xs font-medium py-1 px-3 rounded-md flex items-center">
              Upgrade to PRO
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-1">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white rounded-l-3xl">
        <div className="p-8">
          {/* Top Header */}
          <div className="flex justify-between items-center mb-10">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Search your course..."
                className="w-full p-3 pl-10 pr-8 rounded-full bg-white border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 bg-white rounded-full shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  />
                  <path
                    d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3 relative">
                  <Image
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt={user.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-2 space-y-8">
              {/* Hero Banner */}              <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-72 h-72 bg-blue-500 rounded-full -mr-20 -mb-20"></div>
                <div className="absolute right-40 top-10 w-24 h-24 bg-blue-400 rounded-full opacity-50"></div>

                <div className="relative z-10">
                  <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                    ONLINE COURSE
                  </span>
                  <h1 className="text-3xl font-bold mb-4">
                    Sharpen Your Skills with
                    <br />
                    Professional Online Courses
                  </h1>
                  <button className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center gap-2">
                    Join Now
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Current Courses */}
              <div className="flex space-x-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`flex items-center p-4 rounded-xl ${
                      currentCourse === course.name
                        ? "bg-white shadow-sm"
                        : "bg-gray-50"
                    }`}
                    onClick={() => setCurrentCourse(course.name)}
                  >
                    <div
                      className={`mr-3 w-9 h-9 ${
                        currentCourse === course.name
                          ? "bg-blue-100"
                          : "bg-white"
                      } rounded flex items-center justify-center`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M10 13C10.4295 13 10.8496 13.0776 11.2322 13.2284C11.6147 13.3791 11.9512 13.5997 12.2192 13.8762C12.4873 14.1527 12.6804 14.485 12.7886 14.8432C12.8967 15.2014 12.9173 15.5767 12.8489 15.9389"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 10V9C2 7.93913 2.42143 6.92172 3.17157 6.17157C3.92172 5.42143 4.93913 5 6 5H18C19.0609 5 20.0783 5.42143 20.8284 6.17157C21.5786 6.92172 22 7.93913 22 9V15C22 16.0609 21.5786 17.0783 20.8284 17.8284C20.0783 18.5786 19.0609 19 18 19H9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 19H2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 15H2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 11.54C11.1256 11.54 12.04 10.6256 12.04 9.5C12.04 8.37439 11.1256 7.46 10 7.46C8.87439 7.46 7.96 8.37439 7.96 9.5C7.96 10.6256 8.87439 11.54 10 11.54Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        {course.watched} watched
                      </p>
                      <p className="font-medium text-gray-700">{course.name}</p>
                    </div>
                    <button className="ml-auto">
                      <MoreHorizontal size={18} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue Watching */}
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-semibold">Continue Watching</h2>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <ChevronLeft size={18} />
                    </button>
                    <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                  {continueCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden"
                    >
                      <div className="h-40 bg-gray-200 relative">
                        {/* Course thumbnail */}
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover"
                        />
                        <button className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <polygon
                                points="5 3 19 12 5 21 5 3"
                                fill="white"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </button>
                        <div className="absolute bottom-3 right-3">
                          <Heart size={18} className="text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-xs font-medium text-gray-500">
                            {course.category}
                          </span>
                        </div>
                        <h3 className="font-medium text-sm line-clamp-2 mb-3">
                          {course.title}
                        </h3>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 relative">
                            <Image
                              src="https://randomuser.me/api/portraits/men/43.jpg"
                              alt={course.mentor.name}
                              fill
                              sizes="24px"
                              className="object-cover rounded-full"
                            />
                          </div>
                          <span className="text-xs text-gray-600">
                            {course.mentor.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Statistics & Metrics */}
            <div className="space-y-8">
              {/* User Stats */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-center mb-8">
                  <div className="mr-4 relative">
                    <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center relative overflow-hidden">
                      <Image
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt={user.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Good Morning Jason 🔥</h3>
                    <p className="text-sm text-gray-500">
                      Continue your training to achieve your target!
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div>
                  <div className="flex justify-between items-end h-56 mb-1">
                    {progressStats.values.map((value, i) => (
                      <div key={i} className="w-20 relative">                        <div
                          className="w-full bg-blue-500 rounded-xl"
                          style={{ height: `${value}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {progressStats.days.map((day, i) => (
                      <span
                        key={i}
                        className="text-xs text-gray-500 w-20 text-center"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mentors */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Your mentor</h3>
                  <button className="text-blue-600 text-sm font-medium">
                    <Plus size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {mentors.map((mentor) => (
                    <div
                      key={mentor.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3 relative">
                          <Image
                            src="https://randomuser.me/api/portraits/men/43.jpg"
                            alt={mentor.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{mentor.name}</p>
                          <p className="text-xs text-gray-500">{mentor.role}</p>
                        </div>
                      </div>                      <button className="px-4 py-1 border border-blue-500 text-blue-500 rounded-full text-xs font-medium">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-5 py-2 text-center bg-gray-100 rounded-xl text-gray-700 font-medium">
                  See All
                </button>
              </div>

              {/* Lessons */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Your Lesson</h3>
                <div className="mb-4 border-b pb-2">
                  <div className="grid grid-cols-4 text-xs font-medium text-gray-500">
                    <div>MENTOR</div>
                    <div>TYPE</div>
                    <div>DESC</div>
                    <div>ACTION</div>
                  </div>
                </div>

                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="grid grid-cols-4 items-center py-3 text-sm"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2 relative">
                        <Image
                          src="https://randomuser.me/api/portraits/men/43.jpg"
                          alt={lesson.mentor}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs">{lesson.mentor}</p>
                        <p className="text-xs text-gray-500">{lesson.date}</p>
                      </div>
                    </div>
                    <div>                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                        {lesson.type}
                      </span>
                    </div>
                    <div className="text-xs">{lesson.desc}</div>
                    <div>
                      <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="#2563EB"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
