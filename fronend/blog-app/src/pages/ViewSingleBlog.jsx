import React, { useEffect, useState } from 'react';
import { Getblog } from '../Apiresponse';
import { useNavigate, useParams } from 'react-router-dom';
import '../Stylsheets/SingleBlog.css'; // ✅ import CSS

function ViewSingleBlog() {
  
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const request = await Getblog(id);
      const response = request.data;

      if (response.success) {
        setBlog(response.blog || response.data?.blog);
        
      } else {
        setError(response.message || "Blog not found");
      }
    } catch (err) {
      setError("Failed to fetch blog");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handlechange = () => {


    navigate('/allblog')
  }

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading blog...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: "50px" }}>{error}</p>;
  if (!blog) return <p style={{ textAlign: "center", marginTop: "50px" }}>Blog not found</p>;

  return (
    <div className="view-blog-container">
    
      <p className="author"> UserName:   {blog.author?.username || blog.author}</p>
        <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      {blog.image && (
        <img 
          src={blog.image} 
          alt={blog.title} 
        />
      )}
      <button onClick={handlechange} className='buttons'>View All Blog</button>
    </div>
  );
}

export default ViewSingleBlog;
