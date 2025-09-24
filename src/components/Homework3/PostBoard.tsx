import React from 'react';
import { usePostContext } from './PostContext/usePostContext';
import { useNavigate } from 'react-router';
import './PostBoard.css';


const PostBoard: React.FC = () => {
  const { posts, removeLastPost } = usePostContext();
  const navigate = useNavigate();

  return (
    <div className="post post--board">
      <h2>Post Board</h2>
      <div className='post-form'>
        <button
          onClick={() => navigate('/route-mode/canvas-hw/3/create-post')}
          style={{ marginRight: '1rem' }}
        >
          Add Post
        </button>
        <button onClick={removeLastPost} className="remove-btn">
          Remove Last Post
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {posts.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%' }}>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="post" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostBoard;
