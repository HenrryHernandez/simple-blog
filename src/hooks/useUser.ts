import { useState } from "react";

import { Author, StandardResponse } from "@/interfaces";
import blogApi from "@/lib/blogApi";

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const { data } = await blogApi.get<StandardResponse<{ users: Author[] }>>(
        "/users"
      );

      return data.data?.users || [];
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUsers };
};
