import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import UserRouter from './routes/route.js';
import path from 'path';
const app = express();
// app.use(cors({
//     origin: "https://blog-app-znpr.vercel.app", // ✅ no space, include https://
//     credentials: true
// }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app-znpr.vercel.app"

];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Serve static files from "public" folder (including temp)
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// Routes
app.use('/user', UserRouter);

export { app };
 