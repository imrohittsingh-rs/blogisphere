import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll } from 'motion/react';
import { getBlogById, deleteBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext.jsx';
import { FiLoader, FiArrowLeft, FiEdit3, FiTrash2, FiClock, FiAlertTriangle, FiHome, FiBookOpen, FiUser, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { scrollYProgress } = useScroll();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getBlogById(id);
        setBlog(res.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    setDeleting(true);
    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <FiLoader className="animate-spin h-10 w-10 text-brand" />
        <p className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Loading article...</p>
      </div>
    );
  }

  if (error) {
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
          {/* Top Alert Icon Container */}
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 border border-red-100/50 text-red-500 mb-6 shadow-xs">
            <FiAlertTriangle className="w-5 h-5" />
          </div>

          {/* Headers */}
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-none mb-3">
            Error Loading Article
          </h1>
          <p className="text-sm text-zinc-500 max-w-md mx-auto mb-10 font-normal">
            {error}
          </p>

          {/* 2x2 Grid of Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mb-10 text-left">
            {links.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className="flex items-center justify-between p-4 bg-zinc-50/50 border border-zinc-200/60 hover:border-brand hover:bg-zinc-50 transition-all duration-200 group cursor-pointer shadow-2xs"
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
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-brand text-white border border-zinc-950 hover:border-brand font-bold py-3.5 px-6 text-[10px] tracking-widest uppercase cursor-pointer btn-tactile"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </motion.div>
      </div>
    );
  }

  if (!blog) return null;

  const isAuthor = user && (user._id === blog.createdBy?._id || user.id === blog.createdBy?._id);
  const readTime = Math.max(1, Math.round((blog.body || '').split(' ').length / 200));

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  return (
    <div className="min-h-screen bg-white py-12 px-6 relative selection:bg-amber-100 selection:text-amber-900">
      {/* Scroll progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-4xl mx-auto">
        
        {/* Top bar with back and actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4 text-brand" />
            <span>Back to articles</span>
          </button>

          {isAuthor && (
            <div className="flex items-center gap-3">
              <Link
                to={`/edit/${blog._id}`}
                className="flex items-center gap-2 border border-zinc-200 bg-white text-zinc-700 hover:text-brand hover:border-brand font-bold py-2 px-4 text-xs uppercase tracking-wider transition-all btn-tactile"
              >
                <FiEdit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 border border-red-100 bg-red-50 text-red-600 hover:bg-red-100/70 font-bold py-2 px-4 text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer btn-tactile"
              >
                {deleting ? (
                  <FiLoader className="animate-spin w-3.5 h-3.5" />
                ) : (
                  <FiTrash2 className="w-3.5 h-3.5" />
                )}
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Article content */}
        <motion.article 
          className="border border-zinc-200/60 bg-zinc-50/30 p-8 md:p-12 shadow-xs"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <header className="mb-10">
            {/* Tag/Category Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center bg-brand-light text-brand px-3 py-1 text-[10px] font-semibold capitalize tracking-widest border border-brand/10 rounded-4xl">
                {blog.category}
              </span>
              {blog.tags && blog.tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center bg-zinc-100 text-zinc-650 px-3 py-1 text-[10px] font-semibold capitalize tracking-widest border border-zinc-200/65 rounded-4xl"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-zinc-950 tracking-wide leading-tight mb-8">
              {blog.title}
            </h1>

            {/* Author details */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-zinc-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm border border-brand/20 shadow-sm">
                  {blog.createdBy?.fullname ? blog.createdBy.fullname[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 leading-none mb-1">
                    {blog.createdBy?.fullname || 'Anonymous'}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium leading-none">{blog.createdBy?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                <span>{formattedDate}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span className="flex items-center gap-1.5">
                  <FiClock className="w-3.5 h-3.5 text-brand" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </header>

          {/* Cover image */}
          {blog.coverImageUrl && (
            <div className="w-full overflow-hidden mb-10 border border-zinc-200/60 shadow-xs">
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                className="w-full object-cover max-h-[500px]"
              />
            </div>
          )}

          {/* Body */}
          <section className="text-zinc-700 leading-relaxed text-base md:text-[17px] whitespace-pre-line font-normal max-w-[65ch] mx-auto font-sans">
            {blog.body}
          </section>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogDetails;