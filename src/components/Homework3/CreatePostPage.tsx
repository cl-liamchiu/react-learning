import React, { useState } from 'react';
import { usePostContext } from './PostContext/usePostContext';
import { useNavigate } from 'react-router';
import './PostBoard.css';

const CreatePostPage: React.FC = () => {
  const [form, setForm] = useState({ title: '', content: '', image: '' });
  const { addPost } = usePostContext();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setForm((f) => ({ ...f, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    addPost({ title: form.title, content: form.content, image: form.image });
    setForm({ title: '', content: '', image: '' });
    navigate('/route-mode/canvas-hw/3/post-board');
  };

  const handleRemove = () => {
    setForm({ title: '', content: '', image: '' });
  };

  return (
    <div className="post post--create">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          rows={3}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Add Post</button>
        <button type="button" onClick={handleRemove} className="remove-btn">
          Clear Form
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
