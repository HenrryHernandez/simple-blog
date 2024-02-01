import { useState } from "react";

import { z } from "zod";

import { Filter, NewPostData, PostData, StandardResponse } from "@/interfaces";
import blogApi from "@/lib/blogApi";
import { NewPostSchema } from "@/utils";

export const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createNewPost = async (postData: z.infer<typeof NewPostSchema>) => {
    setIsLoading(true);

    try {
      const { data } = await blogApi.post<StandardResponse<NewPostData>>(
        "/post",
        postData
      );

      return data.data;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getPosts = async (filter: Filter = {}) => {
    setIsLoading(true);

    const { key, value } = filter;

    const url = key && value ? `/post?key=${key}&value=${value}` : "/post";

    try {
      const { data } = await blogApi.get<StandardResponse<PostData>>(url);

      return data.data;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, createNewPost, getPosts };
};
