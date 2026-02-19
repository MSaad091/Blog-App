import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/User.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    // Get token from cookie OR header
    const token =
      req.cookies?.accessToken || 
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return next(new ApiError(401, "Unauthorized request, token missing"));
    }

    // Verify JWT
    const decodedToken = jwt.verify(token, process.env.GENERATE_ACCESS_TOKEN);

    // Find user
    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      return next(new ApiError(401, "Invalid access token"));
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, error.message || "Invalid access token"));
  }
};


export { verifyJWT };
