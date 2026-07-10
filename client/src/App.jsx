import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BlogProvider } from './context/BlogContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import BlogDetails from './pages/BlogDetails'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'

const App = () => {
  return (
    <BlogProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/edit/:id" element={<EditBlog />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </BlogProvider>
  )
}

export default App