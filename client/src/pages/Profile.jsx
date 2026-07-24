import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext.jsx';
import { getAllBlogs } from '../services/blogService.js';
import BlogCard from '../components/BlogCard';
import { FiLoader, FiBookOpen, FiEdit3 } from 'react-icons/fi';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyBlogs = async () => {
      try {
        const res = await getAllBlogs();

        const userId = user._id || user.id;

        const filtered = (res.data || []).filter(
          (blog) => blog.createdBy?._id === userId
        );

        setMyBlogs(filtered);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [user, authLoading, navigate]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <FiLoader className="animate-spin h-10 w-10 text-brand" />
        <p className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Loading your profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white py-12 px-6 selection:bg-amber-100 selection:text-amber-900">
      <div className="max-w-7xl mx-auto">

        {/* User Card */}
        <motion.div 
          className="bg-zinc-50 border border-zinc-200/60 p-8 mb-12 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-20 h-20 bg-brand text-white flex items-center justify-center font-black text-3xl border border-brand/20 shadow-xs shrink-0 rounded-none">
            {user.fullname ? user.fullname[0].toUpperCase() : "U"}
          </div>

          <div className="grow text-center md:text-left">
            <h1 className="text-2xl font-black text-zinc-950 tracking-tight mb-1">
              {user.fullname}
            </h1>
            <p className="text-zinc-500 text-xs font-semibold lowercase tracking-wider mb-4">{user.email}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black capitalize tracking-widest bg-brand-light/45 text-amber-900 border border-brand/10">
                <FiBookOpen className="w-3.5 h-3.5 text-brand" />
                {myBlogs.length} {myBlogs.length === 1 ? 'Article' : 'Articles'} Published
              </span>
            </div>
          </div>
        </motion.div>

        {/* Published Stories section */}
        <div>
          <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-zinc-950 tracking-tight">Your Published Stories</h2>
              <p className="text-xs text-zinc-400 mt-1 font-medium">Manage and view stories you have written</p>
            </div>
            {myBlogs.length > 0 && (
              <Link
                to="/create"
                className="flex items-center justify-center gap-2 bg-zinc-950 text-white hover:bg-brand transition-colors font-bold py-2.5 px-4 text-[10px] tracking-widest uppercase border border-zinc-950 hover:border-brand rounded-none btn-tactile"
              >
                <FiEdit3 className="w-4 h-4" />
                <span>Write a Post</span>
              </Link>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 border border-red-100 text-center text-xs font-bold uppercase tracking-wider mb-8">
              {error}
            </div>
          )}

          {myBlogs.length === 0 ? (
            <motion.div 
              className="text-center py-20 bg-zinc-50/50 border border-zinc-200/60 max-w-2xl mx-auto px-6 shadow-xs"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 bg-white border border-zinc-200 text-zinc-400 rounded-none flex items-center justify-center mx-auto mb-6 shadow-xs">
                <FiBookOpen className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-lg font-black text-zinc-950 mb-2 uppercase tracking-tight">No Published Articles</h3>
              <p className="text-zinc-500 text-sm mb-8 max-w-sm mx-auto font-normal">
                You haven't written any stories yet. Start sharing your ideas and stories with the world today.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 bg-zinc-950 text-white hover:bg-brand transition-colors font-bold py-3.5 px-6 text-[10px] tracking-widest uppercase border border-zinc-950 hover:border-brand rounded-none btn-tactile"
              >
                <FiEdit3 className="w-4 h-4" />
                <span>Create Your First Post</span>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {myBlogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;