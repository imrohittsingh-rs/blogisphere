import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiArrowRight } from 'react-icons/fi';
import ScrollExpandMedia from './ScrollExpandMedia.jsx';

import spaceIntention from '../assets/space_intention.png';
import editorialWorkspace from '../assets/editorial_workspace.png';

const Hero = () => {
  const { user } = useAuth();

  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc={editorialWorkspace}
      bgImageSrc={spaceIntention}
      title="Every Great Story,Starts Here."
      date="Ready to share your first story?"
      scrollToExpand="Scroll to Explore"
    >
      <div className="max-w-xl mx-auto text-center flex flex-col items-center">
        <span className="text-[10px] font-semibold tracking-widest text-brand uppercase mb-3 bg-brand-light/45 px-2 py-0.5">
          Welcome to BlogiSphere
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-zinc-950 tracking-wide leading-tight mb-4">
          Where Every Story <br />
          Finds Its Readers.
        </h2>
        <p className="text-sm md:text-base text-zinc-500 leading-relaxed mb-6 font-normal max-w-[50ch] mx-auto">
          BlogiSphere is a modern publishing platform where writers, developers, students, and creators share knowledge globally. It is where your ideas take flight and your words find their wings.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to={user ? "/create" : "/signup"}
            className="inline-flex items-center gap-2 bg-zinc-950 text-white hover:bg-brand border border-zinc-950 hover:border-brand transition-colors duration-200 font-bold px-6 py-3.5 text-[10px] tracking-widest uppercase btn-tactile"
          >
            <span>{user ? "Start Writing" : "Get Started"}</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="#latest-stories"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('latest-stories')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-white text-zinc-800 hover:bg-zinc-50 hover:text-brand border border-zinc-200 transition-colors duration-200 font-bold px-6 py-3.5 text-[10px] tracking-widest uppercase btn-tactile"
          >
            <span>Explore Stories</span>
          </a>
        </div>
      </div>
    </ScrollExpandMedia>
  );
};

export default Hero;