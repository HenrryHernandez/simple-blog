export interface Author {
  id: number;
  email: string;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
}

export interface PostData {
  total: number;
  posts: Post[];
}
