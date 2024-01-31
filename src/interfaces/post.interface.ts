export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface PostData {
  total: number;
  posts: Post[];
}

export interface NewPostData {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}
