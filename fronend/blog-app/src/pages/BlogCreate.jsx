import React, { useState } from 'react';
import { CreateBloG } from '../Apiresponse';
import { useNavigate } from 'react-router-dom';
import '../Stylsheets/BlogCreate.css'
function BlogCreate() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const [newBlogId, setNewBlogId] = useState(null); // Store newly created blog ID

  const createBLOG = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("tags", tags);
      formData.append("title", title);
      formData.append("published", published);
      if (image) formData.append("image", image);

      const request = await CreateBloG(formData);
      const response = request.data;

      console.log("Create Blog Response:", response);

      if (response.success) {
        const id = response.blog?._id;
        if (id) {
          setNewBlogId(id);
          navigate(`/getblog/${id}`); // Navigate to the single blog page immediately
        } else {
          setError("Blog created but ID not found.");
        }

        // Reset form
        setContent("");
        setTags("");
        setTitle("");
        setImage(null);
        setPublished(false);

      } else {
        setError(response.message || "Failed to create blog");
      }

    } catch (err) {
      console.error("Create Blog Error:", err);
      setError("An error occurred while creating the blog");
    }
  };

  // const viewsingleblog = () => {
  //   if (newBlogId) {
  //     navigate(`/getblog/${newBlogId}`);
  //   } else {
  //     setError("No blog ID available to view.");
  //   }
  // };

  return (
   <div className="create-blog">
    
  <div className="blog-card">
    <h2>Create a Blog ✍</h2>

    {error && <p className="error">{error}</p>}

    <form onSubmit={createBLOG} encType="multipart/form-data">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog title"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your blog content here..."
        rows={6}
        required
      />

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
      />

      <label className="checkbox">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Publish immediately
      </label>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <div className="btn-group">
        <button type="submit">🚀 Publish Blog</button>
        {/* <button type="button" onClick={viewsingleblog} disabled={!newBlogId}>
          👁 View Blog
        </button> */}
      </div>
    </form>
  </div>
</div>

  );
}

export default BlogCreate;


