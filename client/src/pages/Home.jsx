import React, { useContext, useState, useRef } from 'react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import { BlogContext } from '../context/BlogContext';

const Home = () => {
  const { blogs } = useContext(BlogContext);
  const [searchQuery, setSearchQuery] = useState('');
  const blogListRef = useRef(null);

  const handleScrollToBlogs = () => {
    blogListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredBlogs = blogs.filter(blog => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.body.toLowerCase().includes(query) ||
      blog.createby?.fullname.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <Hero onExploreClick={handleScrollToBlogs} />
      
      {/* Blog List Section */}
      <section 
        ref={blogListRef} 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest Articles
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Stay updated with the latest trends, guides, and tutorials.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search blogs or authors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm shadow-sm bg-white"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto w-12 h-12 text-slate-400 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-800">No blogs found</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
              We couldn't find any articles matching "{searchQuery}". Try adjusting your keywords.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm hover:shadow transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
