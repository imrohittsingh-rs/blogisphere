import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll } from 'motion/react';
import { getBlogById, deleteBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext.jsx';
import { FiLoader, FiArrowLeft, FiEdit3, FiTrash2, FiClock, FiAlertTriangle, FiHome, FiBookOpen, FiUser, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import NotFound from './NotFound';

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
    return <NotFound />;
  }

  if (!blog) return null;

  // Check if the user is the author of the blog
  const isAuthor = user && (user.id === blog.createdBy?._id);

  // Calculate the read time of the blog
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

        <motion.article 
          className="border border-zinc-200/60 bg-zinc-50/30 p-8 md:p-12 shadow-xs"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <header className="mb-10">

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

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-zinc-950 tracking-wide leading-tight mb-8">
              {blog.title}
            </h1>

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

          {blog.coverImageUrl && (
            <div className="w-full overflow-hidden mb-10 border border-zinc-200/60 shadow-xs">
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                className="w-full object-cover max-h-[500px]"
              />
            </div>
          )}

          <section className="text-zinc-700 leading-relaxed text-base md:text-[17px] whitespace-pre-line font-normal max-w-[65ch] mx-auto font-sans">
            {blog.body}
          </section>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogDetails;