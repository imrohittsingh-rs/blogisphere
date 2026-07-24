import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext.jsx';
import { createBlog } from "../services/blogService.js";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import toast from 'react-hot-toast';

const CATEGORIES = [
  "Technology",
  "Programming",
  "AI & Machine Learning",
  "Web Development",
  "Mobile Development",
  "Cybersecurity",
  "Cloud Computing",
  "Data Science",

  "Design",
  "UI/UX",

  "Startups",
  "Business",
  "Finance",

  "Productivity",
  "Career",

  "Writing",
  "Education",

  "Lifestyle",
  "Health & Fitness",
  "Travel",
  "Food",

  "Entertainment",
  "Books",
  "Gaming",

  "Science",
  "Environment",

  "Personal",
  "Other"
];

const CreateBlog = () => {
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

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

    if (!formData.title || !formData.body || !formData.category) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("body", formData.body);
      data.append("category", formData.category);
      data.append("tags", JSON.stringify(tags));
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

  const handleKeyDown = (e) => {
    if(e.key !== "Enter") return;

    e.preventDefault();
    const tag = tagInput.trim();
    if(tag.length > 15) {
      setError("Tag cannot be longer than 15 characters");
      return;
    }
    if(tags.length > 4) {
      setError("You can add a maximum of 5 tags");
      return;
    }
    if(tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
      setTagInput("");
      setError("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    setError("");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-16 bg-white selection:bg-amber-100 selection:text-amber-900">
      <motion.div 
        className="w-full max-w-2xl bg-zinc-50/50 p-8 md:p-12 border border-zinc-200/60 shadow-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-zinc-950 tracking-tight">Write Your Next Story</h2>
          <p className="text-zinc-500 text-xs mt-2 font-medium">
            Every great story starts with a single paragraph. Start writing today.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-650 text-xs font-bold uppercase tracking-wider flex items-center gap-3">
            <MdOutlineErrorOutline size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-2">
              Story Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. How I Built My First MERN Project"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-zinc-800 placeholder-zinc-400 border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-sm rounded-none font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white text-zinc-800 border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-sm rounded-none font-medium cursor-pointer"
              required
            >
              <option value="" disabled>Select a Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="body"
              placeholder="Write something worth sharing..."
              value={formData.body}
              onChange={handleChange}
              rows="8"
              className="w-full px-4 py-3 bg-white text-zinc-800 placeholder-zinc-400 border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-sm rounded-none resize-y font-normal leading-relaxed"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-2">
              Tags {error && <span className="text-red-500 text-[8px] font-medium ml-2">({error})</span>}
            </label>
            <input
              type="text"
              name="tagInput"
              placeholder="Type a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 bg-white text-zinc-800 placeholder-zinc-400 border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-sm rounded-none font-medium mb-3"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-zinc-200 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-zinc-400 hover:text-red-650 cursor-pointer font-bold text-xs"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 bg-white text-zinc-500 border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-xs rounded-none file:mr-4 file:py-1 file:px-3 file:rounded-none file:border file:border-zinc-200 file:text-[10px] file:font-black file:uppercase file:tracking-wider file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 hover:file:text-zinc-900 cursor-pointer"
            />
            {coverImage && (
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-2">
                Selected: {coverImage.name}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-1/2 border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-500 font-bold py-3.5 px-4 transition-colors text-[10px] tracking-widest uppercase rounded-none cursor-pointer btn-tactile"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-zinc-950 text-white hover:bg-brand hover:border-brand transition-all duration-200 font-bold py-3.5 px-4 text-[10px] tracking-widest uppercase border border-zinc-950 rounded-none disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer btn-tactile"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin h-3.5 w-3.5 text-current" />
                  Creating...
                </>
              ) : "Create Blog"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBlog;