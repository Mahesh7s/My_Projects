import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";

import Profile from "./components/Profile";
import Buddies from "./components/Buddies";
import WorkoutTracker from "./components/WorkoutTracker";
import WeeklyProgress from "./components/WeeklyProgress";
import GoalSetting from "./components/GoalSetting";
import ProgressSharing from "./components/ProgressSharing";

function Dashboard() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-50">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-4xl font-semibold tracking-widest">
            🔥FitnessBuddy
          </h1>
        </div>

        {/* Menu */}
        <ul className="bg-gray-800 px-4 py-2 flex gap-4 overflow-x-auto">
          {[
            { to: "/dashboard/profile", label: "Profile" },
            { to: "/dashboard/buddy-matching", label: "Buddy Matching" },
            { to: "/dashboard/workout-tracking", label: "Workout Tracking" },
            { to: "/dashboard/weekly-progress", label: "Weekly Progress" },
            { to: "/dashboard/goal-setting", label: "Goal Setting" },
            { to: "/dashboard/progress-sharing", label: "Progress Sharing" },
          ].map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                    `${
                    isActive ? "bg-orange-500 text-gray-50" : "text-gray-400"
                    } px-4 py-2 rounded-md font-semibold transform transition-all duration-500 ease-in-out hover:bg-orange-500 hover:text-gray-50 hover:shadow-md hover:-translate-y-1`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Dashboard Content */}
      <div className="p-6 max-w-7xl ml-auto mr-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Your Dashboard — <span className="text-orange-500">FitnessBuddy</span>
        </h2>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition duration-500 ease-in-out hover:shadow-2xl">
          <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="buddy-matching" element={<Buddies />} />
            <Route path="workout-tracking" element={<WorkoutTracker />} />
            <Route path="weekly-progress" element={<WeeklyProgress />} />
            <Route path="goal-setting" element={<GoalSetting />} />
            <Route path="progress-sharing" element={<ProgressSharing />} />
          </Routes>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} FitnessBuddy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
