import Blog from "../models/blog.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const handleCreateBlog = asyncHandler(async (req, res) => {
  const { title, body, coverImageUrl } = req.body;

  if (!title || !body) {
    throw new ApiError(400, "Title and body are required")
  }

  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user.id,
    coverImageUrl: req.file ? `/uploads/${req.file.filename}` : (coverImageUrl || null),
  });

  const populatedBlog = await blog.populate("createdBy", "fullname email profileImageUrl");;

  return res
    .status(201)
    .json(new ApiResponse(201, populatedBlog, "Blog created successfully"))
})

const handleAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("createdBy", "fullname email profileImageUrl");

  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs fetched successfully"))
})

const handleGetBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy", "fullname email profileImageUrl");

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
  if (blog.createdBy.toString() !== req.user.id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to update this blog"
    )
  }

  const { title, body, coverImageUrl } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
    title,
    body,
    coverImageUrl: req.file ? `/uploads/${req.file.filename}` : (coverImageUrl || blog.coverImageUrl),
  }, { new: true }).populate("createdBy", "fullname email profileImageUrl");

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
  if (blog.createdBy.toString() !== req.user.id.toString()) {
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
