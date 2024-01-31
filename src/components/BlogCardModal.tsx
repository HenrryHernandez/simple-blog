import { useContext } from "react";

import { X } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ModalsHandlersContext } from "@/contexts/ModalsHandlersContext";

export const BlogCardModal = () => {
  const { currentPost } = useContext(ModalsHandlersContext);
  const { closeBlogCardModal } = useContext(ModalsHandlersContext);

  return (
    <div
      className="col-center p-4 fixed inset-0 z-30 bg-modal"
      onClick={closeBlogCardModal}
    >
      {currentPost ? (
        <Card
          className="max-h-[100vh] w-full sm:w-96 flex flex-col overflow-y-scroll bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader>
            <div className="flex justify-end mb-2">
              <Button
                className="w-12 h-12 bg-red-500"
                onClick={closeBlogCardModal}
              >
                <X />
              </Button>
            </div>
            <CardTitle>{currentPost.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p>{currentPost.content}</p>
          </CardContent>
          <CardFooter className="">
            <div className="flex flex-col">
              <p>Author: {currentPost.author.username}</p>
              <p>Created on: {new Date(currentPost.createdAt).getFullYear()}</p>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
};
