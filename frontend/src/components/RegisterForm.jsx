import React, { useState } from "react";
import { Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    photo: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match");
    if (formData.password.length < 6)
      return setError("Password must be at least 6 characters");

    setLoading(true);
    try {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-6 bg-black/50 backdrop-blur-md rounded-2xl shadow-2xl
                 border border-gray-800 text-white"
    >
      <h2 className="text-3xl font-extrabold text-center mb-5">
        Create Your Journey ✈️
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-700/20 text-red-200 rounded border border-red-800/40">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First name"
            required
            className="w-full px-4 py-2 rounded-lg bg-transparent text-gray-100 placeholder-gray-400
                       border border-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last name"
            required
            className="w-full px-4 py-2 rounded-lg bg-transparent text-gray-100 placeholder-gray-400
                       border border-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-indigo-300/90" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent text-gray-100 placeholder-gray-400
                       border border-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-indigo-300/90" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0123456789"
            required
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-transparent text-gray-100 placeholder-gray-400
                       border border-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-indigo-300/90" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full pl-10 pr-12 py-2 rounded-lg bg-transparent text-gray-100 placeholder-gray-400
                       border border-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
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

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="w-full px-4 py-2 rounded-lg bg-transparent text-gray-100 placeholder-gray-400
                     border border-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 rounded-xl
                     shadow-lg hover:brightness-110 transform hover:scale-[1.01] transition disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </div>

      <p className="text-center mt-4 text-sm text-gray-300/90">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-amber-300 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
