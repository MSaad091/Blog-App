import mongoose from "mongoose";


const BlogSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
      content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User
      required: true,
    },image: {
      type: String, // URL for featured image
    },
      published: {
      type: Boolean,
      default: false, // draft by default
    },
    
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
        comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
},{timestamps:true})


export const Blog = mongoose.model("Blog",BlogSchema)