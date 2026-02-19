import { Blog } from "../models/Blog.model.js";
import { ApiError } from "../utils/apiError.js";
import { UploadCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiRespnse.js";
const CreateBlog = async (req, res) => {
  try {
    const { title, content, tags, published } = req.body;

    if (!title?.trim() || !content?.trim()) {
      throw new ApiError(400, "Title and content are required");
    }

    if (!req.file) {
      throw new ApiError(400, "Image is required");
    }

    const coverImage = await UploadCloudinary(req.file.path);

    const newBlog = await Blog.create({
      title,
      content,
      image: coverImage.url,
      published: published ?? true,
      tags: tags ? tags.split(",") : [], // comma-separated tags
      author: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Blog creation failed",
    });
  }
};


const GetallBlog = async (req, res) => {
  try {
    const blog = await Blog.find()
      .populate("author", "username email")
      .populate("comments.user", "username _id")
      .sort({ createdAt: -1 });

    return res.status(200).json(
      new ApiResponse(
        200,
        { blog },
        "Blogs fetched successfully"
      )
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch blogs",
    });
  }
};
const getsingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate("author", "username email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        { blog },
        "Single Blog fetched successfully"
      )
    );

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

const Likes = async (req, res) => {
    try {
        const userId = req.user._id;
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not Found"
            });
        }

        // Check if user already liked
        const alreadyLiked = blog.likes.includes(userId);

        if (alreadyLiked) {
            blog.likes.pull(userId);   // remove like
        } else {
            blog.likes.push(userId);   // add like
        }

        await blog.save();

        return res.status(200).json({
            success: true,
            likes: blog.likes.length
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const Comments = async(req,res) => {
    try {
        const userId = req.user._id;
        const blogId = req.params.id;
    
        const {text} = req.body;
    
           if (!text || text.trim() === "") {
                return res.status(400).json({
                    success: false,
                    message: "Comment text is required"
                });
            }
    
    
            const blog = await Blog.findById(blogId).populate("comments.user", "username email")
             
            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: "Blog not found"
                });
            }
    
            const newcomment = {
                user:userId,
                comment:text
            }
            blog.comments.push(newcomment);
    
            await blog.save();
            
            return res.status(200).json({
                success: true,
                message: "Comment added successfully",
                comments: blog.comments
            });
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
    

} 
// Import models


// Get all comments for a specific blog
 const GetAllComments = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID" });
    }

    // Find blog by ID and populate comments.user
    const blog = await Blog.findById(id).populate("comments.user", "username _id");

    console.log("Blog ID received:", id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Return only comments
    return res.status(200).json({
      success: true,
      message: "All comments are fetched",
      comments: blog.comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const DeleteComments = async (req, res) => {
  try {
    const userId = req.user._id;
    const { blogId, commentId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog Not Found" });
    }

    const comment = blog.comments.find(c => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment Not Found" });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Remove comment using filter
    blog.comments = blog.comments.filter(c => c._id.toString() !== commentId);
    await blog.save();

    return res.status(200).json({ success: true, message: "Comment deleted successfully", comments: blog.comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const UpdateBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogId = req.params.blogId;

    const { title, content, tags } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // ✅ IMAGE UPDATE WITH CLOUDINARY
    if (req.file) {
      const cloudinaryResponse = await UploadCloudinary(req.file.path);

      if (cloudinaryResponse) {
        blog.image = cloudinaryResponse.secure_url; // ⭐ IMPORTANT
      }
    }

    blog.title = title;
    blog.content = content;
    blog.tags = tags ? tags.split(",") : blog.tags;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







export { CreateBlog,GetallBlog,getsingleBlog,Likes,Comments,UpdateBlog,GetAllComments,DeleteComments };
