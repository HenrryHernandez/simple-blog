import { useState } from "react";

import { z } from "zod";

import blogApi from "@/lib/blogApi";
import { SignInSchema, SignUpSchema } from "@/utils";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (signInData: z.infer<typeof SignInSchema>) => {
    setIsLoading(true);

    try {
      const { data } = await blogApi.post("/auth/sign-in", signInData);

      return data.user;
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (signUpData: z.infer<typeof SignUpSchema>) => {
    setIsLoading(true);

    try {
      const { data } = await blogApi.post("/auth/sign-up", signUpData);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signIn, signUp };
};
