import React, { useState } from "react";
import { Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");

    setLoading(true);
    try {
      const { confirmPassword, ...userData } = form;
      await register(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-8 bg-gradient-to-br from-green-300/20 to-blue-400/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 text-white animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-md">
        Start Your Adventure ✈️
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-600/30 rounded-xl text-red-100 border border-red-700/30 text-center">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="px-4 py-3 rounded-xl bg-white/10 placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-purple-400 transition outline-none"
          />
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="px-4 py-3 rounded-xl bg-white/10 placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-purple-400 transition outline-none"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-white/80" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-purple-400 transition outline-none"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-white/80" />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-purple-400 transition outline-none"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-white/80" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-purple-400 transition outline-none"
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

        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-purple-400 transition outline-none"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl font-semibold shadow-lg hover:scale-105 transition transform disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </div>

      <p className="text-center mt-5 text-white/80">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="text-yellow-300 hover:underline"
        >
          Login
        </button>
      </p>

      <span className="absolute top-2 right-4 w-2 h-2 bg-white/70 rounded-full animate-pulse"></span>
      <span className="absolute bottom-3 left-6 w-3 h-3 bg-white/50 rounded-full animate-bounce"></span>
    </div>
  );
};

export default RegisterForm;
