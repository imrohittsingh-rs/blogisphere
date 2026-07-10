import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { _id, title, body, coverImageUrl, createby, createdAt } = blog;
  
  // Format creation date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Create description snippet
  const snippet = body && body.length > 120 
    ? `${body.substring(0, 120)}...` 
    : body;

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Cover Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img 
          src={coverImageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-xs font-semibold text-blue-600 px-3 py-1 rounded-full border border-slate-200/50 shadow-sm">
          Article
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
          <span>{formattedDate}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <span>5 min read</span>
        </div>

        <h3 className="text-xl font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-2">
          <Link to={`/blog/${_id}`}>
            {title}
          </Link>
        </h3>

        <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6 flex-grow">
          {snippet}
        </p>

        {/* Author Footer */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-50 mt-auto">
          <img 
            src={createby?.profileImageUrl || 'https://api.dicebear.com/7.x/avataaars/svg'} 
            alt={createby?.fullname}
            className="w-8 h-8 rounded-full bg-slate-100 object-cover border border-slate-100"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-700 truncate">{createby?.fullname || 'Anonymous'}</span>
            <span className="text-[10px] text-slate-400 font-medium">Author</span>
          </div>
          <Link 
            to={`/blog/${_id}`}
            className="ml-auto text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            Read
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
