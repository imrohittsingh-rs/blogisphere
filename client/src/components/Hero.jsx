import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiEdit3, FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-blue-50/50 via-white to-slate-50/30 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-60 sm:w-80 h-60 sm:h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-6 shadow-xs">
          ✨ Your Story Starts Here.
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-tight mb-6 w-full">
          <span className="block bg-linear-to-r from-blue-700 via-blue-500 to-sky-400 bg-clip-text text-transparent">
            One Platform.
          </span>
          <span className="block bg-linear-to-r from-blue-700 via-blue-500 to-sky-400 bg-clip-text text-transparent">
            Infinite Perspectives.
          </span>
        </h1>

        <p className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          Welcome to BlogiSphere - a platform where ideas flow, stories connect, and creators grow. Share your knowledge or explore fresh insights today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          {user ? (
            <Link
              to="/create"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm cursor-pointer"
            >
              <FiEdit3 className="w-4 h-4" />
              <span>Write an Article</span>
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm cursor-pointer"
              >
                <span>Get Started</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm cursor-pointer"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;