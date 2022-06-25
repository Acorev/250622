import React, { useState, useEffect } from 'react'
import PostService from '../../services/postService';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostService.getPosts().then(post => setPosts(post));
  });


  return (
    <>
      <div className="container">
        {posts.map(post => (
          <div>{post.message}</div>
        ))}
      </div>
    </>
  )
}

export default Home