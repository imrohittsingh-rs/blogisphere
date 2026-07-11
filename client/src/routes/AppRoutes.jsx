import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import BlogDetails from '../pages/BlogDetails';
import CreateBlog from '../pages/CreateBlog';
import EditBlog from '../pages/EditBlog';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;