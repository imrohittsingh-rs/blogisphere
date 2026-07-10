import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const EditBlog = () => {
  const { id } = useParams();
  const { currentUser, blogs, updateBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  const blog = blogs.find(b => b._id === id);

  const [title, setTitle] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize and check authorization
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!blog) {
      navigate('/');
      return;
    }

    // Check authorization: only creator or admin can edit
    if (blog.createby._id !== currentUser._id && currentUser.role !== "ADMIN") {
      navigate('/');
      return;
    }

    setTitle(blog.title);
    setCoverImageUrl(blog.coverImageUrl || '');
    setBody(blog.body);
  }, [blog, currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !body.trim()) {
      setError("Title and content body are required.");
      return;
    }

    setLoading(true);

    // Simulate submission delay
    setTimeout(() => {
      const res = updateBlog(id, title, body, coverImageUrl);
      setLoading(false);
      if (res.success) {
        navigate(`/blog/${id}`);
      } else {
        setError(res.error);
      }
    }, 600);
  };

  if (!currentUser || !blog) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Your Article</h1>
        <p className="text-slate-500 text-sm mt-1">
          Make updates to your article structure, text, or cover image.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Article Title
          </label>
          <input 
            type="text" 
            placeholder="e.g. Mastering React Server Components" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-slate-50/50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
            <span>Cover Image URL (Optional)</span>
            <span className="text-[10px] text-slate-400 font-normal">Leave empty for default image</span>
          </label>
          <input 
            type="url" 
            placeholder="e.g. https://images.unsplash.com/photo-..." 
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-slate-50/50"
          />
          {coverImageUrl && (
            <div className="mt-3 relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 animate-in fade-in duration-200">
              <img 
                src={coverImageUrl} 
                alt="Cover Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80';
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Content Body
          </label>
          <textarea 
            rows={12}
            placeholder="Write your article body here..." 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-slate-50/50 font-sans resize-y leading-relaxed"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
          <button 
            type="button" 
            onClick={() => navigate(`/blog/${id}`)}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving Changes...
              </>
            ) : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
