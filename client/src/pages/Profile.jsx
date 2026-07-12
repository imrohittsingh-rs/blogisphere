import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        <FiLoader className="animate-spin h-10 w-10 text-blue-600" />
        <p className="text-slate-500 font-medium text-sm">Loading your profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />


          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-4xl border-2 border-blue-200 shadow-md shrink-0">
            {user.fullname ? user.fullname[0].toUpperCase() : "U"}
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
              {user.fullname}
            </h1>
            <p className="text-slate-500 text-sm mb-4">{user.email}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                <FiBookOpen className="w-3.5 h-3.5" />
                {myBlogs.length} {myBlogs.length === 1 ? 'Article' : 'Articles'} Published
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Published Stories</h2>
            {myBlogs.length > 0 && (
              <Link
                to="/create"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
              >
                <FiEdit3 className="w-4 h-4" />
                <span>Write a Post</span>
              </Link>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-center text-sm mb-8">
              {error}
            </div>
          )}

          {myBlogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-md max-w-2xl mx-auto px-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiBookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Published Articles</h3>
              <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                You haven't written any stories yet. Start sharing your ideas and stories with the world today.
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
              >
                <FiEdit3 className="w-4 h-4" />
                <span>Create Your First Post</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;