import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiBookOpen, FiClock } from 'react-icons/fi';

// Import fallback image for when coverImageUrl is not provided
import editorialWorkspace from '../assets/images/munfarid/editorial_workspace.png';

const BlogCard = ({ blog, index = 0 }) => {
  if (!blog) return null;

  // Use database cover image or fallback image
  const coverImage = blog.coverImageUrl || editorialWorkspace;
  
  // Format date
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  // Calculate read time
  const readTime = Math.max(1, Math.round((blog.body || '').split(' ').length / 200));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: Math.min(0.3, index * 0.05),
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <div className="h-full w-full rounded-3xl border border-zinc-200/60 bg-zinc-50/20 backdrop-blur-md transition-all duration-300 hover:border-brand/45 hover:shadow-lg hover:shadow-brand/5 overflow-hidden flex flex-col">
        <Link to={`/blog/${blog._id}`} className="flex flex-col group cursor-pointer h-full justify-between">
          
          {/* Image & Badges Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 border-b border-zinc-200/40">
            <img
              src={coverImage}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
              loading="lazy"
            />
            
            {/* Dark gradient shadow */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              <span className="bg-white/80 backdrop-blur-md text-black text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 shadow-xs capitalize">
                {blog.category}
              </span>
              {blog.tags && blog.tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag} 
                  className="bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/10 capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Hover overlay read action */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/15 backdrop-blur-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-md shadow-brand/20 transition-all btn-tactile">
                <FiBookOpen className="w-3.5 h-3.5" />
                Read Article
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex flex-col flex-grow p-5 justify-between gap-5">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-zinc-950 leading-snug tracking-tight group-hover:text-brand transition-colors duration-200 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-normal line-clamp-2">
                {blog.body}
              </p>
            </div>

            {/* Footer with author and date */}
            <div className="flex items-center justify-between border-t border-zinc-200/50 pt-4 mt-auto">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-xs border border-brand/20 shadow-sm transition-transform hover:scale-105 shrink-0">
                  {blog.createdBy?.fullname ? blog.createdBy.fullname[0].toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] font-semibold text-zinc-900 uppercase tracking-wide">
                    {blog.createdBy?.fullname || 'Anonymous'}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-semibold uppercase tracking-widest mt-0.5">{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">
                <FiClock className="w-3.5 h-3.5 text-brand shrink-0" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
          
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;