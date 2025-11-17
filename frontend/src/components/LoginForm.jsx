import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      onSubmit={handleSubmit}
      className="relative w-full max-w-md mx-auto p-8 bg-gradient-to-br from-blue-400/30 to-green-300/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 text-white animate-fade-in"
    >
      <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
        Welcome Back 🌄
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-600/30 rounded-xl text-red-100 border border-red-700/30 text-center">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-white/80" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-blue-400 transition outline-none"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-white/80" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-blue-400 transition outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-white/70 hover:text-white transition"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl font-semibold shadow-lg hover:scale-105 transition transform disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <p className="text-center mt-5 text-white/80">
        Don't have an account?{" "}
        <button
          onClick={onSwitchToRegister}
          className="text-yellow-300 hover:underline"
        >
          Register
        </button>
      </p>

      {/* Floating sparkle animation */}
      <span className="absolute top-2 left-2 w-2 h-2 bg-white/70 rounded-full animate-pulse"></span>
      <span className="absolute bottom-4 right-6 w-3 h-3 bg-white/50 rounded-full animate-bounce"></span>
    </form>
  );
};

export default LoginForm;
