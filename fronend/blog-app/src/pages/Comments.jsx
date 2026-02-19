import React, { useState, useEffect } from "react";
import { AddComment, GetallComment } from "../Apiresponse";
import DeleteComment from "./DeleteComment";
import '../Stylsheets/Delete.css'; // Same CSS for styling

function Comments({ blogId, userId }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const res = await GetallComment(blogId);
      setComments(res.data.comments);
    } catch (error) {
      console.log("Get comments error:", error);
    }
  };

  useEffect(() => {
    if (blogId) getComments();
  }, [blogId]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await AddComment(blogId, { text: commentText });
      setCommentText("");
      getComments();
    } catch (error) {
      console.log("Add comment error:", error);
    }
  };

  const handleDelete = (deletedId) => {
    setComments(prev => prev.filter(c => c._id !== deletedId));
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={addComment} style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write comment..."
          style={{ flex: 1, padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ height:"33px", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", backgroundColor: "#457b9d", color: "white", border: "none" }}>Add</button>
      </form>

      {comments.map((item) => (
        <div key={item._id} className="comment-item">
          <p className="comment-text">
            <strong>{item.user?.username || "User"}:</strong> {item.comment}
          </p>

          {item.user?._id && userId && item.user._id.toString() === userId.toString() && (
            <DeleteComment
              blogId={blogId}
              commentId={item._id}
              onDelete={handleDelete}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;
