import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt'
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiRespnse.js";
import { Blog } from "../models/Blog.model.js";
import { UploadCloudinary } from "../utils/cloudinary.js";


const generateAccessTokenByUser = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken(); // use the correct method
    return { accessToken };

  } catch (error) {
    throw new ApiError(500, "Error generating access token");
  }
};


const RegisterUser = async(req,res) => {
    
    
   try {
     const { username,email, password} = req.body;
 
     if ([username,email,password].some((element) => {
         element.trim() === ""
     })) {
         return res.status(400).json({
             success:false,
             message:"All Field are required"
         })
     }
 
     const existedUser = await User.findOne(
        {
         $or: [{ username }, { email }]
        }
     )
     if (existedUser) {
         return res.status(400).json({
         success: false,
         message: "User already exists",
       });
     }
 
     const hashpassword = await bcrypt.hash(password,10)
 
 
     const createdUser = await User.create({
         username,
         email,
         password:hashpassword,
     })
 
     return res.status(200).json({
         success:true,
         message:"user Register Successfully",
         user:createdUser
     })
   } catch (error) {
     console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
   }
}
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email?.trim()) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!password?.trim()) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check password
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Generate JWT
    const { accessToken } = await generateAccessTokenByUser(user._id);
    const LoggedInUser = await User.findById(user._id).select("-password");

    // Set cookie
    const options = {
      httpOnly: true,
      secure: false, // local dev ke liye false, production me true
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
    };

    // Send response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { user: LoggedInUser, accessToken },
          "User logged in successfully"
        )
      );

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};


const LogoutUser = async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
            accessToken:undefined
            }
        }
    )
    const options = {
        httpOnly:true,
        secure:true
    }
    return res
    .clearCookie("accessToken",options)
    .json(
        new ApiResponse(200,{}, "User Logout SuccessFully")
    )
}

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



export {RegisterUser,LoginUser,LogoutUser}