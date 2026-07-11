import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { createBlog } from "../services/blogService.js";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if(authLoading) return;

    if (!user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.body) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("body", formData.body);
      if (coverImage) {
        data.append("coverImage", coverImage);
      }

      await createBlog(data);
      toast.success("Blog created successfully!");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong!";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl border border-slate-100 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Add New Blog</h2>
          <p className="text-slate-500 text-sm mt-2">
            Share your stories, ideas, and knowledge with the world.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-3">
            <MdOutlineErrorOutline size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter a catchy title..."
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-slate-50/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Body
            </label>
            <textarea
              name="body"
              placeholder="Write your story here..."
              value={formData.body}
              onChange={handleChange}
              rows="8"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-slate-50/50 resize-y"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-slate-50/50 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {coverImage && (
              <p className="text-xs text-emerald-600 font-medium mt-2 ml-1">
                Selected: {coverImage.name}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-1/2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-center text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin h-5 w-5 text-white" />
                  Creating...
                </>
              ) : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;