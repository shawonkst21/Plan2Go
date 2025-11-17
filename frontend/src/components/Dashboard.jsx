import React from "react";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-400 via-green-300 to-yellow-200 flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-5xl w-full backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        {/* Floating sparkles */}
        <span className="absolute top-5 left-10 w-2 h-2 bg-white/70 rounded-full animate-pulse"></span>
        <span className="absolute top-20 right-16 w-3 h-3 bg-white/50 rounded-full animate-bounce"></span>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">
            Dashboard
          </h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/30 hover:bg-white/50 text-white px-4 py-2 rounded-xl font-semibold transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-6 bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-105 transition">
          <div className="bg-white/30 rounded-full p-4">
            <User size={40} className="text-white" />
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-sm opacity-90">{user?.email}</p>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">
              Recent Activity
            </h3>
            <p className="text-white/90">No recent activity yet.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-white mb-2">Stats</h3>
            <p className="text-white/90">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
