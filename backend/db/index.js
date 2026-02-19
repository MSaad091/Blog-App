import mongoose from "mongoose";

const MONGO_DB_URI = "mongodb+srv://Saad:0310@cluster0.11va0rw.mongodb.net/blogapp";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export { connectDB };
