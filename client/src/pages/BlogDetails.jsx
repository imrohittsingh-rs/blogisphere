import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs, currentUser, deleteBlog } = useContext(BlogContext);
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const blog = blogs.find(b => b._id === id);

  if (!blog) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto w-16 h-16 text-slate-400 mb-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <h2 className="text-2xl font-bold text-slate-800">Article not found</h2>
        <p className="text-slate-500 mt-2 mb-8">
          The article you are looking for might have been deleted or does not exist.
        </p>
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-sm transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const { title, body, coverImageUrl, createby, createdAt } = blog;
  const isAuthor = currentUser && (currentUser._id === createby._id || currentUser.role === "ADMIN");

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDelete = () => {
    const res = deleteBlog(id);
    if (res.success) {
      navigate('/');
    } else {
      alert(res.error);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-in fade-in duration-300">
      {/* Back button */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-semibold mb-8 group transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to feed
      </Link>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img 
              src={createby?.profileImageUrl} 
              alt={createby?.fullname} 
              className="w-12 h-12 rounded-full bg-slate-100 border border-slate-100 object-cover"
            />
            <div>
              <div className="text-slate-800 font-bold text-base leading-snug">
                {createby?.fullname}
              </div>
              <div className="text-slate-400 text-xs mt-0.5">
                Published on {formattedDate}
              </div>
            </div>
          </div>

          {/* Action buttons (Edit/Delete) */}
          {isAuthor && (
            <div className="flex items-center gap-3">
              <Link 
                to={`/edit/${id}`}
                className="bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-slate-300 font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-sm"
              >
                Edit Post
              </Link>
              <button 
                onClick={() => setDeleteConfirm(true)}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-xl text-sm transition shadow-sm border border-red-100 hover:border-red-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Delete Confirmation Modal Overlay */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl animate-in scale-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900">Delete article?</h3>
            <p className="text-slate-500 text-sm mt-2">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button 
                onClick={() => setDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cover Image */}
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-sm border border-slate-100 bg-slate-50">
        <img 
          src={coverImageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body Content */}
      <div className="prose prose-slate max-w-none">
        {body.split('\n').map((paragraph, index) => {
          if (!paragraph.trim()) return null;
          return (
            <p key={index} className="text-slate-700 text-lg leading-relaxed mb-6 font-normal">
              {paragraph}
            </p>
          );
        })}
      </div>
    </article>
  );
};

export default BlogDetails;
