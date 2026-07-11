import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiEdit3, FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50/30 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 mb-6">
          ✨ Welcome to the Future of Blogging
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-6">
          Share Your Story,{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Inspire the World
          </span>
        </h1>

        <p className="text-slate-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Welcome to BlogiSphere—a modern publishing platform where ideas flow, stories connect, and creators grow. Share your knowledge or explore fresh insights today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {user ? (
            <Link
              to="/create"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm cursor-pointer"
            >
              <FiEdit3 className="w-4 h-4" />
              <span>Write an Article</span>
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm cursor-pointer"
              >
                <span>Get Started</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm cursor-pointer"
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