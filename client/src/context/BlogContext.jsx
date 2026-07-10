import React, { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext(null);

const DEFAULT_USERS = [
  {
    _id: "user-1",
    fullname: "Sarah Connor",
    email: "sarah@example.com",
    password: "password123",
    profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    role: "USER"
  },
  {
    _id: "user-2",
    fullname: "Alex Johnson",
    email: "alex@example.com",
    password: "password123",
    profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    role: "ADMIN"
  }
];

const DEFAULT_BLOGS = [
  {
    _id: "blog-1",
    title: "The Future of Web Development with React 19",
    body: "React 19 is officially here, and it brings groundbreaking changes that redefine how we build user interfaces. The most significant introduction is built-in support for Server Components and the new Actions API, which simplifies form submissions and state updates dramatically.\n\nHistorically, handling pending states, error handling, and optimistic updates required extensive boilerplate code. With the new `useActionState` and `useFormStatus` hooks, React handles these transitions natively under the hood. In this guide, we will walk through setting up a form, managing loading states automatically, and taking advantage of the new document metadata tags support, allowing you to declare title, meta, and link tags anywhere in your component tree.",
    coverImageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80",
    createby: {
      _id: "user-1",
      fullname: "Sarah Connor",
      profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    createdAt: new Date("2026-07-01T10:00:00Z").toISOString()
  },
  {
    _id: "blog-2",
    title: "Mastering Tailwind CSS v4.0",
    body: "Tailwind CSS v4.0 is a massive leap forward for utility-first CSS. The core engine has been entirely rewritten in Rust, making builds up to 10 times faster than v3. But performance is only half the story. The way we configure Tailwind has also changed completely.\n\nInstead of a JavaScript configuration file (`tailwind.config.js`), Tailwind v4 is fully CSS-first. You configure your custom fonts, colors, and keyframes using CSS variables directly inside your main stylesheet. Additionally, v4 native support for modern CSS features like `@container` queries, wide-gamut colors (OKLCH), and automatic cascade layering makes it one of the most powerful styling tools ever built.",
    coverImageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    createby: {
      _id: "user-2",
      fullname: "Alex Johnson",
      profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    createdAt: new Date("2026-07-05T14:30:00Z").toISOString()
  },
  {
    _id: "blog-3",
    title: "10 Principles for Premium UI/UX Design",
    body: "Creating a premium user experience is about more than just slapping on a dark theme or using rounded corners. It is the art of balancing visual aesthetics, micro-interactions, responsive sizing, and cognitive ergonomics.\n\nIn this article, we outline ten key guidelines to elevate your design:\n1. Choose custom tailored color palettes (such as OKLCH or HSL) instead of plain primary colors.\n2. Embrace spacing and whitespace to let your content breathe.\n3. Make your layout feel alive with subtle hover effects and state transitions.\n4. Design intuitive loading states (like skeleton screens) to reduce perceived wait times.\n5. Optimize typography sizes, line-heights, and weights for readability across all device screens.\n\nKeep reading to see interactive comparisons showing how subtle design enhancements can make a massive difference in customer trust and product engagement.",
    coverImageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&auto=format&fit=crop&q=80",
    createby: {
      _id: "user-1",
      fullname: "Sarah Connor",
      profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    createdAt: new Date("2026-07-09T08:15:00Z").toISOString()
  }
];

export const BlogProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const localUsers = localStorage.getItem('blogify_users');
    return localUsers ? JSON.parse(localUsers) : DEFAULT_USERS;
  });

  const [blogs, setBlogs] = useState(() => {
    const localBlogs = localStorage.getItem('blogify_blogs');
    return localBlogs ? JSON.parse(localBlogs) : DEFAULT_BLOGS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const localUser = localStorage.getItem('blogify_current_user');
    return localUser ? JSON.parse(localUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('blogify_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('blogify_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('blogify_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('blogify_current_user');
    }
  }, [currentUser]);

  const signUp = (fullname, email, password) => {
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: "Email is already registered" };
    }

    const newUser = {
      _id: `user-${Date.now()}`,
      fullname,
      email,
      password,
      profileImageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullname)}`,
      role: "USER"
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, error: "Email is not registered, please sign up first" };
    }
    if (user.password !== password) {
      return { success: false, error: "Incorrect password, please try again" };
    }

    setCurrentUser(user);
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  const createBlog = (title, body, coverImageUrl) => {
    if (!currentUser) {
      return { success: false, error: "You must be logged in to create a blog" };
    }

    const newBlog = {
      _id: `blog-${Date.now()}`,
      title,
      body,
      coverImageUrl: coverImageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
      createby: {
        _id: currentUser._id,
        fullname: currentUser.fullname,
        profileImageUrl: currentUser.profileImageUrl
      },
      createdAt: new Date().toISOString()
    };

    setBlogs(prev => [newBlog, ...prev]);
    return { success: true, blogId: newBlog._id };
  };

  const updateBlog = (id, title, body, coverImageUrl) => {
    if (!currentUser) {
      return { success: false, error: "You must be logged in to update a blog" };
    }

    const blogIdx = blogs.findIndex(b => b._id === id);
    if (blogIdx === -1) {
      return { success: false, error: "Blog post not found" };
    }

    const blog = blogs[blogIdx];
    if (blog.createby._id !== currentUser._id && currentUser.role !== "ADMIN") {
      return { success: false, error: "You are not authorized to edit this blog" };
    }

    const updatedBlogs = [...blogs];
    updatedBlogs[blogIdx] = {
      ...blog,
      title,
      body,
      coverImageUrl: coverImageUrl || blog.coverImageUrl
    };

    setBlogs(updatedBlogs);
    return { success: true };
  };

  const deleteBlog = (id) => {
    if (!currentUser) {
      return { success: false, error: "You must be logged in to delete a blog" };
    }

    const blog = blogs.find(b => b._id === id);
    if (!blog) {
      return { success: false, error: "Blog post not found" };
    }

    if (blog.createby._id !== currentUser._id && currentUser.role !== "ADMIN") {
      return { success: false, error: "You are not authorized to delete this blog" };
    }

    setBlogs(prev => prev.filter(b => b._id !== id));
    return { success: true };
  };

  return (
    <BlogContext.Provider value={{
      users,
      blogs,
      currentUser,
      signUp,
      login,
      signOut,
      createBlog,
      updateBlog,
      deleteBlog
    }}>
      {children}
    </BlogContext.Provider>
  );
};
