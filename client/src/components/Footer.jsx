import React from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { FaBehance } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-100 mt-auto">
      
      {/* Upper Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Editorial Philosophy */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black text-zinc-950 uppercase tracking-widest">
              Philosophy
            </h4>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[32ch]">
              We believe in ideas that outlast the news cycle. BlogiSphere is a platform for deliberate reading, clear thought, and stories that matter.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-black text-zinc-950 uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { name: 'Featured Stories', link: '/' },
                { name: 'Latest Narratives', link: '/' },
                { name: 'Write a Post', link: '/create' },
                { name: 'My Profile', link: '/profile' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={item.link} className="text-sm text-zinc-500 hover:text-brand transition-colors duration-200 font-medium">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black text-zinc-950 uppercase tracking-widest">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-1 text-sm text-zinc-500">
              <a href="mailto:hello@blogisphere.com" className="hover:text-brand transition-colors duration-200 font-semibold">
                hello@blogisphere.com
              </a>
              <span className="font-medium">+08455-3354-202</span>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-zinc-400 mt-2">
              <a href="#" className="hover:text-brand transition-all duration-200 hover:scale-110 p-1 bg-white border border-zinc-200/60 rounded-none shadow-xs" title="Facebook">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-brand transition-all duration-200 hover:scale-110 p-1 bg-white border border-zinc-200/60 rounded-none shadow-xs" title="Instagram">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-brand transition-all duration-200 hover:scale-110 p-1 bg-white border border-zinc-200/60 rounded-none shadow-xs" title="Behance">
                <FaBehance className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-brand transition-all duration-200 hover:scale-110 p-1 bg-white border border-zinc-200/60 rounded-none shadow-xs" title="Twitter">
                <FiTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Logo Bar */}
      <div className="bg-white border-t border-zinc-200/60 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          <div className="flex items-center gap-2 text-zinc-950">
            <span className="text-xs font-black tracking-tighter">BlogiSphere</span>
            <span className="text-zinc-400 font-semibold normal-case">
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-brand transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-brand transition-colors duration-200">Contact</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
