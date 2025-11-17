import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthRouter />
      </Router>
    </AuthProvider>
  );
};

const AuthRouter = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (isAuthenticated) return <Dashboard />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-b from-blue-400 via-blue-200 to-green-300">
            {/* Optional: Mountains overlay for login page */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#4B5563"
                  d="M0,256L80,218.7C160,181,320,107,480,85.3C640,64,800,96,960,112C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                />
              </svg>
            </div>

            {/* Centered Login/Register card */}
            <div className="relative z-10 w-full max-w-xl">
              {showRegister ? (
                <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
              ) : (
                <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
              )}
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
