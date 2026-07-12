import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';

const BlogCard = ({ blog }) => {
  if (!blog) return null;

  const readTime = Math.max(1, Math.round((blog.body || '').split(' ').length / 200));

  return (
    <Link
      to={`/blog/${blog._id}`}
      className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
    >

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-50">
        {blog.coverImageUrl ? (
          <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/50 flex items-center justify-center">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent opacity-60">
              BlogiSphere
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
          {blog.title}
        </h3>

        <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow">
          {blog.body}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200 shadow-sm">
              {blog.createdBy?.fullname ? blog.createdBy.fullname[0].toUpperCase() : 'U'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-700 leading-none mb-0.5">
                {blog.createdBy?.fullname || 'Anonymous'}
              </span>
              <span className="text-[10px] text-slate-400 leading-none">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <FiClock className="w-3.5 h-3.5" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;