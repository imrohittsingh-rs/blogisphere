import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiGithub } from "react-icons/fi";
import { FaBehance } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-100 mt-auto">
      
      {/* Upper Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Editorial Philosophy */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xl font-black tracking-tighter text-zinc-950 hover:opacity-85 transition-opacity flex items-center gap-1.5">
              BlogiSphere <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            </h4>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[32ch]">
              BlogiSphere is a modern publishing platform where ideas, knowledge, and stories come together. Write, discover, and inspire through meaningful content.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-black text-zinc-950 uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { name: 'Home', link: '/' },
                { name: 'Explore Stories', link: '/' },
                { name: 'Write a Story', link: '/create' },
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
              Made with ❤️ by Rohit Singh
            </h4>
            <div className="flex flex-col gap-1 text-sm text-zinc-500">
              Have feedback?
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-zinc-400 mt-2">
              <a href="https://github.com/imrohittsingh-rs/" className="hover:text-brand transition-all duration-200 hover:scale-110 p-1 bg-white border border-zinc-200/60 rounded-none shadow-xs" title="Github" target="_blank">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/imrohittsingh/" className="hover:text-brand transition-all duration-200 hover:scale-110 p-1 bg-white border border-zinc-200/60 rounded-none shadow-xs" title="Instagram" target="_blank">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/imrohittsingh/" className="hover:text-brand transition-all duration-200 hover:scale-110 p-1 bg-white border border-zinc-200/60 rounded-none shadow-xs" title="Twitter" target="_blank">
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
            <span className="text-xs font-semibold tracking-tighter">BlogiSphere</span>
            <span className="text-zinc-400 font-semibold normal-case">
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
