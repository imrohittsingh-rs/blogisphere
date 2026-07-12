import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import { FiEdit3, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5 sm:gap-2">
              <img src={logo} alt="BlogiSphere Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-cover" />
              <span className="text-gray-800 font-bold">
                BlogiSphere
              </span>
            </Link>
            <div className="hidden sm:flex items-center border-l border-slate-200 pl-4 h-6">
              <Link to="/" className="text-lg font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {!loading && (
              user ? (
                <>
                  <Link
                    to="/create"
                    className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold py-2 px-2.5 sm:px-4 rounded-xl transition-all duration-200 text-sm"
                    title="Write an Article"
                  >
                    <FiEdit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Write</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-100 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200">
                      {user.fullname ? user.fullname[0].toUpperCase() : 'U'}
                    </div>
                    <span className="hidden md:inline text-sm font-medium text-slate-700">
                      {user.fullname}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-semibold py-2 px-2 sm:px-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
                    title="Log out"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Log out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-slate-600 hover:text-slate-800 font-semibold text-sm transition-all py-2 px-4"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;