import React, { useState } from 'react';
import type { Post, PostContextType } from './post-context';
import { PostContext } from './post-context';

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost: PostContextType['addPost'] = (post) =>
    setPosts((prev) => [...prev, { ...post, id: Date.now() }]);

  const removeLastPost = () => setPosts((prev) => prev.slice(0, -1));

  return (
    <PostContext.Provider value={{ posts, addPost, removeLastPost }}>
      {children}
    </PostContext.Provider>
  );
};
