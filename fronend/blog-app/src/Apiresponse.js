import axios from 'axios';



const api = axios.create({
    baseURL:"http://localhost:8000/user",
    withCredentials:true
});


export const RegisterUser = (formdata) => api.post('/register',formdata);
export const LoginUser = (formdata) => api.post('/login',formdata)
export const logoutUser = () => api.post('/logout')
export const CreateBloG = (formdata) => api.post('/createblog',formdata);
export const Getblog = (id) => api.get(`/getblog/${id}`)
export  const GetAllBlogs = () => api.get('/getallblog')
export const GetallLikes = (id) => api.post(`/like/${id}`)
export const AddComment = (id, data) => api.post(`/comment/${id}`, data);
export const GetallComment = (id) => api.get(`/comments/${id}`)
export const DeleteComent = (blogid,commentid) => api.delete(`/comment/delete/${blogid}/${commentid}`)
// export const Updateblog = (formdata,blogid) => api.post(`/updateblog/${blogid}`,formdata)
// export const Updateblog = (formdata, blogId) =>
//   api.post(`/updateblog/${blogId}`, formdata);


export const Updateblog = (formdata, blogId) => {
  console.log("API BLOG ID:", blogId);
  return api.post(`/updateblog/${blogId}`, formdata);
};

