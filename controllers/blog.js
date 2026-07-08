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

async function showUpdateBlogPage(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  return res.render("updateBlog", { error: null, blog });
}

async function handleUpdateBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  const { title, body } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title,
      body,
      coverImageUrl: req.file
        ? `/uploads/${req.file.filename}`
        : blog.coverImageUrl,
    },
    { new: true },
  );
  return res.redirect(`/blog/${updatedBlog._id}`);
}

async function showDeleteBlogPage(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  return res.render("deleteBlog", { error: null, blog });
}

async function handleDeleteBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  await Blog.findByIdAndDelete(req.params.id);
  return res.redirect("/");
}

export {
  handleCreateBlog,
  handleAllBlogs,
  handleGetBlogById,
  handleUpdateBlog,
  showUpdateBlogPage,
  showDeleteBlogPage,
  handleDeleteBlog,
};
