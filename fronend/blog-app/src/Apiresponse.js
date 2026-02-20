// import axios from 'axios';
// // const token = localStorage.getItem("token");
// // // const api = axios.create({
// // //     // baseURL:"http://localhost:8000/user",
// // //     baseURL:"https://blog-app-1-2r5z.onrender.com/user",
// // //     withCredentials:true
// // // });
// // const api = axios.create({
// //   baseURL: "https://blog-app-1-2r5z.onrender.com/user",
// //   withCredentials: true,
// //   headers: {
// //     Authorization: `Bearer ${token}` // ✅ fallback in case cookie fails
// //   }
// // });
// const token = localStorage.getItem("token");
// if (!token) console.error("Token missing in localStorage");

// const api = axios.create({
//   baseURL: "https://blog-app-1-2r5z.onrender.com/user",
//   withCredentials: true,
//   headers: token ? { Authorization: `Bearer ${token}` } : {}
// });

// export const RegisterUser = (formdata) => api.post('/register',formdata);
// export const LoginUser = (formdata) => api.post('/login',formdata)
// export const logoutUser = () => api.post('/logout')
// export const CreateBloG = (formdata) => api.post('/createblog',formdata);
// export const Getblog = (id) => api.get(`/getblog/${id}`)
// export  const GetAllBlogs = () => api.get('/getallblog')
// export const GetallLikes = (id) => api.post(`/like/${id}`)
// export const AddComment = (id, data) => api.post(`/comment/${id}`, data);
// export const GetallComment = (id) => api.get(`/comments/${id}`)
// export const DeleteComent = (blogid,commentid) => api.delete(`/comment/delete/${blogid}/${commentid}`)
// // export const Updateblog = (formdata,blogid) => api.post(`/updateblog/${blogid}`,formdata)
// // export const Updateblog = (formdata, blogId) =>
// //   api.post(`/updateblog/${blogId}`, formdata);


// export const Updateblog = (formdata, blogId) => {
//   console.log("API BLOG ID:", blogId);
//   return api.post(`/updateblog/${blogId}`, formdata);
// };

import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-app-1-2r5z.onrender.com/user",
  withCredentials: true
});

// Attach token dynamically before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const RegisterUser = (formdata) => api.post("/register", formdata);
export const LoginUser = (formdata) => api.post("/login", formdata);
export const logoutUser = () => api.post("/logout");
export const CreateBloG = (formdata) => api.post("/createblog", formdata);
export const Getblog = (id) => api.get(`/getblog/${id}`);
export const GetAllBlogs = () => api.get("/getallblog");
export const GetallLikes = (id) => api.post(`/like/${id}`);
export const AddComment = (id, data) => api.post(`/comment/${id}`, data);
export const GetallComment = (id) => api.get(`/comments/${id}`);
export const DeleteComent = (blogid, commentid) =>
  api.delete(`/comment/delete/${blogid}/${commentid}`);
export const Updateblog = (formdata, blogId) =>
  api.post(`/updateblog/${blogId}`, formdata);