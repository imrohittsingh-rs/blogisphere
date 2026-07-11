import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-lg bg-white p-10 sm:p-12 rounded-3xl border border-slate-100 shadow-xl text-center relative overflow-hidden">

        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50/75 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-50/75 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">
          <h1 className="text-7xl sm:text-8xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tighter">
            404
          </h1>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Page Not Found
          </h2>

          <p className="text-slate-500 text-md mb-8 leading-relaxed max-w-sm mx-auto">
            Oops! The story or page you are looking for doesn't exist, or has been moved to a new address.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm cursor-pointer"
          >
            <FiHome className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;