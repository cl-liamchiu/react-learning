import { createContext } from 'react';

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
}

export interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id'>) => void;
  removeLastPost: () => void;
  removePost: (id: number) => void;
}

export const PostContext = createContext<PostContextType | undefined>(
  undefined,
);
