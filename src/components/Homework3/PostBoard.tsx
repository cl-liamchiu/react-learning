import React from 'react';
import { usePostContext } from './PostContext/usePostContext';
import Modal from './Modal';
import './Modal.css';
import { useNavigate } from 'react-router';
import './PostBoard.css';

const PostBoard: React.FC = () => {
  const { posts, removeLastPost, removePost, updatePost } = usePostContext();
  const navigate = useNavigate();
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editForm, setEditForm] = React.useState<{
    title: string;
    content: string;
    image?: string;
  }>({ title: '', content: '', image: '' });

  const handleEditClick = (post: {
    id: number;
    title: string;
    content: string;
    image?: string;
  }) => {
    setEditingId(post.id);
    setEditForm({
      title: post.title,
      content: post.content,
      image: post.image,
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setEditForm((f) => ({ ...f, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.title || !editForm.content) return;
    // Remove old post and add updated one
    // removePost(editingId!);
    // addPost({
    //   title: editForm.title,
    //   content: editForm.content,
    //   image: editForm.image,
    // });
    updatePost(editingId!, {
      title: editForm.title,
      content: editForm.content,
      image: editForm.image,
    });
    setEditingId(null);
    setEditForm({ title: '', content: '', image: '' });
  };

  return (
    <div className="post post--board">
      <h2>Post Board</h2>
      <div className="post-form">
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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', width: '100%' }}>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <div onClick={() => handleEditClick(post)}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="post" />}
              </div>
              <button
                onClick={() => removePost(post.id)}
                className="delete-btn"
              >
                x
              </button>
            </div>
          ))
        )}
      </div>
      <Modal
        open={editingId !== null}
        title="Edit Post"
        onClose={() => setEditingId(null)}
      >
        {editingId !== null && (
          <form onSubmit={handleEditSubmit} className="post-form">
            <input
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              placeholder="Title"
            />
            <textarea
              name="content"
              value={editForm.content}
              onChange={handleEditChange}
              placeholder="Content"
              rows={3}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
            />
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              style={{ marginLeft: '1rem' }}
            >
              Cancel
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default PostBoard;
