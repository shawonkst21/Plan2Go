import React from "react";
import { User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button onClick={logout}>Logout</button>
        </div>
        <div className="flex items-center gap-4">
          <User />
          <div>
            <h2>
              {user?.first_name} {user?.last_name}
            </h2>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
