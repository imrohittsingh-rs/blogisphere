import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

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

  // Get categories/tags or default
  const categories = blog.tags && blog.tags.length > 0 
    ? blog.tags.slice(0, 2).join(', ') 
    : (blog.category || 'Food, Travel');

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
      <Link to={`/blog/${blog._id}`} className="flex flex-col group cursor-pointer h-full">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 mb-5 border border-zinc-100/70">
          <img
            src={coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
            loading="lazy"
          />
        </div>

        {/* Metadata */}
        <div className="text-[10px] font-black tracking-widest text-zinc-400 uppercase mb-2">
          {categories} — {formattedDate}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-zinc-950 leading-snug mb-3 group-hover:text-brand transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-zinc-500 leading-relaxed font-normal line-clamp-3">
          {blog.body}
        </p>
      </Link>
    </motion.div>
  );
};

export default BlogCard;