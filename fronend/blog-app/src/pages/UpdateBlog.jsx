// import React, { useState } from 'react';
// import { Updateblog } from '../Apiresponse'; // API function import
// import { useNavigate, useParams } from 'react-router-dom';

// function UpdateBlog() {
//  const { blogId } = useParams();
//  // ✅ URL se blogId get kar rahe hain
// console.log("FRONT BLOG ID:", blogId);
// const navigate = useNavigate()

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [img, setImg] = useState(null); // file store ke liye null
//   const [tags, setTags] = useState("");

//   const updateblog = async (e) => {
//     e.preventDefault();

//     try {
//       const formdata = new FormData();
//       formdata.append("title", title);
//       formdata.append("content", content);
//       formdata.append("tags", tags);
//       if (img) formdata.append("image", img); // file append

//       const res = await Updateblog(formdata, blogId); // ✅ blogId URL se
//       console.log("Blog updated:", res.data);
//       alert("Blog updated successfully!");
//     } catch (error) {
//       console.log("Update error:", error.response?.data || error);
//     }
//   };
//   const handelsubmit = () => {
//     navigate('/allblog')
//   }

//   return (
//     <div>
//       <form onSubmit={updateblog}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Tags"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//         />
//         <input
//           type="file"
//           onChange={(e) => setImg(e.target.files[0])} // file set
//         />
//         <button type="submit" onClick={handelsubmit}>Update Blog</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateBlog;
import React, { useState } from 'react';
import { Updateblog } from '../Apiresponse';
import { useNavigate, useParams } from 'react-router-dom';
import '../Stylsheets/UpdateBlog.css'; // ✅ import CSS

function UpdateBlog() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const [tags, setTags] = useState("");

  const updateblog = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("content", content);
      formdata.append("tags", tags);
      if (img) formdata.append("image", img);

      const res = await Updateblog(formdata, blogId);
      console.log("Blog updated:", res.data);

      navigate('/allblog', { state: { updated: true } });
    } catch (error) {
      console.log("Update error:", error.response?.data || error);
    }
  };

  return (
    <div className="update-blog-container">
      <h2>Update Blog</h2>
      <form onSubmit={updateblog}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}

export default UpdateBlog;
