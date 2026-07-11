import React, { useEffect, useState } from 'react';
import { getAllBlogs } from "../services/blogService.js";
import { FiLoader } from "react-icons/fi";
import BlogCard from '../components/BlogCard';
import Hero from '../components/Hero';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Recent Articles</h1>
            <p className="text-slate-500 text-sm mt-1">
              Explore the latest stories, insights, and ideas.
            </p>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;