import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getAllBlogs } from "../services/blogService.js";
import BlogCard from "../components/BlogCard.jsx";
import ScrollExpandMedia from "../components/ScrollExpandMedia.jsx";
import { FiLoader, FiArrowRight, FiCode, FiCpu, FiPenTool, FiZap, FiCheckSquare, FiEdit3, FiGlobe, FiMonitor } from "react-icons/fi";

// Import custom generated assets for landing page
import spaceIntention from '../assets/images/munfarid/space_intention.png';
import editorialWorkspace from '../assets/images/munfarid/editorial_workspace.png';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs();
        setBlogs(res.data);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter dynamic blogs based on category selection
  const filteredBlogs = blogs.filter((blog) => {
    if (!selectedCategory) return true;
    return (
      blog.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      blog.tags?.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
    );
  });

  // Categories metadata for Trending Topics
  const trendingTopics = [
    {
      id: 'development',
      name: 'Development',
      icon: <FiCode className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors" />
    },
    {
      id: 'ai',
      name: 'AI',
      icon: <FiCpu className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors" />
    },
    {
      id: 'design',
      name: 'Design',
      icon: <FiPenTool className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors" />
    },
    {
      id: 'startups',
      name: 'Startups',
      icon: <FiZap className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors" />
    },
    {
      id: 'productivity',
      name: 'Productivity',
      icon: <FiCheckSquare className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors" />
    },
    {
      id: 'writing',
      name: 'Writing',
      icon: <FiEdit3 className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors" />
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: <FiGlobe className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors" />
    },
    {
      id: 'web-development',
      name: 'Web Development',
      icon: <FiMonitor className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors" />
    }
  ];

  return (
    <div className="min-h-screen bg-white font-poppins text-zinc-800 antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* FEATURED HERO SECTION */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={editorialWorkspace}
        bgImageSrc={spaceIntention}
        title="Every Great Story,Starts Here."
        date="Ready to share your first story?"
        scrollToExpand="Scroll to Explore"
      >
        <div className="max-w-xl mx-auto text-center flex flex-col items-center">
          <span className="text-[10px] font-black tracking-widest text-brand uppercase mb-3 bg-brand-light px-2 py-0.5">
            Welcome to BlogiSphere
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-950 tracking-tight leading-tight mb-4">
            Where Every Story <br />
            Finds Its Readers.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed mb-6 font-normal max-w-[45ch] mx-auto">
            BlogiSphere is a modern publishing platform where writers, developers, students, and creators share knowledge globally. It is where your ideas take flight and your words find their wings.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-zinc-950 text-white hover:bg-brand border border-zinc-950 hover:border-brand transition-colors duration-200 font-bold px-6 py-3.5 text-[10px] tracking-widest uppercase btn-tactile"
            >
              <span>Start Writing</span>
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

      {/* TRENDING TOPICS */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-t border-zinc-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-black text-zinc-950 tracking-tight">Explore by Category</h3>
            <p className="text-xs text-zinc-400 mt-1 font-medium">Discover stories across your favorite interests.</p>
          </div>
          <button
            onClick={() => setSelectedCategory("")}
            className="text-[10px] font-black tracking-widest text-zinc-400 hover:text-brand uppercase transition-colors self-start sm:self-auto cursor-pointer"
          >
            Clear Filter
          </button>
        </div>

        {/* Category Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingTopics.map((topic, i) => (
            <motion.button
              key={topic.id}
              onClick={() => setSelectedCategory(selectedCategory === topic.id ? "" : topic.id)}
              className={`flex items-center gap-3.5 py-4 px-5 bg-zinc-50/50 border transition-all duration-200 cursor-pointer group ${
                selectedCategory === topic.id 
                  ? 'border-brand bg-brand-light/35' 
                  : 'border-zinc-200/60 hover:border-zinc-400 hover:bg-zinc-50'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-white border border-zinc-200/60 shadow-xs">
                {topic.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                {topic.name}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* LATEST STORIES */}
      <section id="latest-stories" className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-100">
        <h3 className="text-lg font-black text-zinc-950 tracking-tight mb-8">Latest Stories</h3>

        {loading ? (
          <div className="min-h-[30vh] flex flex-col items-center justify-center gap-3">
            <FiLoader className="animate-spin h-8 w-8 text-brand" />
            <p className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Loading stories...</p>
          </div>
        ) : error ? (
          <div className="min-h-[30vh] flex flex-col items-center justify-center text-red-500 font-bold text-sm uppercase tracking-wider">
            {error}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50/50 border border-zinc-100/70">
            <p className="text-zinc-500 font-medium text-sm">No stories found. Be the first to write one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-16 flex items-center justify-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 flex items-center justify-center text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentPage === page
                  ? 'bg-brand text-white'
                  : 'bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-800'
              }`}
            >
              {page} 
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
            className="w-9 h-9 flex items-center justify-center text-xs font-bold bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-800 transition-all duration-200 cursor-pointer"
            title="Next Page"
          >
            &rsaquo;
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;