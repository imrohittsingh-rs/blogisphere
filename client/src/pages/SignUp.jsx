import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from "../context/AuthContext.jsx";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullname || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-16 bg-white selection:bg-amber-100 selection:text-amber-900">
      <motion.div 
        className="w-full max-w-md bg-zinc-50/50 p-8 md:p-10 border border-zinc-200/60 shadow-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center mb-8">
          <h2 className="text-xl font-black text-zinc-950 tracking-tight">Create Account</h2>
          <p className="text-zinc-500 text-xs mt-2 font-medium">
            Join BlogiSphere and start publishing your articles today.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-650 text-xs font-bold uppercase tracking-wider flex items-center gap-3">
            <MdOutlineErrorOutline size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="e.g. Rohit Singh"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-zinc-800 placeholder-zinc-400 border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-sm rounded-none font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-zinc-800 placeholder-zinc-400 border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-sm rounded-none font-medium"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="•••••••• (Min. 8 chars)"
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-zinc-800 placeholder-zinc-400 border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-sm rounded-none font-medium"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-[60%] -translate-y-1/2 text-zinc-400 hover:text-zinc-650 focus:outline-none cursor-pointer"
            >
              {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-950 text-white hover:bg-brand hover:border-brand transition-all duration-200 font-bold py-3.5 px-4 text-[10px] tracking-widest uppercase border border-zinc-950 rounded-none disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer btn-tactile"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin h-3.5 w-3.5 text-current" />
                Creating Account...
              </>
            ) : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-200 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Already have an account?{' '}
          <Link to="/login" className="text-zinc-800 hover:text-brand font-black transition-colors ml-1">
            Log In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
