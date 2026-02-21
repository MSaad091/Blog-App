import React, { useState, useEffect } from 'react';
import { GetAllBlogs } from '../Apiresponse';
import Like from './Like';
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';
import '../Stylsheets/AllBlog.css'

function Blogall() {
  const [blog, setAllBlog] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const getAllBlog = async () => {
    try {
      const request = await GetAllBlogs();
      const blogs = request.data?.data?.blog || [];
      setAllBlog(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  const handlechange = () => {
    navigate('/home')
  }

  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <div className="all-blogs">
    
      <h1>All Blogs</h1>
  <button className='home-btn' onClick={handlechange}>Home</button>
      {blog.length > 0 ? (
        blog.map((item) => (
          <div className="blog-card" key={item._id}>
            
            {item.image && (
              <img src={item.image} alt={item.title} />
            )}

            <div className="blog-content">
              <h2>{item.title}</h2>
              <p>{item.content}</p>

              <div className="blog-actions">
                <Like
                  blogId={item._id}
                  initialLikes={item.likes?.length || 0}
                  isLiked={item.likes?.includes(userId)}
                  userId={userId}
                />
{/* 
             {
              item.user?._id === userId &&(
                   <button 
                  className="update-btn"
                  onClick={() => navigate(`/updateblog/${item._id}`)}
                  userId={userId}
                >
                  ✏ Update
                </button>
              )
             } */}
             {item.user?.toString() === userId && (
  <button
    className="update-btn"
    onClick={() => navigate(`/updateblog/${item._id}`)}
  >
    ✏ Update
  </button>
)}
              </div>

              <div className="comments-wrapper">
                <Comments blogId={item._id} userId={userId} />
              </div>

            </div>

          </div>
        ))
      ) : (
        <p className="empty">No blogs found</p>
      )}
    </div>
  );
}

export default Blogall;
