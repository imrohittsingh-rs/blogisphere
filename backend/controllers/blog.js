import Blog from "../models/blog.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const handleCreateBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const blog = await Blog.create({
    title,
    body: content,
    createby: req.user._id,
    coverImageUrl: req.file ? `/uploads/${req.file.filename}` : null,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, blog, "Blog created successfully"))
})

const handleAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("createdby", "fullname", "email");

  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs fetched successfully"))
})

const handleGetBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdby", "fullname", "email");

  if (!blog) {
    throw new ApiError(404, "Blog not found")
  }

  return res
    .status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"))
})

const handleUpdateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found")
  }

  // Authorization check
  if (blog.createby.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to update this blog"
    )
  }

  const { title, body } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
    title,
    body,
    coverImageUrl: req.file ? `/uploads/${req.file.filename}` : blog.coverImageUrl,
  }, { new: true })

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"))
})

const handleDeleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found")
  }

  // Authorization check
  if (blog.createby.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to delete this blog"
    )
  }

  await Blog.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Blog deleted successfully"))
})

export {
  handleCreateBlog,
  handleAllBlogs,
  handleGetBlogById,
  handleUpdateBlog,
  handleDeleteBlog,
};
