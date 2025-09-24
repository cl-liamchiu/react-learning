import { useContext } from 'react';
import { PostContext } from './post-context';

export const usePostContext = () => {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error('usePostContext must be used within PostProvider');
  return ctx;
};
