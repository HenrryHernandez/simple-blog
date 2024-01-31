import React from "react";

import { Post } from "@/interfaces";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const PostCard = ({ title, content, author, createdAt }: Post) => {
  const getFirstSeventyCharacters = (text: string) => {
    return `${text.slice(0, 70).trim()}${text.length > 70 ? "..." : ""}`;
  };

  return (
    <Card
      className="w-full sm:w-80 h-64 flex flex-col cursor-pointer shadow-md transition-all hover:scale-105 hover:shadow-xl"
      onClick={() => {
        console.log("toggling...");
      }}
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
