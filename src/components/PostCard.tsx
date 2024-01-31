import { useContext } from "react";

import { Post } from "@/interfaces";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ModalsHandlersContext } from "@/contexts";

export const PostCard = (post: Post) => {
  const { setCurrentPost, openBlogCardModal } = useContext(
    ModalsHandlersContext
  );

  const { title, content, author, createdAt } = post;

  const getFirstSeventyCharacters = (text: string) => {
    return `${text.slice(0, 70).trim()}${text.length > 70 ? "..." : ""}`;
  };

  const handleClick = () => {
    setCurrentPost(post);
    openBlogCardModal();
  };

  return (
    <Card
      className="w-full sm:w-80 h-64 flex flex-col cursor-pointer shadow-md transition-all hover:scale-105 hover:shadow-xl"
      onClick={handleClick}
    >
      <CardHeader className="">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p>{getFirstSeventyCharacters(content)}</p>
      </CardContent>
      <CardFooter className="">
        <div className="flex flex-col">
          <p>Author: {author.username}</p>
          <p>Created on: {new Date(createdAt).getFullYear()}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
