import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-md mx-auto p-6 bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl
                 border border-gray-800 text-white"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-extrabold text-center mb-5">
        Welcome Back 🌌
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-700/20 text-red-200 rounded border border-red-800/40">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200/90">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-indigo-300/90" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent text-gray-100
                         placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent transition"
              placeholder="you@example.com"
              required
              autoComplete="username"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200/90">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-indigo-300/90" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-2 rounded-lg bg-transparent text-gray-100
                         placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-indigo-500
                         focus:border-transparent transition"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-indigo-200 hover:text-white transition"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 rounded-xl
                     shadow-lg hover:brightness-110 transform hover:scale-[1.01] transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <p className="text-center mt-4 text-sm text-gray-300/90">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-amber-300 hover:underline"
        >
          Register
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
