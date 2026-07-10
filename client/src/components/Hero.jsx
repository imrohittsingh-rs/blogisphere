import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const Hero = ({ onExploreClick }) => {
  const { currentUser } = useContext(BlogContext);

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-32">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-3xl translate-y-1/3 translate-x-1/2 pointer-events-none" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          The ultimate blogging space
        </span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
          Share Your Stories,{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Elevate Your Voice
          </span>
        </h1>
        
        <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Discover insightful articles, expert tutorials, and personal journeys shared by a passionate community of creators and developers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onExploreClick}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-base"
          >
            Explore Articles
          </button>
          {currentUser ? (
            <Link 
              to="/create"
              className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold px-8 py-3.5 rounded-xl border border-slate-700/60 transition-all duration-200 text-base text-center"
            >
              Write a Post
            </Link>
          ) : (
            <Link 
              to="/signup"
              className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold px-8 py-3.5 rounded-xl border border-slate-700/60 transition-all duration-200 text-base text-center"
            >
              Join the Community
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;