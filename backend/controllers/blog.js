import Blog from "../models/blog.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const handleCreateBlog = asyncHandler(async (req, res) => {
  const { title, body, category, tags } = req.body;

  if (!title || !body || !category) {
    throw new ApiError(400, "Title, body, and category are required")
  }

  let coverImageUrl = null;
  if (req.file) {
    const uploadedImage = await uploadOnCloudinary(req.file.path);
    if (uploadedImage) {
      coverImageUrl = uploadedImage.url
    }
  }

  let parsedTags = [];
  if (tags) {
    try {
      parsedTags = JSON.parse(tags);
      if (!Array.isArray(parsedTags)) {
        parsedTags = [parsedTags];
      }
    } catch (e) {
      if (typeof tags === 'string') {
        parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
      } else if (Array.isArray(tags)) {
        parsedTags = tags;
      }
    }
  }

  const blog = await Blog.create({
    title,
    body,
    category,
    tags: parsedTags,
    createdBy: req.user.id,
    coverImageUrl,
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

  const { title, body, category, tags } = req.body;

  if (!title || !body || !category) {
    throw new ApiError(400, "Title, body, and category are required")
  }

  let coverImageUrl = null;

  if (req.file) {
    const uploadedImage = await uploadOnCloudinary(req.file.path);
    if (uploadedImage) {
      coverImageUrl = uploadedImage.url
    }
  }

  let parsedTags = [];
  if (tags) {
    try {
      parsedTags = JSON.parse(tags);
      if (!Array.isArray(parsedTags)) {
        parsedTags = [parsedTags];
      }
    } catch (e) {
      if (typeof tags === 'string') {
        parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
      } else if (Array.isArray(tags)) {
        parsedTags = tags;
      }
    }
  }

  const updateFields = {
    title,
    body,
    category,
    tags: parsedTags,
  };

  if (coverImageUrl) {
    updateFields.coverImageUrl = coverImageUrl;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateFields, { new: true }).populate("createdBy", "fullname email profileImageUrl");

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
