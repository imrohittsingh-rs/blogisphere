import Blog from "../models/blog.js";

async function handleCreateBlog(req, res) {
  const { title, content } = req.body;

  const blog = await Blog.create({
    title,
    body: content,
    createby: req.user._id,
    coverImageUrl: req.file ? `/uploads/${req.file.filename}` : null,
  });
  return res.redirect(`/blog/${blog._id}`);
}

async function handleAllBlogs(req, res) {
  const blogs = await Blog.find({});
  return res.render("home", { blogs });
}

async function handleGetBlogById(req, res) {
  const blog = await Blog.findById(req.params.id);
  return res.render("blog", { blog });
}

async function handleUpdateBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if(!blog) {
    return res.status(404).send("Blog not found");
  }
  
}

async function handleDeleteBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if(!blog) {
    return res.status(404).send("Blog not found");
  }
  await Blog.findByIdAndDelete(req.params.id);
  return res.render("deleteBlog", { blogId: req.params.id });
}

export {
  handleCreateBlog,
  handleAllBlogs,
  handleGetBlogById,
  handleUpdateBlog,
  handleDeleteBlog,
};
