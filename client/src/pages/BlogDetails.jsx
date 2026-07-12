import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlogById, deleteBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext.jsx';
import { FiLoader, FiArrowLeft, FiEdit3, FiTrash2, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

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
        <FiLoader className="animate-spin h-10 w-10 text-blue-600" />
        <p className="text-slate-500 font-medium text-sm">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-100 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <FiArrowLeft className="w-6 h-6 rotate-45" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Error Loading Article</h3>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all text-sm cursor-pointer shadow-md hover:shadow-lg"
          >
            <FiArrowLeft /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const isAuthor = user && (user._id === blog.createdBy?._id || user.id === blog.createdBy?._id);

  const readTime = Math.max(1, Math.round(blog.body.split(' ').length / 200));

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-semibold text-sm transition-all cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to articles</span>
          </button>

          {isAuthor && (
            <div className="flex items-center gap-3">
              <Link
                to={`/edit/${blog._id}`}
                className="flex items-center gap-2 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-semibold py-2 px-4 rounded-xl transition-all text-sm shadow-sm"
              >
                <FiEdit3 className="w-4 h-4 text-blue-500" />
                <span>Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 font-semibold py-2 px-4 rounded-xl transition-all text-sm disabled:opacity-50 cursor-pointer"
              >
                {deleting ? (
                  <FiLoader className="animate-spin w-4 h-4" />
                ) : (
                  <FiTrash2 className="w-4 h-4" />
                )}
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base border border-blue-200 shadow-sm">
                  {blog.createdBy?.fullname ? blog.createdBy.fullname[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    {blog.createdBy?.fullname || 'Anonymous'}
                  </h4>
                  <p className="text-xs text-slate-500">{blog.createdBy?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                <span>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1">
                  <FiClock className="w-3.5 h-3.5" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </header>

          {blog.coverImageUrl && (
            <div className="w-full max-h-[450px] rounded-2xl overflow-hidden mb-8 shadow-sm border border-slate-100">
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <section className="text-slate-800 leading-relaxed text-base sm:text-lg whitespace-pre-line">
            {blog.body}
          </section>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;