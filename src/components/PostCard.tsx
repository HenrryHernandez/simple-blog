import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  title: string;
  content: string;
  username: string;
  createdAt: string;
}

export const PostCard = ({ title, content, username, createdAt }: Props) => {
  const getFirstSeventyCharacters = (text: string) => {
    return `${text.slice(0, 70).trim()}${text.length > 70 ? "..." : ""}`;
  };
  return (
    <Card className="w-full sm:w-80 h-64 flex flex-col cursor-pointer shadow-md transition-all hover:scale-105 hover:shadow-xl">
      <CardHeader className="">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p>{getFirstSeventyCharacters(content)}</p>
      </CardContent>
      <CardFooter className="">
        <div className="flex flex-col">
          <p>Author: {username}</p>
          <p>Created on: {new Date(createdAt).getFullYear()}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
