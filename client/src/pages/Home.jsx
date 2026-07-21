import React, { useEffect, useState } from 'react';
import { getAllBlogs } from "../services/blogService.js";
import { FiLoader, FiSearch, FiX, FiSliders } from "react-icons/fi";
import BlogCard from '../components/BlogCard';
import Hero from '../components/Hero';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

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

  // Filtering & Sorting
  const query = searchTerm.toLowerCase();

  const filteredBlogs = blogs
    .filter((blog) => {
      return (
        blog.title?.toLowerCase().includes(query) ||
        blog.body?.toLowerCase().includes(query) ||
        blog.createdBy?.fullname?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "title_asc":
          return (a.title || "").localeCompare(b.title || "");

        case "title_desc":
          return (b.title || "").localeCompare(a.title || "");

        default:
          return 0;
      }
    });

  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Title and Search/Sort Bar */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Recent Articles
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Explore the latest stories, insights, and ideas.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Box */}
            <div className="relative min-w-[240px] sm:min-w-[300px]">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title, content, author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-slate-800 text-sm pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-xs transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white text-slate-700 text-sm font-medium pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 shadow-xs transition cursor-pointer appearance-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title_asc">Title (A-Z)</option>
                  <option value="title_desc">Title (Z-A)</option>
                </select>
                <FiSliders className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="min-h-[30vh] flex flex-col items-center justify-center gap-3">
            <FiLoader className="animate-spin h-8 w-8 text-blue-600" />
            <p className="text-slate-500 font-medium text-sm">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="min-h-[30vh] flex flex-col items-center justify-center text-red-500 font-medium">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-medium">No blog posts found. Be the first to write one!</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <p className="text-slate-600 font-semibold">No articles found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;