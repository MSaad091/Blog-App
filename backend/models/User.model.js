
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Compare Password
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT Token
UserSchema.methods.generateAccessToken = function () {
  if (!process.env.GENERATE_ACCESS_TOKEN) {
    throw new Error("JWT secret key is not defined in environment variables");
  }

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.GENERATE_ACCESS_TOKEN, // use the secret key directly
    { expiresIn: "7d" }
  );
};


export const User = mongoose.model("User", UserSchema);
