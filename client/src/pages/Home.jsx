import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getAllBlogs } from "../services/blogService.js";
import BlogCard from "../components/BlogCard.jsx";
import Hero from "../components/Hero.jsx";
import PrevButton from "../components/PrevButton.jsx";
import NextButton from "../components/NextButton.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { FiLoader, FiCode, FiCpu, FiPenTool, FiZap, FiCheckSquare, FiEdit3, FiGlobe, FiMonitor } from "react-icons/fi";

  // Explore by Category 
  const exploreCategories = [
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
      id: 'web development',
      name: 'Web Development',
      icon: <FiMonitor className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors" />
    }
  ];

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // fetch all blogs
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

  // Filter dynamic blogs based search query selection
  const query = searchQuery.toLowerCase();
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(query) ||
      blog.body.toLowerCase().includes(query) ||
      blog.category.toLowerCase().includes(query) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(query)) ||
      blog.createdBy.fullname.toLowerCase().includes(query) ||
      blog.createdBy.email.toLowerCase().includes(query);

    const matchesCategory =
      !selectedCategory ||
      blog.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });


  const handleCategoryClick = (category) => {
    setSelectedCategory(prev => prev === category ? "" : category);
  };

  // Pagination calculations
  const blogsPerPage = 6;
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage) || 1;

  // Reset to Page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory])

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-800 antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* Hero Section */}
      <Hero />

      {/* Category Tiles */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-t border-zinc-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-bold text-zinc-950 tracking-tight">Explore by Category</h3>
            <p className="text-xs text-zinc-400 mt-1 font-medium">Discover stories across your favorite interests.</p>
          </div>
          <button
            onClick={() => setSelectedCategory("")}
            className="text-[10px] font-bold tracking-widest text-zinc-400 hover:text-brand uppercase transition-colors self-start sm:self-auto cursor-pointer border border-zinc-200/65 py-1 px-3"
          >
            Clear Filter
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {exploreCategories.map((topic, i) => (
            <motion.button
              key={topic.id}
              onClick={() => handleCategoryClick(topic.id)}
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

      {/* All blogs  */}
      <section id="latest-stories" className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-100">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-lg font-bold text-zinc-950 tracking-tight">Latest Stories</h3>
          
          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

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
            {currentBlogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
            
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <PrevButton currentPage={currentPage} setCurrentPage={setCurrentPage} />

          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest select-none">
            Page {currentPage} of {totalPages}
          </span>

          <NextButton setCurrentPage={setCurrentPage} disabled={currentPage === totalPages} />
        </div>
      </section>

    </div>
  );
};

export default Home;