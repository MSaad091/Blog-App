// // import React from 'react';
// // import { DeleteComent } from '../Apiresponse';

// // function DeleteComment({ blogId, commentId, onDelete }) {
// //   const handleDelete = async () => {
// //     try {
// //       const request = await DeleteComent(blogId, commentId);
// //       const response = request.data;
// //       console.log(response);

// //       if (response.success) {
// //         alert("Comment Deleted Successfully");
// //         if (onDelete) onDelete(commentId);
// //       }

// //     } catch (error) {
// //       console.log("Delete comment error:", error.response?.data || error);
// //     }
// //   }

// //   return (
// //     <button onClick={handleDelete}>Delete</button>
// //   );
// // }

// // export default DeleteComment;

// import React from 'react';
// import { DeleteComent } from '../Apiresponse'; // API function import

// function DeleteComment({ blogId, commentId, onDelete }) {
//   // ✅ Handle delete click
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this comment?")) return;

//     try {
//       const request = await DeleteComent(blogId, commentId);
//       const response = request.data;
//       console.log("Delete response:", response);

//       if (response.success) {
//         alert("Comment Deleted Successfully");

//         // ✅ Call parent handler to remove comment from UI
//         if (onDelete) onDelete(commentId);
//       } else {
//         alert(response.message || "Failed to delete comment");
//       }
//     } catch (error) {
//       console.error("Delete comment error:", error.response?.data || error);
//       alert("An error occurred while deleting comment");
//     }
//   };

//   return (
//     <button
//       onClick={handleDelete}
//       style={{
//         marginLeft: "10px",
//         padding: "3px 8px",
//         backgroundColor: "red",
//         color: "white",
//         border: "none",
//         borderRadius: "4px",
//         cursor: "pointer",
//       }}
//     >
//       Delete
//     </button>
//   );
// }

// export default DeleteComment;

// import React from 'react';
// import { DeleteComent } from '../Apiresponse'; // API function import
// import '../Stylsheets/Delete.css'

// function DeleteComment({ blogId, commentId, onDelete }) {
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this comment?")) return;

//     try {
//       const request = await DeleteComent(blogId, commentId);
//       const response = request.data;
//       console.log("Delete response:", response);

//       if (response.success) {
//         alert("Comment Deleted Successfully");
//         if (onDelete) onDelete(commentId);
//       } else {
//         alert(response.message || "Failed to delete comment");
//       }
//     } catch (error) {
//       console.error("Delete comment error:", error.response?.data || error);
//       alert("An error occurred while deleting comment");
//     }
//   };

//   return (
// <button
// className='button'
//   onClick={handleDelete}
 
//   onMouseEnter={(e) => e.target.style.backgroundColor = "#d62828"}
//   onMouseLeave={(e) => e.target.style.backgroundColor = "#e63946"}
// >
//   Delete
// </button>
//   )
// }

// export default DeleteComment;

import React from 'react';
import { DeleteComent } from '../Apiresponse';
import '../Stylsheets/Delete.css'; // CSS file

function DeleteComment({ blogId, commentId, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const request = await DeleteComent(blogId, commentId);
      const response = request.data;
      console.log("Delete response:", response);

      if (response.success) {
        if (onDelete) onDelete(commentId);
      } else {
        alert(response.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Delete comment error:", error.response?.data || error);
      alert("An error occurred while deleting comment");
    }
  };

  return (
    <button className="button" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteComment;
