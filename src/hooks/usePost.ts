import { useState } from "react";

import { z } from "zod";

import { PostData, StandardResponse } from "@/interfaces";
import blogApi from "@/lib/blogApi";
import { NewPostSchema } from "@/utils";

export const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createNewPost = async (postData: z.infer<typeof NewPostSchema>) => {
    setIsLoading(true);

    try {
      const { data } = await blogApi.post("/post", postData);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getPosts = async () => {
    setIsLoading(true);

    try {
      const { data } = await blogApi.get<StandardResponse<PostData>>("/post");

      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createNewPost, getPosts };
};