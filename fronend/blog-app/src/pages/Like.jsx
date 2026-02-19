import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { GetallLikes } from '../Apiresponse';

function Like({ userId, initialLikes, isLiked, blogId }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);

const handleLike = async () => {
  try {
    const res = await GetallLikes(blogId); // POST toggle like
    console.log("Likes response:", res.data);
    setLikes(res.data.likes); // updated count
    setLiked(prev =>  !prev)
  } catch (error) {
    console.log(error);
  }
};


  return (
    <button
      onClick={handleLike}
      style={{ border: 'none', background: 'transparent', cursor: 'pointer', outline: "none" }}
    >
      {liked ? <FaHeart color='red' /> : <FaRegHeart />} {likes}
    </button>
  );
}

export default Like;
