import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import { motion, AnimatePresence } from 'motion/react';
import { FiLogOut, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Failed to log out", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        
        {/* BlogiSphere Logo/Text */}
        <Link to="/" className="text-xl font-black tracking-tighter text-zinc-950 hover:opacity-85 transition-opacity flex items-center gap-1.5">
          <span>BlogiSphere</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand" />
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
              isActive("/") ? "text-brand" : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/profile" 
            className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
              isActive("/profile") ? "text-brand" : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            My Profile
          </Link>
          <Link 
            to="/create" 
            className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
              isActive("/create") ? "text-brand" : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Write Post
          </Link>
        </div>

        {/* Right side: Search bar & Profile Button & Hamburg menu */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Profile / Auth Controls */}
          {!loading && (
            user ? (
              <div className="flex items-center gap-4">
                {/* User Profile Button */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:opacity-85 transition-opacity text-sm font-semibold text-zinc-700"
                  title="My Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-xs border border-brand/20 shadow-sm transition-transform hover:scale-105">
                    {user.fullname ? user.fullname[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden lg:inline text-zinc-900 font-bold text-xs uppercase tracking-wider">{user.fullname}</span>
                </Link>

                {/* Log Out */}
                <button
                  onClick={handleLogout}
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Log out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-zinc-600 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors py-2"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-zinc-950 text-white hover:bg-brand hover:text-white transition-all duration-200 font-bold py-2 px-4 text-[10px] tracking-widest uppercase border border-zinc-950 hover:border-brand rounded-none btn-tactile"
                >
                  Sign Up
                </Link>
              </div>
            )
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center p-1.5 border border-zinc-200 bg-white text-zinc-700 hover:text-brand hover:border-brand transition-colors cursor-pointer btn-tactile"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-zinc-100 bg-white/95 backdrop-blur-md px-6 py-5 flex flex-col gap-4 shadow-sm overflow-hidden"
          >
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 py-1.5 border-b border-zinc-100/50 ${
                isActive("/") ? "text-brand" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/profile" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 py-1.5 border-b border-zinc-100/50 ${
                isActive("/profile") ? "text-brand" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              My Profile
            </Link>
            <Link 
              to="/create" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 py-1.5 ${
                isActive("/create") ? "text-brand" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Write Post
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;