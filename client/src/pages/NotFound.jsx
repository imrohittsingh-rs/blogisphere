import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiHome, FiBookOpen, FiEdit3, FiUser, FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  const links = [
    {
      to: "/",
      title: "Home",
      description: "Back to the main page",
      icon: <FiHome className="w-4 h-4 text-zinc-500 group-hover:text-brand transition-colors" />
    },
    {
      to: "/",
      title: "Blog",
      description: "Read our latest articles",
      icon: <FiBookOpen className="w-4 h-4 text-zinc-500 group-hover:text-brand transition-colors" />
    },
    {
      to: "/create",
      title: "Write Post",
      description: "Draft your next publication",
      icon: <FiEdit3 className="w-4 h-4 text-zinc-500 group-hover:text-brand transition-colors" />
    },
    {
      to: "/profile",
      title: "My Profile",
      description: "View your published stories",
      icon: <FiUser className="w-4 h-4 text-zinc-500 group-hover:text-brand transition-colors" />
    }
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-16 bg-white selection:bg-amber-100 selection:text-amber-900">
      <motion.div 
        className="w-full max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top X Icon Container */}
        <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-50 border border-zinc-200 text-zinc-400 mb-6 shadow-xs">
          <FiX className="w-5 h-5 text-zinc-700" />
        </div>

        {/* Headers */}
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-none mb-3">
          Page not found
        </h1>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-10 font-normal">
          Here are some pages that might help you find what you're looking for.
        </p>

        {/* 2x2 Grid of Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="flex items-center justify-between p-4 bg-zinc-50/50 border border-zinc-200/60 hover:border-brand hover:bg-zinc-50 transition-all duration-200 group cursor-pointer text-left shadow-2xs"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-9 h-9 bg-white border border-zinc-200/60 shadow-3xs">
                  {link.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider leading-none mb-1 group-hover:text-brand transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-medium">
                    {link.description}
                  </p>
                </div>
              </div>
              <FiArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand group-hover:translate-x-1 transition-all duration-200 shrink-0" />
            </Link>
          ))}
        </div>

        {/* Bottom Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-brand text-white border border-zinc-950 hover:border-brand font-bold py-3.5 px-6 text-[10px] tracking-widest uppercase cursor-pointer btn-tactile"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          <span>Go Back</span>
        </button>

      </motion.div>
    </div>
  );
};

export default NotFound;